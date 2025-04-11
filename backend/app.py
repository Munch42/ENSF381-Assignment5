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
        "enrolled_courses": [1, 2]
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

if __name__ == "__main__":
    app.run(debug=True)
