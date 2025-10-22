import "../../components_css/Ticket.css";

const Ticket = ({ ticket, onClick }) => {

  const maxLength = 200;

  return (
    <section>
     <div className="ticket-card" onClick={() => onClick(ticket.id)}>
      
      <div className="ticket-bar"></div> {/* Barra lateral */}

      {/* Contenido */}
      <div className="ticket-content">
        <div className="ticket-left">
          <h2 className="ticket-title">{ticket.title}</h2>
          <span className="label">{ticket.priority}</span>
          <span className="label">{ticket.category}</span>
        </div>

        <div className="ticket-middle">
          <span className="ticket-description">Descripción</span>
          <span>
              {ticket.description.length > maxLength
                ? ticket.description.substring(0, maxLength) + '...'
                : ticket.description}
          </span>
            <span className="label bold">{ticket.created_at.substring(0, 10)}</span>
        </div>
        <div className="ticket-right">
          <h2 className="ticket-description">{ticket.status}</h2>
        </div>
      </div>
    </div>
    <div className="limiter"></div>
    </section>
  );
};

export default Ticket;
