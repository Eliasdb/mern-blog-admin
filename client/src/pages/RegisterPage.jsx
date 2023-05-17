import { useState } from "react";
import Logo from "../assets/full.png";

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
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Register</button>
      </form>
    </div>
  );
};
export default RegisterPage;
