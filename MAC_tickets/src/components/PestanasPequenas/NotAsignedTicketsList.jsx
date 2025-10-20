import React, { useEffect, useState } from "react";
import Ticket from "./Ticket.jsx";
import AceptarTicketScreen from "./AceptarTicketScreen.jsx";


export default function TicketList() {
   const [tickets, setTickets] = useState([]);
   const [loadedTickets, setLoadedTickets] = useState(false);
   const [hasError, setHasError] = useState(false);
  
   const [selectedTicket, setSelectedTicket] = useState(null); 

   const userid = localStorage.getItem("id");

   useEffect(() => {
     // ... (Lógica de fetch, sin cambios)
     setLoadedTickets(false);
     setHasError(false);

       fetch(`http://localhost:3000/tickets/nonAceptedTickets/${userid}`, {
          method: 'GET',
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          },
       })
       .then(res => {
         if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
         }
         return res.json();
       })
       .then(data => {
         setTickets(data);
         setLoadedTickets(true);
       })
       .catch(error => {
         console.error("Fetch failed:", error);
         setHasError(true);
         setLoadedTickets(true);
       });
   }, [userid]); 

   const handleClick = (ticketData) => {
     // ticketData ahora recibe el objeto del ticket
     setSelectedTicket(ticketData); 
   };

   // Función para cerrar el modal
   const handleCloseModal = () => {
     setSelectedTicket(null);
   };


   // --- Renderizado Condicional de Estados de Carga/Error ---
   if (!loadedTickets) {
     return <div className="loading-state"><p>Cargando tickets...</p></div>;
   }

   if (hasError || tickets.length === 0) {
     return (
       <div className="empty-state">
         <p>{hasError ? "No se pudieron cargar los tickets." : "Sin tickets"}</p>
       </div>
     );
   }

// Mostrar la lista y el modal (si está abierto)
  return (
     <div className="ticket-list-container">
    
       {/* 1. Lista de Tickets: CORRECCIÓN APLICADA AQUÍ */}
        {tickets.map(ticket => (
         <Ticket 
           key={ticket.id} 
           ticket={ticket} 
           // Esto asegura que el objeto 'ticket' se pase a handleClick
           onClick={() => handleClick(ticket)} 
         />
       ))}

       {/* 2. Modal Condicional */}
       {selectedTicket && (
         <div className="modal-overlay" onClick={handleCloseModal}>
           <div className="modal-content" onClick={e => e.stopPropagation()}>
             <AceptarTicketScreen 
               ticket={selectedTicket} 
               onExit={handleCloseModal}
             />
           </div>
         </div>
       )}
     </div>
  );
}