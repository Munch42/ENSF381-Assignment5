import { useState } from "react";
import "./CourseItem.css";

function CourseItem({ id, duration, imageName, courseName, instructorName, description }) {
  const [displayDescription, setDisplayDescription] = useState(false);

  const handleEnroll = async () => {
    const student_id = localStorage.getItem("student_id");
    
    const course = {
      id: id,
      name: courseName,
      instructor: instructorName,
      image: imageName,
      description: description,
      duration: duration
    };

    const res = await fetch(`http://localhost:5000/enroll/${student_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course)
    });

    const data = await res.json();
    
    if (res.ok) {
      alert(data.message);
      window.location.reload();
    } else {
      alert(data.message);
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
