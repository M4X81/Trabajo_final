import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');


  const logIn = (mail, pass) => {
    console.log('Login - mail:', mail, 'pass:', pass);
    setIsLoggedIn(true);
    setMail(mail);
    setPass(pass);

  };

  const logout = () => {
    setIsLoggedIn(false);
    setMail('');
    setPass('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, mail,pass, logIn, logout }}>//qwe
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};