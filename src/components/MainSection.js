import FeaturedCourses from './FeaturedCourses';
import './MainSection.css';
import Testimonials from './Testimonials';

function MainSection() {
  return (
    <div>
      <div id="about">
            <h2>About LMS</h2>
            <p>
            The Learning Management System (LMS) helps students and instructors manage courses, quizzes, and track performance efficiently.
            </p>

            <p><b>Key Features:</b></p>
            <ul>
                <li>Enroll in courses</li>
                <li>Attempt quizzes</li>
                <li>View leaderboards</li>
            </ul>
        </div>
      <FeaturedCourses />
      <Testimonials />
    </div>
  );
}

export default MainSection;
