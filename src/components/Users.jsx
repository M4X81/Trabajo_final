import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useParams } from 'react-router-dom';
import '../styles/users.css';

export default function Users() {

    const { email, password } = useAuth(); // Obtener el correo electrónico del usuario actual
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         console.log('useEffect triggered');
        //         console.log("Fetching data for email:", email); // Log email
        //         // const response = await fetch(`https://trabajo-finalcac.vercel.app/users`,
        //         //    {mode: 'no-cors'});
        //         const response = await fetch(`https://trabajo-finalcac.vercel.app/users?email=${email}`, {mode: 'cors'});

        //            console.log('Fetch url:', URL);
        //         const contentType = response.headers.get("content-type");
        //         if (!contentType || !contentType.includes("application/json")) {
        //             alert("algo anda mal...");
        //             //salta primero este error, habria que ver loe headers
        //             const text = await response.text();                  
        //             throw new Error(`Expected JSON, received: ${text}`);
                    
        //         }
        //         if (response.status === 204) {
        //             alert("no hay contenido")
        //             throw new Error('No hay contenido en la respuesta');
                    
        //         }
        //         const data = await response.json();
        //         if (response.ok) {
        //             alert("Data fetched successfully:", data)
        //             console.log("Data fetched successfully:", data); // Log data
        //             setUserDataUpdate(data);
                    
        //         } else {
        //             console.error("Error fetching data:", data.error); // Log error
        //             setError(data.error || 'Error desconocido al cargar datos del usuario');
                    
        //         }
        //     } catch (error) {
        //         alert('aca anda algo mal')
        //         console.error("Fetch error:", error); // Log error
        //         setError(error.message || 'Error al conectar con el servidor');
        //     }
        // };
        //-------------------------------
        const fetchData = async () => {
            try {
                console.log('useEffect triggered');
                console.log("Fetching data for email:", email); // Log email
                const response = await fetch(`https://trabajo-finalcac.vercel.app/users`, {mode: 'cors'});
                // const response = await fetch(`https://localhost:5173/users`, {mode: 'cors'});
                console.log('Fetch url:', response.url);
                if (response.ok) {
                    const data = await response.json();
                    console.log("Data fetched successfully:", data); // Log data
                    setUserDataUpdate(data);
                } else {
                    const text = await response.text();
                    throw new Error(`Error fetching data: ${text}`);
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
                                {showPassword ? password : '••••••••'}
                                <button className='eye_button'type="button" onClick={togglePasswordVisibility} style={{ marginLeft: '10px' }}>
                                    <img src="/img/ojo-cerrado.png" alt="ojo" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre:</td>
                            <td>{}</td>
                        </tr>
                        <tr>
                            <td>Apellido:</td>
                            <td>{}</td>
                        </tr>
                        <tr>
                            <td>Dirección:</td>
                            <td>{}</td>
                        </tr>
                        <tr>
                            <td>Teléfono:</td>
                            <td>{}</td>
                        </tr>
                        <tr>
                            <td>País:</td>
                            <td>{}</td>
                        </tr>
                        <tr>
                            <td>Ciudad:</td>
                            <td>{}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    );
}






