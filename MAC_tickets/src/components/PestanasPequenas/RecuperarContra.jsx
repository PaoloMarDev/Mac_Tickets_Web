import { useEffect, useState } from 'react';
import { useRef } from "react"

const RecuperarContrasena = ({user, onExit}) => {
    
    const formulario = useRef(null)
    
    const RecuperarContra = async (evt) => {
      evt.preventDefault();
  
      const from = new FormData(formulario.current);
      const dataToSend = Object.fromEntries(from.entries());
  
      console.log(dataToSend)
      if(dataToSend.password != dataToSend.confpassword){
        return alert("Las contraseñas no son iguales :C")
    }
      if(dataToSend.email != user.email){
        return alert("Ese correo no es el de la cuenta >:C")
    }
    
    try{
        const bodyData = { email: user.email,
                           password : dataToSend.password
         };
        
        const response = await fetch(`http://localhost:3000/usuarios/recuperar`,{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                authorization : `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(bodyData)
        });

        if (!response.ok) {
                // Si la petición falla (ej: error 404/500), lanzamos un error
                throw new Error(`Fallo la recuperación de contraseña: ${response.status}`);
            }

        onExit()
        } catch(error){
            console.error("Error al desactivar el usuario:", error)
            alert("Error al desactivar el usuario:")
        }

    }




  return (
    <section className="form-wrapper">

    <div className="form-container">
      <h2>Recuperar Contraseña</h2>

      <form ref={formulario}>
        {/* Grupo de Email */}
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <div className="input-field">
            <span className="icon">📧</span> {/* Placeholder de ícono de sobre */}
            <input 
              name = "email"
              type="email" 
              id="email" 
              placeholder="Email" 
              />
          </div>
        </div>

        {/* Grupo de Contraseña */}
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="input-field">
            <span className="icon">🔒</span> {/* Placeholder de ícono de candado */}
            <input 
              name = "password"
              type="password" 
              id="password" 
              placeholder="Password"
              />
          </div>
        </div>

        {/* Grupo de Confirmar Contraseña */}
        <div className="input-group">
          <label htmlFor="confirm-password">Confirm password</label>
          <div className="input-field">
            <span className="icon">🔒</span> {/* Placeholder de ícono de candado */}
            <input 
              name = "confpassword"
              type="password" 
              id="confirm-password" 
              placeholder="Password"
              />
          </div>
        </div>

        {/* Acciones del Formulario (Botones) */}
        <footer className="form-actions">
          <button className="btn accept-btn" onClick={RecuperarContra}>Recuperar</button>
          <button className="btn cancel-btn" onClick={onExit}>Cancelar</button>
        </footer>
      </form>
    </div>
    </section>
  );
}


export default RecuperarContrasena

