import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import '../styles/form.css';

export default function Users() {
    const { username, pass } = useAuth();
    const [userData, setUserData] = useState({
        // email: '',
        // password: '',
        user_name: '',
        lastname: '',
        address: '',
        phone: '',
        country: '',
        city: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://trabajo-finalcac.vercel.app/users?email=${username}`);
                const data = await response.json();
                if (response.ok) {
                    setUserData(data); // Establece todos los datos del usuario desde la respuesta del servidor
                } else {
                    setError(data.error);
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, [username, pass]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // const response = await fetch(`https://trabajo-finalcac.vercel.app/users?email=${username}`, {
            const response = await fetch(`https://trabajo-finalcac.vercel.app/users`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            if (response.ok) {
                alert('Datos actualizados con éxito');
                navigate('/');
            } else {
                setError(data.error);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(true); // Mostrar la contraseña temporalmente como texto

        setTimeout(() => {
            setShowPassword(false); // Restablecer la visibilidad de la contraseña después de 3 segundos
        }, 3000);
    };

    return (
        <div>
        <h4>Completar perfil de usuario de {`${username.split('@')[0]}`}</h4>
        <div className="container">
            <h6>Registro</h6>
            <form id="registerForm">
                <label htmlFor="regEmail">Email:</label>
                <input
                    type="email"
                    id="regEmail"
                    name="email"
                    value={`${username}`}
                    readOnly // Para evitar que se pueda editar el campo
                    required
                /><br />
                <label htmlFor="regPassword">Contraseña:</label>
                <input
                    type={showPassword ? 'text' : 'password'} // Cambiar dinámicamente entre tipo texto y contraseña
                    id="regPassword"
                    name="password"
                    value={`${pass}`} // Aquí supongo que `password` también está disponible en tu contexto
                    readOnly // Para evitar que se pueda editar el campo
                    required
                />
                <button type="button" onClick={togglePasswordVisibility}>
                    <img src="/img/ojo-cerrado.png" alt="ojo"></img>
                </button>
                <br />
            </form>
        </div>

            <div className="container">
                <h6>Completar datos</h6>
                <form id="profileForm" onSubmit={handleSubmit}>
                    <label htmlFor="user_name">Nombre:</label>
                    <input
                        type="text"
                        id="user_name"
                        name="user_name"
                        value={userData.user_name}
                        onChange={handleChange}
                        required
                    /><br />
                    <label htmlFor="lastname">Apellido:</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={userData.lastname}
                        onChange={handleChange}
                        required
                    /><br />
                    <label htmlFor="address">Dirección:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={userData.address}
                        onChange={handleChange}
                        required
                    /><br />
                    <label htmlFor="phone">Teléfono:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        required
                    /><br />
                    <label htmlFor="country">País:</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={userData.country}
                        onChange={handleChange}
                        required
                    /><br />
                    <label htmlFor="city">Ciudad:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={userData.city}
                        onChange={handleChange}
                        required
                    /><br />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Actualizando...' : 'Actualizar'}
                    </button>
                </form>
            </div>

            {error && <p className="error">{error}</p>}
        </div>
    );
}



