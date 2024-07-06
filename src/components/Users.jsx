import React from 'react';
import { useAuth } from '../context/authContext';

export default function Users() {
    const {username} = useAuth();
    return (
    
    <div>
      <h4>Completar perfil de usuario de {`${username.split('@')[0]}`}</h4>
      
    </div>
  )
}
