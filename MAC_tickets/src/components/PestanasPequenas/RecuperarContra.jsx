

const RecuperarContrasena = () => {
    
  return (
    <section className="form-wrapper">

    <div className="form-container">
      <h2>Recuperar Contraseña</h2>

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

      {/* Acciones del Formulario (Botones) */}
      <footer className="form-actions">
        <button className="btn accept-btn">Recuperar</button>
        <button className="btn cancel-btn">Cancelar</button>
      </footer>
    </div>
            </section>
  );
}


export default RecuperarContrasena

