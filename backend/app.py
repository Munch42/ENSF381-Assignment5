from flask import Flask, request, jsonify
from flask_cors import CORS
import os, json, random

app = Flask(__name__)
CORS(app)

students = [
    {
        "id": 1,
        "username": "jdoe",
        "password": "Password123!",
        "email": "jdoe@example.com",
        "enrolled_courses": []
    },
]

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")

    if not username or not password or not email:
        return jsonify({"message": "All fields are required."}), 400

    if any(s["username"] == username for s in students):
        return jsonify({"message": "Username already taken."}), 400


    new_student = {
        "id": len(students) + 1,
        "username": username,
        "password": password,
        "email": email,
        "enrolled_courses": []
    }

    students.append(new_student)
    return jsonify({"message": "Registration successful."}), 200



@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    for student in students:
        if student["username"] == username and student["password"] == password:
            return jsonify({
                "message": "Login successful.",
                "student_id": student["id"]
            }), 200

    return jsonify({"message": "Invalid credentials."}), 401

@app.route("/testimonials", methods=["GET"])
def get_testimonials():
    with open("testimonials.json") as f:
        testimonials = json.load(f)
    return jsonify(random.sample(testimonials, 2))

@app.route("/courses", methods=["GET"])
def get_courses():
    with open("courses.json") as f:
        courses = json.load(f)
    return jsonify(courses)

@app.route("/enroll/<student_id>", methods=["POST"])
def enroll(student_id):
    data = request.get_json()
    id = data.get("id")
    name = data.get("name")
    instructor = data.get("instructor")
    description = data.get("description")
    duration = data.get("duration")
    image = data.get("image")

    for student in students:
        if student.get("id") == student_id:
            student["enrolled_courses"] = {id: id, name: name, instructor: instructor, description: description, duration: duration, image: image}
            return jsonify({
                "message": "Successfully Enrolled in Course",
            }), 200
            
        return jsonify({
            "message": "Error enrolling in course!"
        }), 500

@app.route("/drop/<student_id>", methods=["DELETE"])
def drop_course(student_id):
    data = request.get_json()
    course_id = data.get("id")

    for student in students:
        if student["id"] == student_id:
            new_enrolled_courses = [course for course in student["enrolled_courses"] if course["id"] != course_id]
            student["enrolled_courses"] = new_enrolled_courses
            return jsonify({
                "message": "Succesfully dropped course."
            }), 200
        
        return jsonify({
            "message": "Error dropping course!"
        }), 500
    
@app.route("/student_courses/<student_id>", methods=["GET"])
def get_student_courses(student_id):
    for student in students:
        if student["id"] == student_id:
            return jsonify({
                "enrolled_courses": student["enrolled_courses"]
            }), 200
        
    return jsonify({
        "enrolled_courses": []
    }), 500

if __name__ == "__main__":
    app.run(debug=True)
