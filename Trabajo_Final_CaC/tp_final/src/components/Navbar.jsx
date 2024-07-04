import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/navbar.css';
import '../styles/style.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top" id="navbar">
      <div className="container-fluid">
        <a href="/" className="logo-animado">
          <img src="/img/logo.png" alt="CriptoApp logo" width="30" height="30" className="d-inline-block align-text-top" />
        </a>
        <a className="navbar-brand" href="/">CriptoApp</a>
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
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/register">Registrate</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;