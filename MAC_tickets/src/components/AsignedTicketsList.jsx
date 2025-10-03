import React, { useEffect, useState } from "react";
import Ticket from "../components/Ticket.jsx";

export default function TicketList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/tickets")
      .then(res => res.json())
      .then(data => setTickets(data));
  }, []);

  const handleClick = (id) => {
    alert("Abrir ticket con ID: " + id);
    // Aquí puedes navegar a otra vista o abrir modal de edición
  };

  return (
    <div>
      {tickets.map(ticket => (
        <Ticket key={ticket.id} ticket={ticket} onClick={handleClick} />
      ))}
    </div>
  );
}