
import { useEffect, useState } from "react";
import Ticket from "./Ticket.jsx";

import Mta from './MenuTicketAdmin.jsx'
import VistaDeChatTicket from './VistaDeChatTicket.jsx'


const AllClosedTicketList = ({setListToUse, getListToUse}) => {
  const [tickets, setTickets] = useState([]); // Estado que guarda todos los tickets obtenidos de la API
  const [loadedTickets, setLoadedTickets] = useState(false); // Estado para indicar si la carga ha finalizado (éxito o fallo)
  const [hasError, setHasError] = useState(false); // Estado para manejar si hubo un error en la carga
  const [selectedTicket, setSelectedTicket] = useState(null); 

  const userid = localStorage.getItem("id"); // Obtenemos el id del usuario que está guardado en el localstorage
  const role = localStorage.getItem("role"); // Obtenemos el id del usuario que está guardado en el localstorage

  useEffect(() => {
    // 1. Resetear estados al iniciar la carga
    setLoadedTickets(false);
    setHasError(false);

    // 2. Usar la cadena de promesas de fetch para manejar errores
    fetch(`http://Api-tickets-env.eba-3z343hb2.us-east-1.elasticbeanstalk.com/tickets/ticketsCerrados`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        },
    })
      .then(res => {
        if (!res.ok) {
          // Si la respuesta HTTP no es 2xx, lanzar un error
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        // 3. Éxito: Establecer los tickets y marcar como cargado
        setLoadedTickets(true);
        setListToUse(data)
        setTickets(getListToUse())
      })
      .catch(error => {
        // 4. Fallo: Registrar el error y marcar que hubo un error
        console.error("Fetch failed:", error);
        setHasError(true);
        setLoadedTickets(true); // La carga ha finalizado, aunque con error
      });
  }, [userid]); // Añadir userid como dependencia por si cambia


    // **Añadir un segundo useEffect para actualizar tickets cuando la lista filtrada cambie**
    // Esto se activa cada vez que el padre (Administrador) llama a setFilteredList a través de setListToUse.
    useEffect(() => {
      setTickets(getListToUse());
    }, [getListToUse]);

    const handleClick = (ticketData) => {
     // ticketData ahora recibe el objeto del ticket
     setSelectedTicket(ticketData); 
   };

   // Función para cerrar el modal
   const handleCloseModal = () => {
     setSelectedTicket(null);
   };

  // --- Renderizado Condicional ---

  

  // 1. Mostrar mensaje de error si hasError es true
  if (hasError) {
    return (
      <div className="error-message">
        <p>No se pudieron cargar los tickets. Por favor, inténtalo de nuevo más tarde.</p>
      </div>
    );
  }



  // 2. Mostrar "Sin tickets" si ya cargó y la lista está vacía
  if (loadedTickets && tickets.length === 0) {
    return (
      <div className="empty-state">
        <p>Sin tickets</p>
      </div>
    );
  }



  // 3. (Opcional) Mostrar un mensaje de carga mientras se obtienen los datos
  if (!loadedTickets) {
      return (
          <div className="loading-state">
              <p>Cargando tickets...</p>
          </div>
      );
  }



// Mostrar la lista y el modal (si está abierto)
if(role == 'MESA'){
  return (
       <div className="ticket-list-container">
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
             <div className="menu-ticket-admin" onClick={e => e.stopPropagation()}>
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

// Mostrar la lista y el modal (si está abierto)
  return (
     <div className="ticket-list-container">
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
           <div className="menu-ticket-admin" onClick={e => e.stopPropagation()}>
             <Mta 
               ticket={selectedTicket}
               onExit={handleCloseModal}
             />
           </div>
         </div>
       )}
     </div>
  );
}

export default AllClosedTicketList