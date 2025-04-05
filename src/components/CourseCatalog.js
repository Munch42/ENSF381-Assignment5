import CourseItem from "./CourseItem";
import courses from "../data/courses";
import "./CourseCatalog.css";

function CourseCatalog() {
  return (
    <>
      <h2>Course Catalog</h2>
      <div className="available-courses">
        {courses.map((course) => {
          return (
            <CourseItem imageName={course.image} courseName={course.name} instructorName={course.instructor} description={course.description} />
          );
        })}
      </div>
    </>
  );
}

export default CourseCatalog;
