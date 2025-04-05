import './EnrolledCourse.css';
function EnrolledCourse({ course, onDrop }) {
  return (
    <div className="enrolled-course">
      <img src={require(`../images/${course.image}`)} alt="Registered Course Item Image"/>
      <h4>{course.name}</h4>
      <p>Credit Hours: 3</p>
      <button onClick={() => onDrop(course.id)}>Drop Course</button>
    </div>
  );
}

export default EnrolledCourse;