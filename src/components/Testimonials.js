import { useState, useEffect } from "react";
import testimonials from "../data/testimonials";
import "./Testimonials.css";

function Testimonials() {  
    const [testimonialList, setTestimonialList] = useState([]);

    useEffect(() => {
        // We create a set (so that only one of each element can be in it) and
        // then add items until we get 2 testimonials
        const testimonialIndices = new Set();

        while(testimonialIndices.size !== 2) {
            testimonialIndices.add(Math.floor(Math.random() * testimonials.length));
        }

        let tempTestimonialList = [];

        let i = 0;
        testimonialIndices.forEach((testimonialIndex) => {
            tempTestimonialList[i] = testimonials[testimonialIndex];
            i++;
        });

        setTestimonialList(tempTestimonialList);
    }, []);

    return (
    <div className="featured-testimonials">
        <h2>Testimonials</h2>
        <div className="testimonial-list">
            {testimonialList.map(function(item) {
                return (
                    <div className="testimonial-item"> 
                        <h3>{item.studentName}</h3>
                        <p>{item.review}</p>
                        <p>{"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}</p>
                    </div>
                );
            })}
        </div>
    </div>
    );        
}

export default Testimonials;
