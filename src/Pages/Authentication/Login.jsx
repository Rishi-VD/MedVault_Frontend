import React, { useState } from "react";
import axios from "axios";
import "./RegistrationForm.css";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/login", formData);
            console.log("Response:", res.data);
            toast.success("Login successful!");
        } catch (err) {
            console.error(err);
            toast.error("Login failed!");
        }
    };

    return (
        <div className="register-wrapper">
            <div className="greetings">
                <h1>Welcome to the Medical Appointment Scheduling and Record Management Application</h1>
            </div>

            <div className="register-container">
                <h2>Login</h2>

                <form onSubmit={handleSubmit} className="register-form">

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Login</button>
                </form>
                <ToastContainer />

                <p className="login-redirect">
                    Don't have an account? <a href="/">Register</a>
                </p>
            </div>

        </div>
    );
};

export default Login;
