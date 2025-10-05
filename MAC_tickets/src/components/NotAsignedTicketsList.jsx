import React, { useEffect, useState } from "react";
import Ticket from "../components/Ticket.jsx";

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  // 1. Estado para saber si la carga ya finalizó
  const [loadedTickets, setLoadedTickets] = useState(false);
  // 2. Estado para manejar si hubo un error en el fetch
  const [hasError, setHasError] = useState(false);

  const userid = localStorage.getItem("id");
  console.log(userid);

  useEffect(() => {
    // Resetear estados al iniciar la carga
    setLoadedTickets(false);
    setHasError(false);

    fetch(`http://localhost:3000/tickets/nonAceptedTickets/${userid}`)
      .then(res => {
        if (!res.ok) {
          // Si la respuesta HTTP no es 2xx, lanzar un error
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        // Éxito: Establecer los tickets y marcar como cargado
        setTickets(data);
        setLoadedTickets(true);
      })
      .catch(error => {
        // Fallo: Registrar el error y marcar que hubo un error
        console.error("Fetch failed:", error);
        setHasError(true);
        setLoadedTickets(true); // La carga ha finalizado, aunque con error
      });
  }, [userid]); // Añadir userid como dependencia

  const handleClick = (id) => {
    alert("Abrir ticket con ID: " + id);
    // Aquí puedes navegar a otra vista o abrir modal de edición
  };

  // --- Renderizado Condicional ---
  
  // Mostrar mensaje de "Cargando..." mientras se obtienen los datos
  if (!loadedTickets) {
      return (
          <div className="loading-state">
              <p>Cargando tickets...</p>
          </div>
      );
  }

  // Mostrar "Sin tickets" si hubo un error O si la lista está vacía
  if (hasError || tickets.length === 0) {
    return (
      <div className="empty-state">
        {/* Si hubo un error, muestra un mensaje de error, sino, muestra "Sin tickets" */}
        <p>{hasError ? "No se pudieron cargar los tickets." : "Sin tickets"}</p>
      </div>
    );
  }

  // Mostrar la lista de tickets
  return (
    <div>
      {tickets.map(ticket => (
        <Ticket key={ticket.Ticket_ID} ticket={ticket} onClick={handleClick} />
      ))}
    </div>
  );
}