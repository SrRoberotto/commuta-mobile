import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState();
  const [authToken, setAuthToken] = useState();

  const updateAuthData = (data) => {
    setAuthData({ ...authData, ...data });
    console.log(authData)
  };

  const setToken = (token) => {
    setAuthToken(token);
    
    console.log("Token configurado: ",authToken)
  };

  return (
    <AuthContext.Provider value={{ authData, updateAuthData, authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  
  return useContext(AuthContext);
};
