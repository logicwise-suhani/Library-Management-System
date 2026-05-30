import { useState } from "react";
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { toast } from "react-toastify"; 

function Login() {

    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await login(form);
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);

            if (data.role === "ADMIN") {
                navigate("/admin-dashboard");
            } else {
                navigate("/user-dashboard");
            }
        } catch (err) {
            toast.error(err);
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="login">

                <div className="form">
                    <form onSubmit={handleSubmit}>

                        Email:{" "}
                        <input
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                        />

                        <br /> <br />
                        Password:{" "}
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                        />

                        <br /> <br />
                        <Button type="submit" label="Login" />
                    </form>
                </div>
            </div>
        </>
    )

};

export default Login;