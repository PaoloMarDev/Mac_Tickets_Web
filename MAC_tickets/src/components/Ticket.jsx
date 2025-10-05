import React from "react";
import "../components_css/Ticket.css";

const Ticket = ({ ticket, onClick }) => {

  


  return (
    <section>
     <div className="ticket-card" onClick={() => onClick(ticket.Ticket_ID)}>
      {/* Barra lateral */}
      <div className="ticket-bar"></div>

      {/* Contenido */}
      <div className="ticket-content">
        <div className="ticket-left">
          <h2 className="ticket-title">{ticket.title}</h2>
          <span className="label">{ticket.priority}</span>
          <span className="label">{ticket.category}</span>
        </div>

        <div className="ticket-right">
          <span className="ticket-description">Descripción</span>
          <span>
            {ticket.description}
          </span>
          <div className="ticket-data">
            <span className="label bold">{ticket.created_at}</span>
          </div>
        </div>
      </div>
    </div>
    <div className="limiter"></div>
    </section>
  );
};

export default Ticket;
