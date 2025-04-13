import React, { useEffect, useState } from "react";
import EnrolledCourse from "./EnrolledCourse";
import "./EnrollmentList.css";

function EnrollmentList() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const loadCourses = async () => {
    const student_id = localStorage.getItem("student_id");
    if (student_id) {
      fetch(`http://localhost:5000/student_courses/${student_id}`)
      .then((res) => res.json())
      .then((data) => setEnrolledCourses(data.enrolled_courses))
      .catch((err) => console.error("Error fetching enrolled courses:", err));
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleDrop = async (id) => {
    const student_id = localStorage.getItem("student_id");
    const updated = enrolledCourses.filter((course) => course.id !== id);
    const removed = enrolledCourses.filter((course) => course.id === id)[0];
    setEnrolledCourses(updated);
    const res = await fetch(`http://localhost:5000/drop/${student_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: removed["id"], name: removed["name"], instructor: removed["instructor"],
        description: removed["description"], duration: removed["duration"], image: removed["image"]
       })
    });

    const data = await res.json();
    alert(data.message);
  };

  const totalCredits = enrolledCourses.length * 3;

  return (
    <div className="enrollment-list">
      <h2>Enrollment List</h2>
      {enrolledCourses.length === 0 ? (
        <p>No courses enrolled.</p>
      ) : (
        <>
          <div className="enrolled-classes">
            {enrolledCourses.map((course) => (
              <EnrolledCourse key={course.id} course={course} onDrop={handleDrop} />
            ))}
          </div>
          <p><strong>Total Credit Hours:</strong> {totalCredits}</p>
        </>
      )}
    </div>
  );
}

export default EnrollmentList;
