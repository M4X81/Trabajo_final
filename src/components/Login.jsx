import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import '../styles/form.css';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user_name, setUser_name] = useState('');
    const [lastname, setLastname] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { logIn } = useAuth();  // Hook del contexto de autenticación
    const navigate = useNavigate(); // Hook para redireccionar, reemplaza useHistory

    const handleLogin = async (event) => {
        event.preventDefault();

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('https://trabajo-finalcac.vercel.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error('Credenciales incorrectas');
            } else {
                console.log('Login - email:', data.email, 'password:', data.password);
                // // Guardar la información en local storage
                // localStorage.setItem('email', email);
                // localStorage.setItem('password', password);

                // // Guardar la información en el contexto si es necesario
                logIn(email, password, user_name, lastname, address, phone, country, city);  // Ejemplo: guardar el email en el contexto de autenticación           
                // Redirigir al usuario a la página de perfil u otra página protegida
                navigate('/');
            }

        } catch (error) {
            setError(error.message);
            alert("Email o Contraseña incorrectos, intente nuevamente...");
        } finally {
            setLoading(false);
        }
        navigate(`/users/${email}`);
    };

    return (
        <div className="contenedor">
            <div className="contenedor-layout">
                <main className="contenedor-tarjeta">
                    <div className="logo_reg"></div>
                    <h4>Te damos la bienvenida a nuestra plataforma CriptoApp</h4>

                    <form className="form" onSubmit={handleLogin}>
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

                            {error && <p className="error">{error}</p>}

                        </section>
                        <section className="separador">
                            <button
                                type="submit"
                                id="login-button2"
                                disabled={loading}
                            >
                                {loading ? 'Iniciando...' : 'Iniciar sesión'}
                            </button>
                        </section>

                    </form>
                </main>
            </div>
        </div>
    );
};

export default Login;
