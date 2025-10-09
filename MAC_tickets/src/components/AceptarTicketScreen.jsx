
import { useEffect } from 'react';
import '../components_css/AceptarTicketScreen.css'

const AceptarTicketScreen = ({ ticket, onExit }) =>{
    
  // Función para aceptar tickets
  const AceptarTicket = async () =>{
    try {
            const bodyData = { id: ticket.Ticket_ID };

            const response = await fetch(`http://localhost:3000/tickets/aceptarTicket`, {
                method: 'PATCH',
                headers: {
                 'Content-Type': 'application/json',
                  authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(bodyData)
            });

            if (!response.ok) {
                // Si la petición falla (ej: error 404/500), lanzamos un error
                throw new Error(`Fallo la aceptación del ticket: ${response.status}`);
            }

            // Si la petición fue exitosa, cerramos el modal
            onExit(); 
            // Opcional: podrías notificar al componente padre que la lista debe recargarse.

        } catch (error) {
            console.error("Error al aceptar el ticket:", error);
            // Opcional: Mostrar un mensaje de error al usuario.
        }
  }

  // Función para rechazar tickets
  const RechazarTicket = async () =>{
    try {
            const bodyData = { id: ticket.Ticket_ID };

            const response = await fetch(`http://localhost:3000/tickets/rechazarTicket`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(bodyData)
            });

            if (!response.ok) {
                // Si la petición falla (ej: error 404/500), lanzamos un error
                throw new Error(`Fallo la aceptación del ticket: ${response.status}`);
            }

            // Si la petición fue exitosa, cerramos el modal
            onExit(); 
            // Opcional: podrías notificar al componente padre que la lista debe recargarse.

        } catch (error) {
            console.error("Error al aceptar el ticket:", error);
            // Opcional: Mostrar un mensaje de error al usuario.
        }
  }


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
        {/* Potentially a large, empty div for the rest of the form/content area */}
        <div className="content-spacer"></div> 
      </div>
      
      <footer className="ticket-actions">
        <button className="btn exit-btn" type='button' onClick={onExit}>Salir</button>
        <button className="btn reject-btn" type='button' onClick={() => RechazarTicket(ticket)}>Rechazar</button>
        <button className="btn accept-btn" onClick={() => AceptarTicket(ticket)}>Aceptar</button>
      </footer>
    </div>
  );
}

export default AceptarTicketScreen