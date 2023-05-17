import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/full.png";

const Header = () => {
  const { setUserInfo, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  const logout = () => {
    fetch(`${import.meta.env.VITE_API_URL}/logout`, {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <header>
      <Link to="/" className="logo">
        <img src={Logo} className="logo" alt="fullstack. logo" />
      </Link>
      <nav>
        {isLoggedIn && (
          <div className="create-logout-btns">
            <Link to="/create" className="create-btn">
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ color: "#ffffff" }}
              />
              Create new post
            </Link>
            <Link to="/login" onClick={logout}>
              Logout
            </Link>
          </div>
        )}
        {!isLoggedIn && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};
export default Header;
