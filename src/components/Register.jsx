import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import '../styles/form.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user_name, setUser_name] = useState('');
    const [lastname, setLastname] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [ageConfirmed, setAgeConfirmed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { login } = useAuth();
    const navigate = useNavigate();

    // const [userData, setUserData] = useState({
    //     email: '',
    //     password: '',
    //     user_name: '',
    //     lastname: '',
    //     address: '',
    //     phone: '',
    //     country: '',
    //     city: ''
    // });

    // const handleFieldChange = (e) => {
    //     const { name, value } = e.target;
    //     setUserData(prevData => ({
    //         ...prevData,
    //         [name]: value
    //     }));
    // };

    const handleRegister = async (event) => {
        event.preventDefault();

        if (!validateFields()) {
            alert('Por favor, complete los campos para continuar.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('https://trabajo-finalcac.vercel.app/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    user_name,
                    lastname,
                    address,
                    phone,
                    country,
                    city
                }),
            });

            if (!response.ok) {
                throw new Error('Fallo en el registro, intente nuevamente.');
            }

            const data = await response.json();

            login(data.email); // O el identificador de usuario retornado por la API

            navigate('/');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const validateFields = () => {
        return email.trim() !== '' && password.trim() !== '' && termsAccepted && ageConfirmed;
    };

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div className="contenedor">
            <div className="contenedor-layout">
                <main className="contenedor-tarjeta">
                    <div className="logo_reg"></div>
                    <h4>Te damos la bienvenida a nuestra plataforma CriptoApp</h4>
                    <h6>Regístrate para continuar</h6>
                    <form className="form" onSubmit={handleRegister}>
                        <section className="formulario"><br />
                            <label htmlFor="email">
                                Correo: 
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    placeholder="email@domain.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                /><br />
                            </label>
                            <label htmlFor="pass">
                                Contraseña:
                                <input
                                    type="password"
                                    id="pass"
                                    required
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                /><br />
                            </label>
                            <label htmlFor="user_name">Nombre:</label>
                            <input
                                type="text"
                                placeholder="Name"
                                id="user_name"
                                name="user_name"
                                value={user_name}
                                onChange={(e) => setUser_name(e.target.value)}
                                required
                            /><br />
                            <label htmlFor="lastname">Apellido:</label>
                            <input
                                type="text"
                                placeholder="Lastname"
                                id="lastname"
                                name="lastname"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                required
                            /><br />
                            <label htmlFor="address">Dirección:</label>
                            <input
                                type="text"
                                placeholder="Adresss"
                                id="address"
                                name="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            /><br />
                            <label htmlFor="phone">Teléfono:</label>
                            <input
                                type="text"
                                placeholder="Phone"
                                id="phone"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            /><br />
                            <label htmlFor="country">País:</label>
                            <input
                                type="text"
                                placeholder="Country"
                                id="country"
                                name="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            /><br />
                            <label htmlFor="city">Ciudad:</label>
                            <input
                                type="text"
                                placeholder="City"
                                id="city"
                                name="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            /><br />
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
                            {error && <p className="error">{error}</p>}

                            <button type="submit" id="login-button" disabled={loading}>
                                {loading ? 'Registrando...' : 'Registrarse'}
                            </button>
                        </section>
                        <section className="separador">
                            <button
                                type="button"
                                id="login-button2"
                                onClick={handleLoginRedirect}
                                disabled={loading}
                            >
                                Iniciar sesión
                            </button>
                        </section>
                        <p>ó</p>
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



