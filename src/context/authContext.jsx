import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setMail] = useState('');
  const [password, setPass] = useState('');
  const [user_name, setUser_name] = useState('');
  const [lastname, setLastname] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');




  // const logIn = (email, password, user_name, lastname, address, phone, country, city) => {
  //   console.log('Login - email:', email, 'pass:', password, 'user_name:', user_name, 'lastname:', lastname, 'address:', address, 'phone:', phone, 'country:', country, 'city:', city);
  //   setIsLoggedIn(true);
  //   setMail(email);
  //   setPass(password);
  //   setUser_name(user_name);
  //   setLastname(lastname);
  //   setAddress(address);
  //   setPhone(phone);
  //   setCountry(country);
  //   setCity(city);

  // };

  // const logout = () => {
  //   setIsLoggedIn(false);
  //   setMail('');
  //   setPass('');
  //   setUser_name('');
  //   setLastname('');
  //   setAddress('');
  //   setPhone('');
  //   setCountry('');
  //   setCity('');
  // };

  //-----------------------pruebo esto para mantener sesion al actualizar
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userData'));
    if (storedUser) {
        setIsLoggedIn(true);
        setMail(storedUser.email);
        setPass(storedUser.password);
        setUser_name(storedUser.user_name);
        setLastname(storedUser.lastname);
        setAddress(storedUser.address);
        setPhone(storedUser.phone);
        setCountry(storedUser.country);
        setCity(storedUser.city);
    }
}, []);

const logIn = (email, password, user_name, lastname, address, phone, country, city) => {
    setIsLoggedIn(true);
    setMail(email);
    setPass(password);
    setUser_name(user_name);
    setLastname(lastname);
    setAddress(address);
    setPhone(phone);
    setCountry(country);
    setCity(city);

    const userData = { email, password, user_name, lastname, address, phone, country, city };
    localStorage.setItem('userData', JSON.stringify(userData));
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
    localStorage.removeItem('userData');
};
//---------------------------------------------------Si no funciona bien vuelvo a lo anterior

  return (
    <AuthContext.Provider value={{ isLoggedIn, email, password, user_name, lastname, address, phone, country, city, logIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};