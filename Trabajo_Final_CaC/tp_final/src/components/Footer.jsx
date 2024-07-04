import React from 'react';
import '../styles/navbar.css';

const Footer = () => {
  return (
    <footer id="footer">
      <p>
        &copy; 2024 para Codo a Codo
        <a href="https://buenosaires.gob.ar/educacion/preguntas-frecuentes" target="_blank" rel="noopener noreferrer">
          <img src="/img/codoAcodo.png" alt="Logo codo a codo" className="img-footer" />
        </a>
        <span>| Grupo 13</span>
      </p>
    </footer>
  );
};

export default Footer;