import React, { useState, useEffect } from "react";
import CourseItem from "./CourseItem";
import "./CourseCatalog.css";

function CourseCatalog({ studentId }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  return (
    <div>
      <h2>Course Catalog</h2>
      <div className="available-courses">
        {courses.map((course) => (
         <CourseItem id={course.id} duration={course.duration} imageName={course.image} courseName={course.name} instructorName={course.instructor} description={course.description} />
        ))}
      </div>
    </div>
  );
}

export default CourseCatalog;