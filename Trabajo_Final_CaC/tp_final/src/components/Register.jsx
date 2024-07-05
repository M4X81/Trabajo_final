import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/authContext'; 
import '../styles/form.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [ageConfirmed, setAgeConfirmed] = useState(false);

    const { login } = useAuth();  // Hook del contexto de autenticación
    const navigate = useNavigate(); // Hook para redireccionar, reemplaza useHistory

    const validateFields = () => {
        return email.trim() !== '' && password.trim() !== '' && termsAccepted && ageConfirmed;
    };

    const handleRegister = (event) => {
        event.preventDefault();
        if (!validateFields()) {
            alert('Por favor, complete los campos para continuar.');
            return;
        }

        // Lógica de registro (aquí podrías llamar a una API real)
        localStorage.setItem('email', email);
        localStorage.setItem('pass', password);

        // Actualizar el contexto de autenticación
        login(email);  // Pasar el email como identificador de usuario logueado

        // Redireccionar a la página de éxito de login
        navigate('/');
    };

    return (
        <div className="contenedor">
            <div className="contenedor-layout">
                <main className="contenedor-tarjeta">
                    <div className="logo_reg"></div>
                    <h4>Te damos la bienvenida a nuestra plataforma CriptoApp</h4>
                    <h6>Regístrate para continuar</h6>
                    <form className="form" onSubmit={handleRegister}>
                        <section className="formulario">
                            <label htmlFor="email">
                                Correo o número de teléfono
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    placeholder="email@domain.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                            <label htmlFor="pass">
                                Contraseña
                                <input
                                    type="password"
                                    id="pass"
                                    required
                                    placeholder="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </label>
                            <article className="tyc">
                                <h6>
                                    Al crear una cuenta, acepto los{' '}
                                    <Link to="/tyc" target="_blank" rel="noopener noreferrer">
                                        Términos de servicio
                                    </Link>{' '}
                                    y la{' '}
                                    <Link to="/pdp" target="_blank" rel="noopener noreferrer">
                                        Política de privacidad
                                    </Link>{' '}
                                    de Cripto.
                                </h6>
                                <input
                                    type="checkbox"
                                    className="neon"
                                    id="check1"
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                />
                            </article>
                            <article className="tyc">
                                <h6>Confirmo ser mayor de 18 años</h6>
                                <input
                                    type="checkbox"
                                    className="neon"
                                    id="check2"
                                    checked={ageConfirmed}
                                    onChange={(e) => setAgeConfirmed(e.target.checked)}
                                />
                            </article>
                            <button type="submit" id="login-button">
                                Registrarse
                            </button>
                        </section>
                        <section className="separador">
                            <p>ó</p>
                        </section>
                        <section className="registro-externo">
                            <a
                                className="login-google"
                                href="https://www.argentina.gob.ar/justicia/convosenlaweb/situaciones/como-puedo-detectar-una-pagina-falsa"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src="/img/google-icon.png" className="google" alt="Google Icon" />
                                Continuar con Google
                            </a>
                        </section>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default Register;

