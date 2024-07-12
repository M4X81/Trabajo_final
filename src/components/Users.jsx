import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useParams } from 'react-router-dom';
import '../styles/form.css';

export default function Users() {
    const { mail, pass } = useAuth();// Obtener el correo electrónico del usuario actual
    const { email } = useParams(); // Obtener el parámetro de la ruta dinámica
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword_2, setShowPassword_2] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userDataDB, setUserDataDB] = useState({
      
        user_name: '',
        lastname: '',
        address: '',
        phone: '',
        country: '',
        city: ''
    });

    const [userDataUpdate, setUserDataUpdate] = useState({
        pass: '',
        user_name: '',
        lastname: '',
        address: '',
        phone: '',
        country: '',
        city: ''
    });
   

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://trabajo-finalcac.vercel.app/users`);
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    const text = await response.text();
                    throw new Error(`Expected JSON, received: ${text}`);
                }

                const data = await response.json();
                if (response.ok) {
                    setUserDataDB(data);
                    console.log("datos seteados" ,userDataDB);
                    setUserDataUpdate(data);
                } else {
                    setError(data.error || 'Error desconocido al cargar datos del usuario');
                }
            } catch (error) {
                setError(error.message || 'Error al conectar con el servidor');
            }
        };

        if (email) {
            fetchData();
        }
    }, [email, pass]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            let apiUrl = `https://trabajo-finalcac.vercel.app/users`;
            let method = 'PUT'; // Método por defecto para actualizar

            const response = await fetch(apiUrl, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userDataUpdate)
            });

            const data = await response.json();
            if (response.ok) {
                alert('Datos actualizados con éxito');
            } else {
                setError(data.error || 'Error desconocido al actualizar datos del usuario');
            }
        } catch (error) {
            setError(error.message || 'Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(true); // Mostrar la contraseña temporalmente como texto
        setTimeout(() => {
            setShowPassword(false); // Restablecer la visibilidad de la contraseña después de - 1/2 segundo
        }, 200);
    };

    const togglePasswordVisibility_2 = () => {
        setShowPassword_2(true);
        setTimeout(() => {
            setShowPassword_2(false);
        }, 2000);
    };
//revisar esta, quizas poner un hover en vez del setTimeOut

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDataUpdate({ ...userDataUpdate, [name]: value });
    };

    return (
        <div>
             <div className="user-details">
                <h5>Datos del usuario {`${mail.split('@')[0]}`}:</h5>
                <table>
                    <tbody>
                        <tr>
                            <td>Email:</td>
                            <td>{mail}</td>
                        </tr>
                        <tr>
                            <td>Contraseña:</td>
                            <td>
                                {showPassword ? pass : '••••••••'}
                                <button type="button" onClick={togglePasswordVisibility} style={{ marginLeft: '10px' }}>
                                    <img src="/img/ojo-cerrado.png" alt="ojo" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre:</td>
                            <td>{userDataDB.user_name}</td>
                        </tr>
                        <tr>
                            <td>Apellido:</td>
                            <td>{userDataDB.lastname}</td>
                        </tr>
                        <tr>
                            <td>Dirección:</td>
                            <td>{userDataDB.address}</td>
                        </tr>
                        <tr>
                            <td>Teléfono:</td>
                            <td>{userDataDB.phone}</td>
                        </tr>
                        <tr>
                            <td>País:</td>
                            <td>{userDataDB.country}</td>
                        </tr>
                        <tr>
                            <td>Ciudad:</td>
                            <td>{userDataDB.city}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h4>Modificar perfil:</h4>
            <div className="container">
                <form id="profileForm" onSubmit={handleSubmit}>
                <label htmlFor="regPassword">Contraseña:</label>
                    <input
                        type={showPassword_2 ? 'text' : 'password'} // Cambiar dinámicamente entre tipo texto y contraseña
                        id="regPassword"
                        name="password"
                        value={userDataUpdate.password} 
                        onChange={handleInputChange}
                        required
                    />
                    <br/>
                    <button type="button" onClick={togglePasswordVisibility_2}>
                        <img src="/img/ojo-cerrado.png" alt="ojo"></img>
                    </button>
                    <br />
                    <label htmlFor="user_name">Nombre:</label>
                    <input
                        type="text"
                        id="user_name"
                        name="user_name"
                        value={userDataUpdate.user_name}
                        onChange={handleInputChange}
                        required
                    /><br />
                    <label htmlFor="lastname">Apellido:</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={userDataUpdate.lastname}              
                        onChange={handleInputChange}
                        required
                    /><br />
                    <label htmlFor="address">Dirección:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={userDataUpdate.address}
                        onChange={handleInputChange}
                        required
                    /><br />
                    <label htmlFor="phone">Teléfono:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={userDataUpdate.phone}
                        onChange={handleInputChange}
                        required
                    /><br />
                    <label htmlFor="country">País:</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={userDataUpdate.country}
                        onChange={handleInputChange}
                        required
                    /><br />
                    <label htmlFor="city">Ciudad:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={userDataUpdate.city}
                        onChange={handleInputChange}
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






