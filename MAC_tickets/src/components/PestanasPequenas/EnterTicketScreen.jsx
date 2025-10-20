import React, { useEffect, useState } from "react";
import '../../components_css/EnterTicketScreen.css'

import VistaDeChatTicket from './VistaDeChatTicket.jsx'


const EnterTicketScreen = ({ ticket, onExit }) => { // Renamed for clarity (Read-Only View)
  
  const [selectedTicket, setSelectedTicket] = useState(null); 


    const handleOpenEditTIcket = (ticketData) => {
     // ticketData ahora recibe el objeto del ticket
     setSelectedTicket(ticketData); 
     console.log(ticketData)
    };
    
    // Función para cerrar el modal
    const handleCloseModal = () => {
     setSelectedTicket(null);
   };
  
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
          handleOpenEditTIcket(ticket)
        }}>Editar</button>
      </footer>

        {selectedTicket && (
          <div className="vista-modal-overlay" onClick={handleCloseModal}>
            <div className="vista-modal-content" onClick={e => e.stopPropagation()}>
              <VistaDeChatTicket 
                ticket={selectedTicket} 
                onExit={handleCloseModal}
              />
            </div>
          </div>
        )}

    </div>
  );
}
export default EnterTicketScreen;



