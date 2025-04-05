import { useState, useEffect } from "react";
import courses from "../data/courses";
import "./FeaturedCourses.css";

function FeaturedCourses() {  
    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        // We create a set (so that only one of each element can be in it) and
        // then add items until we get 3 courses 
        const courseIndices = new Set();

        while(courseIndices.size !== 3) {
            courseIndices.add(Math.floor(Math.random() * courses.length));
        }

        // TODO: Display course-list as horizontal blocks side by side
        let tempCourseList = [];

        let i = 0;
        courseIndices.forEach((courseIndex) => {
            tempCourseList[i] = courses[courseIndex];
            i++;
        });

        setCourseList(tempCourseList);
    }, []);

    return (
    <div className="featured-courses">
        <h2>Featured Courses</h2>
        <div className="course-list">
            {courseList.map(function(item) {
                return (
                    <div className="featured-course-item"> 
                        <h3>{item.name}</h3>
                        <h4>{item.instructor}</h4>
                        <p>{item.description}</p>
                        <p>{item.duration}</p>
                    </div>
                );
            })}
        </div>
    </div>
    );        
}

export default FeaturedCourses;
