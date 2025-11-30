import { useState, useEffect } from "react";
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

    const [errors, setErrors] = useState({});
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const validate = (name, value) => {
        let errorMsg = "";
        switch (name) {
            case "name":
                if (!value) {
                    errorMsg = "Name is required";
                }
                break;
            case "email":
                if (!value) {
                    errorMsg = "Email is required";
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    errorMsg = "Email is invalid";
                }
                break;
            case "password":
                if (!value) {
                    errorMsg = "Password is required";
                } else if (value.length < 8) {
                    errorMsg = "Password must be at least 8 characters";
                }
                break;
            case "confirmPassword":
                if (!value) {
                    errorMsg = "Confirm Password is required";
                } else if (formData.password !== value) {
                    errorMsg = "Passwords do not match";
                }
                break;
            default:
                break;
        }
        return errorMsg;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        const error = validate(name, value);
        setErrors({
            ...errors,
            [name]: error
        });
    };

    useEffect(() => {
        const hasErrors = Object.values(errors).some((error) => error !== "");
        const hasEmptyFields = Object.values(formData).some((value) => value === "");
        setIsSubmitDisabled(hasErrors || hasEmptyFields);
    }, [errors, formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitDisabled) {
            toast.warn("Please fill in the form correctly");
            return;
        }

        try {
            const res = await axios.post("http://localhost:8081/register", formData);
            console.log("Response:", res.data);
            toast.success("Registration successful!");
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data) {
                if (Array.isArray(err.response.data)) {
                    toast.error(err.response.data.join(', '));
                } else {
                    toast.error(err.response.data);
                }
            } else {
                toast.error("Registration failed!");
            }
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
                    />
                    {errors.name && <p className="error-message">{errors.name}</p>}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

                    <button type="submit" disabled={isSubmitDisabled}>Register</button>
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
