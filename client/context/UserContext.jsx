import { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hideCreateBtn, setHideCreateBtn] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        isLoggedIn,
        setIsLoggedIn,
        hideCreateBtn,
        setHideCreateBtn,
        loading,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
