import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');

  const login = (user, passw) => {
    setIsLoggedIn(true);
    setUsername(user);
    setPass(passw)
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPass('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, pass, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};