import { useState } from "react";
import "./CourseItem.css";

function CourseItem({ imageName, courseName, instructorName, description }) {
  const [displayDescription, setDisplayDescription] = useState(false);

  const handleEnroll = () => {
    const stored = localStorage.getItem("enrolledCourses");
    let enrolled = stored ? JSON.parse(stored) : [];

    const alreadyEnrolled = enrolled.some((c) => c.name === courseName);
    if (!alreadyEnrolled) {
      const course = {
        id: courseName,
        name: courseName,
        instructor: instructorName,
        image: imageName,
        description
      };
      enrolled.push(course);
      localStorage.setItem("enrolledCourses", JSON.stringify(enrolled));
      alert("You have been enrolled");
      window.location.reload();
      
    } else {
      alert("You are already enrolled in this course.");
    }
  };

  return (
    <div className="course-item" onMouseEnter={() => setDisplayDescription(true)} onMouseLeave={() => setDisplayDescription(false)}>
      <img src={require(`../images/${imageName}`)} alt="Registered Course Item Image"/>
      <br /><br />
      <span className="course-name">Course Name: {courseName}</span>
      <br /><br />
      <span className="course-code">Instructor: {instructorName}</span>
      {displayDescription ? <p>{description}</p> : <br />}
      <button className="accept-btn" onClick={handleEnroll}>Enroll Now</button>
    </div>
  );
}

export default CourseItem;
