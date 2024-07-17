import {React, useState} from 'react'
import { useAuth } from '../context/authContext';
import { useParams } from 'react-router-dom';
import '../styles/users.css';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';


const UpdateUsr = () => {

    const { email:authEmail, password } = useAuth(); // Obtener el correo electrónico del usuario actual
    const { email: emailParam } = useParams(); // Obtener el parámetro de la ruta dinámica
    const email = emailParam || authEmail;
    const [showPassword_2, setShowPassword_2] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const encodedEmail = encodeURIComponent(email); 
    const [userDataUpdate, setUserDataUpdate] = useState({
        password: '',
        user_name: '',
        lastname: '',
        address: '',
        phone: '',
        country: '',
        city: ''
    });


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
 const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            console.log(email);
          
            console.log("Updating data:", userDataUpdate);
            const encodedEmail = encodeURIComponent(email); 
            console.log(encodedEmail);
            const response = await fetch(`https://trabajo-finalcac.vercel.app/updateuser?email=${encodedEmail}`,  {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userDataUpdate)
            });

            const text = await response.text();  
            console.log('Response Text:', text); 
            
             // Verificar si la respuesta tiene el encabezado adecuado
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            alert("Received non-JSON response");
            throw new Error(`Expected JSON, received: ${text}`);
        }

        let data;
        try{
            data = JSON.parse(text);
       }catch (error) {
           alert("Error parsing JSON response");
           throw new Error(`Expected JSON, received: ${text}`);
       }  
   
            if (response.ok) {
                console.log("Datos actualizados con éxito:", data); // Log success
                toast.success('Datos actualizados con éxito'); 
            } else {
                console.error("Error al actualizar datos:", data.error); // Log error
                toast.error('Error al actualizar datos:', data.error);
                setError(data.error || 'Error desconocido al actualizar datos del usuario');
            }
        } catch (error) {
            console.error("Update error:", error); // Log error
            toast.error('Update error::', error);
            setError(error.message || 'Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
};

  return (
    <div className="container">
                <h4>Modificar perfil:</h4>
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
                    <br />
                    <button className='eye_button' type="button" onClick={togglePasswordVisibility_2}>
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
                    <button className='btn' type="submit" disabled={loading}>
                        {loading ? 'Actualizando...' : 'Actualizar'}
                    </button>
                </form>
            </div>       
  )
}

export default UpdateUsr
