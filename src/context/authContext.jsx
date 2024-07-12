import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [user_name, setUser_name] = useState('');
  const [lastname, setLastname] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');



  const logIn = (mail, pass, user_name, lastname, address, phone, country, city) => {
    console.log( 'Login - mail:', mail, 'pass:', pass, 'user_name:', user_name, 'lastname:', lastname, 'address:', address, 'phone:', phone, 'country:', country, 'city:', city );
    setIsLoggedIn(true);
    setMail(mail);
    setPass(pass);
    setUser_name(user_name);
    setLastname(lastname);
    setAddress(address);
    setPhone(phone);
    setCountry(country);
    setCity(city);

  };

  const logout = () => {
    setIsLoggedIn(false);
    setMail('');
    setPass('');
    setUser_name('');
    setLastname('');
    setAddress('');
    setPhone('');
    setCountry('');
    setCity('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, mail,pass, user_name, lastname, address, phone, country, city, logIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};