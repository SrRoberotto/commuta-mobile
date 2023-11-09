import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({});

  const updateAuthData = (data) => {
    setAuthData({ ...authData, ...data });
    console.log(authData)
  };

  return (
    <AuthContext.Provider value={{ authData, updateAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  
  return useContext(AuthContext);
};
