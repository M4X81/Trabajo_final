import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/navbar.css';


const Navbar = () => {
  const { isLoggedIn, email } = useAuth();
  const encodedEmail = encodeURIComponent(email); 
  return (
    <nav className="navbar navbar-expand-lg fixed-top" id="navbar">
      <div className="container-fluid">
        <Link to="/" className="logo-animado">
          <img src="/img/logo.png" alt="CriptoApp logo" width="30" height="30" className="d-inline-block align-text-top" />
        </Link>
        <Link className="navbar-brand" to="/">CriptoApp</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/wallet">Wallets</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/exchange">Exchange</Link>
            </li>
            {!isLoggedIn ? (
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/register">Registrate</Link>
              </li>
            ) : (
              <li className="nav-item_true">
                <Link className="nav-link active" aria-current="page" to={`/users`}>
                
                  {`${email.split('@')[0]}`}
                </Link>
                
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
