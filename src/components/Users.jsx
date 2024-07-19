import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../styles/users.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Users() {

    // const { email, password, user_name, lastname, address, phone, country, city } = useAuth(); // Obtener el correo electrónico del usuario actual
    const { email } = useAuth(); // Obtener el correo electrónico del usuario actual
    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState({});
    const [error, setError] = useState(null);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('useEffect triggered');
                console.log("Fetching data for email:", email); // Log email
                const response = await fetch(`https://trabajo-finalcac.vercel.app/users?email=${email}`, { mode: 'cors' });

                console.log('Fetch url:', URL);
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    toast.error('Algo huele mal...');
                    //salta primero este error, habria que ver loe headers
                    const text = await response.text();
                    throw new Error(`Expected JSON, received: ${text}`);

                }
                if (response.status === 204) {
                    alert("no hay contenido")
                    throw new Error('No hay contenido en la respuesta');

                }
                const data = await response.json();
                if (response.ok) {
                    setUserData(data);
                    localStorage.setItem('userData', JSON.stringify(data));
                } else {
                    console.error("Error fetching data:", data.error); // Log error
                    setError(data.error || 'Error desconocido al cargar datos del usuario');
                }
            } catch (error) {
                console.error("Fetch error:", error); // Log error
                setError(error.message || 'Error al conectar con el servidor');
            }
        };
        if (email) {
            fetchData();
        }
    }, [email]);


    const togglePasswordVisibility = () => {
        setShowPassword(true); // Mostrar la contraseña temporalmente como texto
        setTimeout(() => {
            setShowPassword(false); // Restablecer la visibilidad de la contraseña después de - 1/2 segundo
        }, 200);
    };

    const handleLogout = () => {
        logout(); // Llama a la función de logout del contexto
        localStorage.removeItem('email');
        localStorage.removeItem('userData');
        navigate('/'); // Redirige al usuario a la página principal
    };

    //eliminar usuario
    const handleDeleteUser = async () => {
        if (window.confirm('¿Está seguro de que desea eliminar este usuario? Esta acción es irreversible.')) {
            setLoading(true);
            setError(null);


            try {
                const response = await fetch(`https://trabajo-finalcac.vercel.app/users?email=${email}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    toast.success('Usuario eliminado exitosamente');
                    navigate('/');
                   
                } else {
                    throw new Error(data.error || 'Error desconocido al eliminar el usuario');
                }
            } catch (error) {
                
                setError(error.message);
            } finally {
                setLoading(false);    
                handleLogout();          
            }
        }
    };


    return (
        <div className='main'>
            <div className='title'> <h4>Datos del usuario {`${email.split('@')[0]}`}:</h4></div>
            <div className='container-principal'>
                <div className="user-details">
                    <table className='table'>
                        <tbody>
                            <tr>
                                <td>Email:</td>
                                <td>{email}</td>
                            </tr>
                            <tr>
                                <td>Contraseña:</td>
                                <td>
                                    {showPassword ? userData.password : '••••••••'}
                                    <button className='eye_button' type="button" onClick={togglePasswordVisibility} style={{ marginLeft: '10px' }}>
                                        <img src="/img/ojo-cerrado.png" alt="ojo" />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>Nombre:</td>
                                <td>{userData.user_name}</td>
                            </tr>
                            <tr>
                                <td>Apellido:</td>
                                <td>{userData.lastname}</td>
                            </tr>
                            <tr>
                                <td>Dirección:</td>
                                <td>{userData.address}</td>
                            </tr>
                            <tr>
                                <td>Teléfono:</td>
                                <td>{userData.phone}</td>
                            </tr>
                            <tr>
                                <td>País:</td>
                                <td>{userData.country}</td>
                            </tr>
                            <tr>
                                <td>Ciudad:</td>
                                <td>{userData.city}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='buttons'>
                        <Link to={'/updateuser'}>
                            <button className='btn' type="submit" >
                                Actualizar datos
                            </button>
                        </Link>
                        <Link to={'/'}>
                            <button className='btn' onClick={handleLogout}>
                                Cerrar sesión
                            </button>
                        </Link>
                        <Link to={'/'}>
                            <button className='btn' onClick={handleDeleteUser}>
                                Eliminar usuario
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}






