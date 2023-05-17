import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Logo from "../assets/full.png";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo, setIsLoggedIn } = useContext(UserContext);

  const login = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
        setIsLoggedIn(true);
      });
    } else {
      alert("Wrong credentials");
    }
  };
  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <div className="login-container">
      <aside className="aside" />
      <form className="login" onSubmit={login}>
        <img src={Logo} alt="logo" className="form-logo" />
        <h1>Login</h1>
        <small className="small-register">
          No account?{" "}
          <Link className="register-link" to="/register">
            Register.
          </Link>
        </small>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          placeholder="Username"
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

        <button>Login</button>
      </form>
    </div>
  );
};
export default LoginPage;
