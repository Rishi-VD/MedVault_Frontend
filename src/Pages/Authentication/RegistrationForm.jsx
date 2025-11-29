import { useState } from "react";
import axios from "axios";
import "./RegistrationForm.css";
import { toast, ToastContainer } from "react-toastify";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.warn("Passwords do not match!");
            return;
        }

        try {
            const res = await axios.post("http://localhost:8080/register", formData);
            console.log("Response:", res.data);
            toast.success("Registration successful!");
        } catch (err) {
            console.error(err);
            toast.error("Registration failed!");
        }
    };

    return (
        <div className="register-wrapper">

            <div className="greetings">
                <h1>Welcome to the Medical Appointment Scheduling and Record Management Application</h1>
            </div>

            <div className="register-container">
                <h2>Create Account</h2>

                <form onSubmit={handleSubmit} className="register-form">

                    <input
                        type="text"
                        name="name"
                        placeholder="Username"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

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

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Register</button>
                </form>
                <ToastContainer />
                <p className="login-redirect">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>

        </div>

    );
}

export default RegistrationForm;
