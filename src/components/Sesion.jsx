import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import '../styles/form.css';

const Sesion = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { login } = useAuth();  // Hook del contexto de autenticación
    const navigate = useNavigate(); // Hook para redireccionar, reemplaza useHistory

    const validateFields = () => {
        return email.trim() !== '' && password.trim() !== '';
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
            const response = await fetch('https://trabajo-finalcac.vercel.app/api/register', {
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
        navigate('/sesion');  // Redirigir al usuario a la página de inicio de sesión
    };

    return (
        <div className="contenedor">
            <div className="contenedor-layout">
                <main className="contenedor-tarjeta">
                    <div className="logo_reg"></div>
                    <h4>Te damos la bienvenida a nuestra plataforma CriptoApp</h4>

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
                           
                            {error && <p className="error">{error}</p>}

                        </section>
                        <section className="separador">
                               <button
                                type="button"
                                id="login-button2"
                                onClick={handleLoginRedirect}
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

export default Sesion;