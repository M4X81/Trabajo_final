import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/form.css';

export default function Users() {
    const { mail, pass } = useAuth();
    console.log('mail:', mail, 'pass:', pass); // Verificar valores
    const { email } = useParams(); // Obtener el parámetro de la ruta dinámica
    const [userData, setUserData] = useState({   
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
            const response = await fetch(`https://trabajo-finalcac.vercel.app/register/${email}`);
            
            // Verificar si la respuesta no es JSON
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = await response.text();
                throw new Error(`Expected JSON, received: ${text}`);
            }

            const data = await response.json();
            if (response.ok) {
                setUserData({
                    email: data.email,
                    password: data.password,
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

    if (email) {
         fetchData();
    }
   
}, [email]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            
            let apiUrl = `https://trabajo-finalcac.vercel.app/register/${email}`;
            // let apiUrl = `https://trabajo-finalcac.vercel.app/users`;

            let method = 'PUT'; // Método por defecto para actualizar

            if (!email) {
                // Si no hay email (es decir, estás creando un nuevo usuario)
                apiUrl = `https://trabajo-finalcac.vercel.app/register`;
                method = 'POST';
            }

            const response = await fetch(apiUrl, {
                method: method,
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
            setShowPassword(false); // Restablecer la visibilidad de la contraseña después de 1/2 segundo
        }, 500);
    };

    return (
        <div>
            <h4>Completar perfil de usuario de {`${mail.split('@')[0]}`}</h4>
            < div className="container">
                <h6>Registro</h6>
                <form id="registerForm">
                    <label htmlFor="regEmail">Email:</label>
                    <input
                        type="email"
                        id="regEmail"
                        name="email"
                        value={`${mail}`}
                        readOnly // Para evitar que se pueda editar el campo
                        required
                    /><br />
                    <label htmlFor="regPassword">Contraseña:</label>
                    <input
                        type={showPassword ? 'text' : 'password'} // Cambiar dinámicamente entre tipo texto y contraseña
                        id="regPassword"
                        name="password"
                        value={`${pass}` || ''} // Aquí supongo que `password` también está disponible en tu contexto
                        readOnly // Para evitar que se pueda editar el campo
                        required
                    />
                    <button type="button" onClick={togglePasswordVisibility}>
                        <img src="/img/ojo-cerrado.png" alt="ojo"></img>
                    </button>
                    <br />
                </form>
                <h6>Completar datos</h6>
                <form id="profileForm" onSubmit={handleSubmit}>
                    <label htmlFor="user_name">Nombre:</label>
                    <input
                        type="text"
                        id="user_name"
                        name="user_name"
                        value={userData.user_name || ''}
                        onChange={(e) => setUserData({ ...userData, user_name: e.target.value })}
                        // required
                    /><br />
                    <label htmlFor="lastname">Apellido:</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={userData.lastname || ''}              
                        onChange={(e) => setUserData({ ...userData, lastname: e.target.value })}
                        required
                    /><br />
                    <label htmlFor="address">Dirección:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={userData.address || ''}
                        onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                        // required
                    /><br />
                    <label htmlFor="phone">Teléfono:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={userData.phone || ''}
                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        // required
                    /><br />
                    <label htmlFor="country">País:</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={userData.country || ''}
                        onChange={(e) => setUserData({ ...userData, country: e.target.value })}
                        // required
                    /><br />
                    <label htmlFor="city">Ciudad:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={userData.city || ''}
                        onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                        // required
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





