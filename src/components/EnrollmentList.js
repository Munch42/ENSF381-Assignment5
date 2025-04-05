import React, { useEffect, useState } from "react";
import EnrolledCourse from "./EnrolledCourse";
import "./EnrollmentList.css";

function EnrollmentList() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const loadCourses = () => {
    const stored = localStorage.getItem("enrolledCourses");
    if (stored) {
      setEnrolledCourses(JSON.parse(stored));
    }
  };


  useEffect(() => {
    loadCourses();
    window.addEventListener("storage", loadCourses);
    return () => window.removeEventListener("storage", loadCourses);
  }, []);

  const handleDrop = (id) => {
    const updated = enrolledCourses.filter((course) => course.id !== id);
    setEnrolledCourses(updated);
    localStorage.setItem("enrolledCourses", JSON.stringify(updated));
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
