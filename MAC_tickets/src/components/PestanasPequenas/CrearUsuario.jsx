
import '../../components_css/CrearRecupUsuario.css'

import React from 'react';

const CrearUsuario = () => {


  return (
    <section className='form-wrapper'>
      <div className="form-container">
        
        {/* Grupo de Email */}
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <div className="input-field">
            <span className="icon">📧</span> {/* Placeholder de ícono de sobre */}
            <input 
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
              type="password" 
              id="confirm-password" 
              placeholder="Password"
            />
          </div>
        </div>

        {/* Roles / Radios */}
        <div className="radio-group-container">
          <div className="radio-option">
            <input type="radio" id="admin" name="role" defaultChecked />
            <label htmlFor="admin">Administrator</label>
          </div>
          <div className="radio-option">
            <input type="radio" id="mesa" name="role" />
            <label htmlFor="mesa">Mesa de Trabajo</label>
          </div>
          <div className="radio-option">
            <input type="radio" id="tecnico" name="role" />
            <label htmlFor="tecnico">Técnico</label>
          </div>
        </div>

        {/* Acciones del Formulario (Botones) */}
        <footer className="form-actions">
          <button className="btn accept-btn">Aceptar</button>
          <button className="btn cancel-btn">Cancelar</button>
        </footer>
      </div>
    </section>
  );
}

export default CrearUsuario;