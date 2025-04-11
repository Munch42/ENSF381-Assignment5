import React, { useEffect, useState } from "react";
import "./Testimonials.css";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/testimonials")
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error("Error fetching testimonials:", err));
  }, []);

  return (
    <div className="featured-testimonials">
      <h2>Testimonials</h2>
      <div className="testimonial-list">
        {testimonials.map((t, index) => (
          <div className="testimonial-item" key={index}>
            <h3>{t.studentName}</h3>
            <p>“{t.review}”</p>
            {"★".repeat(Math.round(t.rating))}{"☆".repeat(5 - Math.round(t.rating))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
