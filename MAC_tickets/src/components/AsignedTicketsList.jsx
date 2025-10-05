import React, { useEffect, useState } from "react";
import Ticket from "../components/Ticket.jsx";

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  // Estado para indicar si la carga ha finalizado (éxito o fallo)
  
  const [loadedTickets, setLoadedTickets] = useState(false);
  // Estado para manejar si hubo un error en la carga
  const [hasError, setHasError] = useState(false);

  const userid = localStorage.getItem("id");

  useEffect(() => {
    // 1. Resetear estados al iniciar la carga
    setLoadedTickets(false);
    setHasError(false);

    // 2. Usar la cadena de promesas de fetch para manejar errores
    fetch(`http://localhost:3000/tickets/aceptedTickets/${userid}`)
      .then(res => {
        if (!res.ok) {
          // Si la respuesta HTTP no es 2xx, lanzar un error
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        // 3. Éxito: Establecer los tickets y marcar como cargado
        setTickets(data);
        setLoadedTickets(true);
      })
      .catch(error => {
        // 4. Fallo: Registrar el error y marcar que hubo un error
        console.error("Fetch failed:", error);
        setHasError(true);
        setLoadedTickets(true); // La carga ha finalizado, aunque con error
      });
  }, [userid]); // Añadir userid como dependencia por si cambia

  const handleClick = (id) => {
    alert("Abrir ticket con ID: " + id);
    // Aquí puedes navegar a otra vista o abrir modal de edición
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

  // 4. Mostrar la lista de tickets
  return (
    <div>
      {tickets.map(ticket => (
        <Ticket key={ticket.Ticket_ID} ticket={ticket} onClick={handleClick} />
      ))}
    </div>
  );
}