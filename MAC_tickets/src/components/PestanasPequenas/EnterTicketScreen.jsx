
import '../../components_css/EnterTicketScreen.css'

function EnterTicketScreen({ ticket, onExit }) { // Renamed for clarity (Read-Only View)
  // ... state and props
  
  return (
<div className="ticket-container">
      <header className="ticket-header">
        <h1>{ticket.title}</h1>
        <p className="technician-name">Nombre Técnico</p>
      </header>
      
      <div className="metadata-row">
        <div className="priority-select">
          {/* Placeholder for a checkbox/radio or custom selector */}
          <span className="placeholder-box"></span>
          <label>Prioridad - {ticket.priority}</label>
        </div>
        <div className="category-select">
          {/* Placeholder for a checkbox/radio or custom selector */}
          <span className="placeholder-box"></span>
          <label>Categoría - {ticket.category}</label>
        </div>
      </div>
      <div className="description-section">
        <h2 className="description-title">Description</h2>
        <p className="description-text">
          {ticket.description}
        </p>
        <div className="content-spacer"></div> 
      </div>
      
      <footer className="ticket-actions">
        <button className="btn exit-btn" type="button" onClick={() => {
          onExit()
        }}>Salir</button>
        <button className="btn edit-btn" type='button' onClick={() => {
          alert("Este boton aún no tiene funcionamiento")
        }}>Editar</button>
      </footer>
    </div>
  );
}
export default EnterTicketScreen;



