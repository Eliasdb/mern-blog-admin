import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/full.png";

const Header = () => {
  const { setUserInfo, userInfo, isLoggedIn } = useContext(UserContext);

  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_API_URL}/profile`, {
  //     credentials: "include",
  //   }).then((response) => {
  //     response.json().then((userInfo) => {
  //       setUserInfo(userInfo);
  //     });
  //   });
  // }, [isLoggedIn]);

  const logout = () => {
    fetch(`${import.meta.env.VITE_API_URL}/logout`, {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  };

  const username = userInfo?.username;

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 logout-btn"
              onClick={logout}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
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
