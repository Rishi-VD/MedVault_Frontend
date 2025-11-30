import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegistrationForm.css";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../context/AuthContext.jsx";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const validate = (name, value) => {
        let errorMsg = "";
        switch (name) {
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
            const res = await axios.post("http://localhost:8081/login", formData);
            console.log("Response:", res.data);
            toast.success("Login successful!");
            login();
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data) {
                toast.error(err.response.data);
            } else {
                toast.error("Login failed!");
            }
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

                    <button type="submit" disabled={isSubmitDisabled}>Login</button>
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
