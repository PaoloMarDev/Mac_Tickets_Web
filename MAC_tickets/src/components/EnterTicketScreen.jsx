
import '../components_css/EnterTicketScreen.css'

function EnterTicketScreen() { // Renamed for clarity (Read-Only View)
  // ... state and props
  
  return (
<div className="ticket-container">
      <header className="ticket-header">
        <h1>Título Ticket</h1>
        <p className="technician-name">Nombre Técnico</p>
      </header>
      
      <div className="metadata-row">
        <div className="priority-select">
          {/* Placeholder for a checkbox/radio or custom selector */}
          <span className="placeholder-box"></span>
          <label>Prioridad - Alto/Medio/Bajo</label>
        </div>
        <div className="category-select">
          {/* Placeholder for a checkbox/radio or custom selector */}
          <span className="placeholder-box"></span>
          <label>Categoría - Lorem ipsum</label>
        </div>
      </div>
      <div className="description-section">
        <h2 className="description-title">Description</h2>
        <p className="description-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="content-spacer"></div> 
      </div>
      
      {/* 🚨 THE ONLY CHANGE IS HERE 🚨 */}
      <footer className="ticket-actions">
        <button className="btn exit-btn">Salir</button>
        <button className="btn edit-btn">Editar</button>
      </footer>
    </div>
  );
}
export default EnterTicketScreen;



