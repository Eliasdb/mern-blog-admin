import { useState } from "react";
import Logo from "../assets/full.png";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status == 200) {
      alert("Registration successful");
    } else {
      alert("Registration failed.");
    }
  };

  return (
    <div className="login-container">
      <aside className="aside" />
      <form className="register" onSubmit={register}>
        <img src={Logo} alt="logo" className="form-logo" />
        <h1>Register</h1>

        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={username}
          className="register-input"
          style={{ background: "white" }}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          className="register-input"
          style={{ background: "white" }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-btn">Register</button>
        <small className="small-register">
          Account?{" "}
          <Link className="register-link" to="/login">
            Login.
          </Link>
        </small>
      </form>
    </div>
  );
};
export default RegisterPage;
