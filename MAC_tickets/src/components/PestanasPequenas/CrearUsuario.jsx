import { useEffect, useState } from 'react';
import { useRef } from "react"


import '../../components_css/CrearRecupUsuario.css'


const CrearUsuario = ({onExit}) => {

  const formulario = useRef(null)
  
  const CreateUser = async (evt) => {
    evt.preventDefault();

    const from = new FormData(formulario.current);
    const dataToSend = Object.fromEntries(from.entries());
    

    console.log(dataToSend)
    if(dataToSend.username == '' || dataToSend.email == '' || dataToSend.password == '' || dataToSend.newPassword == ''){
        return alert("Faltan información para completar el usuario")
      }

    if(dataToSend.password != dataToSend.newPassword){
      return alert("Las contraseñas no son iguales :C")
    }

    

      try{

        await fetch('http://localhost:3000/usuarios/insertar',{
          method: "POST",
          headers: {
            'Content-Type' : 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body : JSON.stringify({
            "username" : dataToSend.username,
            "email" : dataToSend.email,
            "password" : dataToSend.password,
            "role" : dataToSend.role
          })
        })

        onExit()
      } catch {
        alert("No se pudo agregar el nuevo usuario")
        console.error("No se pudo agregar el nuevo usuario", error)
      }
  }



  return (
    <section className='form-wrapper'>
      <div className="form-container">
        <form ref={formulario}>
          {/* Grupo de Email */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-field">
              <span className="icon">📧</span> {/* Placeholder de ícono de sobre */}
              <input 
                name='email'
                type="email" 
                id="email" 
                placeholder="Email" 
                />
            </div>
          </div>

          {/* Grupo de Nombre de Usuario */}
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <div className="input-field">
              <span className="icon">👤</span> {/* Placeholder de ícono de persona */}
              <input 
                name='username'
                type="text" 
                id="username" 
                placeholder="Nombre de Usuario"
                />
            </div>
          </div>

          {/* Grupo de Contraseña */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-field">
              <span className="icon">🔒</span> {/* Placeholder de ícono de candado */}
              <input 
                name='password'
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
                name='newPassword'
                type="password" 
                id="confirm-password" 
                placeholder="Password"
                />
            </div>
          </div>

          {/* Roles / Radios */}
          <div className="radio-group-container">
            <div className="radio-option">
              <input type="radio" id="admin" name="role" value={"ADMIN"} defaultChecked />
              <label htmlFor="admin">Administrator</label>
            </div>
            <div className="radio-option">
              <input type="radio" id="mesa" name="role" value={"MESA"}/>
              <label htmlFor="mesa">Mesa de Trabajo</label>
            </div>
            <div className="radio-option">
              <input type="radio" id="tecnico" name="role" value={"TECNICO"}/>
              <label htmlFor="tecnico">Técnico</label>
            </div>
          </div>
        </form>

        {/* Acciones del Formulario (Botones) */}
        <footer className="form-actions">
          <button className="btn accept-btn" onClick={CreateUser}>Aceptar</button>
          <button className="btn cancel-btn" onClick={onExit}>Cancelar</button>
        </footer>
      </div>
    </section>
  );
}

export default CrearUsuario;