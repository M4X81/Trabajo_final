// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import '../styles/form.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [ageConfirmed, setAgeConfirmed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //-----------------------
    const { username, pass } = useAuth();
   
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        user_name: '',
        lastname: '',
        address: '',
        phone: '',
        country: '',
        city: ''
    });
  
   
    const [showPassword, setShowPassword] = useState(false);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const formattedUsername = encodeURIComponent(username); // Formatear el username para URL
                // const response = await fetch(`https://trabajo-finalcac.vercel.app/users/${email}`);
                const response = await fetch(`https://trabajo-finalcac.vercel.app/users`);
                const data = await response.json();
                if (response.ok) {
                    setUserData({
                        email: data.email,
                      
                        user_name: data.user_name,
                        lastname: data.lastname,
                        address: data.address,
                        phone: data.phone,
                        country: data.country,
                        city: data.city
                    }); // Establece todos los datos del usuario desde la respuesta del servidor
                } else {
                    setError(data.error);
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, [username, pass, email]);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setUserData(prevData => ({
    //         ...prevData,
    //         [name]: value
    //     }));
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     setError(null);

    //     try {
    //         // const formattedUsername = encodeURIComponent(username);
    //         // let apiUrl = `https://trabajo-finalcac.vercel.app/users/${email}`;
    //         let apiUrl = `https://trabajo-finalcac.vercel.app/users`;

    //         let method = 'PUT'; // Método por defecto para actualizar

    //         if (!email) {
    //             // Si no hay email (es decir, estás creando un nuevo usuario)
    //             apiUrl = `https://trabajo-finalcac.vercel.app/users`;
    //             method = 'POST';
    //         }

    //         const response = await fetch(apiUrl, {
    //             method: method,
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(userData)
    //         });

    //         const data = await response.json();
    //         if (response.json.ok) {
    //             alert('Datos actualizados con éxito');
    //             navigate('/');
    //         } else {
    //             setError(data.error);
    //         }
    //     } catch (error) {
    //         setError(error.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    //-----------------------------------------

    const { login } = useAuth();  // Hook del contexto de autenticación
    const navigate = useNavigate(); // Hook para redireccionar, reemplaza useHistory

    const validateFields = () => {
        return email.trim() !== '' && password.trim() !== '' && termsAccepted && ageConfirmed;
    };

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
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Fallo en el registro, intente nuevamente.');
            }

            const data = await response.json();

            // Guardar la información en el contexto
            login(data.email);  // O el identificador de usuario retornado por la API

            // Redirigir al usuario a la página de perfil
            navigate('/users');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLoginRedirect = () => {
        navigate('/');  // Redirigir al usuario a la página de inicio de sesión
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
                            <label htmlFor="user_name">Nombre:</label>
                            <input
                                type="text"
                                id="user_name"
                                name="user_name"
                                value={userData.user_name}
                                onChange={handleRegister}
                                required
                            /><br />
                            <label htmlFor="lastname">Apellido:</label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={userData.lastname}
                                onChange={handleRegister}
                                required
                            /><br />
                            <label htmlFor="address">Dirección:</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={userData.address}
                                onChange={handleRegister}
                                required
                            /><br />
                            <label htmlFor="phone">Teléfono:</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={userData.phone}
                                onChange={handleRegister}
                                required
                            /><br />
                            <label htmlFor="country">País:</label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={userData.country}
                                onChange={handleRegister}
                                required
                            /><br />
                            <label htmlFor="city">Ciudad:</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={userData.city}
                                onChange={handleRegister}
                                required
                            /><br />
                            <button type="submit" disabled={loading}>
                                {loading ? 'Actualizando...' : 'Actualizar'}
                            </button>
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
                                {'Iniciar sesión'}
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


