import React from 'react';

import { useState, useEffect } from 'react';

import '../../components_css/AsignarTecnico.css'

const VistaDeAsignar = ({ticket, onExit}) =>  {
  const [tecnicos, setTecnicos] = useState([])
  const [loadedTecnicos, setloadedTecnicos] = useState(false); // Estado para indicar si la carga ha finalizado (éxito o fallo)
  const [hasError, setHasError] = useState(false); // Estado para manejar si hubo un error en la carga
  

  const [refrescarLista, setRefrescarLista] = useState(false);

  const AsignarTecnico = async (tenico_id) => {
    const tecnico = tenico_id;
    const ticket_id = ticket.id;

    console.log(tecnico)
    console.log(ticket_id)

        try{

        await fetch('http://localhost:3000/usuarios/asignar',{
          method: "PATCH",
          headers: {
            'Content-Type' : 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body : JSON.stringify({
            "user_id" : tecnico,
            "ticket_id" : ticket_id
          })
        })

        setRefrescarLista(prev => !prev);
      } catch {
        alert("No se pudo asignar el nuevo tecnico")
        console.error("No se pudo asignar el nuevo tecnico", error)
      }


  }

  
  useEffect(() => {
     // 1. Resetear estados al iniciar la carga
     setloadedTecnicos(false);
     setHasError(false);
     
     // 2. Usar la cadena de promesas de fetch para manejar errores
     fetch(`http://localhost:3000/usuarios/tecnicos`, {
       method: 'GET',
         headers: {
           authorization: `Bearer ${localStorage.getItem('token')}`
          },
        })
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`); // Si la respuesta HTTP no es 2xx, lanzar un error
          }
          return res.json();})
       .then(data => { // 3. Éxito: Establecer los tickets y marcar como cargado
         setTecnicos(data);
         setloadedTecnicos(true);
        })
        .catch(error => { // 4. Fallo: Registrar el error y marcar que hubo un error
          console.error("Fetch failed:", error);
          setHasError(true);
          setloadedTecnicos(true); // La carga ha finalizado, aunque con error
        });
      }, [refrescarLista]); // Añadir userid como dependencia por si cambia
      
   // 1. Mostrar mensaje de error si hasError es true
  if (hasError) {
    return (
      <div className="assign-container assign-view">
      
      {/* Sección Superior Estática */}
      <header className="assign-header assign-static-content">
        <h1 className="assign-title">Título Ticket</h1>
        <div className="assign-description-area">
          <h2 className="assign-description-heading">Description</h2>
          <p className="assign-description-text">
            {ticket.description}
          </p>
        </div>
      </header>

        <div className="error-message">
          <p>No se pudieron cargar los Técnicos. Por favor, inténtalo de nuevo más tarde.</p>
        </div>
      
      {/* Footer de Acciones Estático */}
      <footer className="assign-footer assign-static-content">
        <button className="assign-main-btn assign-exit-btn">Salir</button>
        <div className="assign-right-buttons">
          <button className="assign-main-btn assign-reject-btn">Rechazar</button>
          <button className="assign-main-btn assign-accept-btn">Aceptar</button>
        </div>
      </footer>
    </div>
    );
  }

  // 2. Mostrar "Sin tickets" si ya cargó y la lista está vacía
  if (loadedTecnicos && tecnicos.length === 0) {
    return (
          <div className="assign-container assign-view">
      
      {/* Sección Superior Estática */}
      <header className="assign-header assign-static-content">
        <h1 className="assign-title">{ticket.title}</h1>
        <div className="assign-description-area">
          <h2 className="assign-description-heading">Description</h2>
          <p className="assign-description-text">
            {ticket.description}
          </p>
        </div>
      </header>

      {/* LISTA SCROLLABLE DE TÉCNICOS */}
      <div className="assign-list-scroll-area">
        No hay ténicos
      </div>
      
      {/* Footer de Acciones Estático */}
      <footer className="assign-footer assign-static-content">
        <button className="assign-main-btn assign-exit-btn">Salir</button>
        <div className="assign-right-buttons">
          <button className="assign-main-btn assign-reject-btn">Rechazar</button>
          <button className="assign-main-btn assign-accept-btn">Aceptar</button>
        </div>
      </footer>
    </div>
    );
  }


  // 3. (Opcional) Mostrar un mensaje de carga mientras se obtienen los datos
  if (!loadedTecnicos) {
        return (
          <div className="assign-container assign-view">
      
      {/* Sección Superior Estática */}
      <header className="assign-header assign-static-content">
        <h1 className="assign-title">{ticket.title}</h1>
        <div className="assign-description-area">
          <h2 className="assign-description-heading">Description</h2>
          <p className="assign-description-text">
            {ticket.description}
          </p>
        </div>
      </header>

      {/* LISTA SCROLLABLE DE TÉCNICOS */}
        <div className="loading-state">
            <p>Cargando Técnicos...</p>
        </div>
      
      {/* Footer de Acciones Estático */}
      <footer className="assign-footer assign-static-content">
        <button className="assign-main-btn assign-exit-btn">Salir</button>
        <div className="assign-right-buttons">
          <button className="assign-main-btn assign-reject-btn">Rechazar</button>
          <button className="assign-main-btn assign-accept-btn">Aceptar</button>
        </div>
      </footer>
    </div>
    );
  }


  return (
    <div className="assign-container assign-view">
      
      {/* Sección Superior Estática */}
      <header className="assign-header assign-static-content">
        <h1 className="assign-title">{ticket.title}</h1>
        <div className="assign-description-area">
          <h2 className="assign-description-heading">Description</h2>
          <p className="assign-description-text">
            {ticket.description}
          </p>
        </div>
      </header>

      {/* LISTA SCROLLABLE DE TÉCNICOS */}
      <div className="assign-list-scroll-area">
        <div className="assign-technician-list">
          {tecnicos.map((tech) => (
            <div key={tech.id} className="assign-list-item">
              <div className="assign-info-block">
                <p className="assign-tech-name">{tech.email}</p>
                { /*<p className="assign-tech-stats">Tickets Asignados: {tech.assignedTickets}</p> */}
              </div>
              
              <div className="assign-action-block">
                {ticket.assigned_to == tech.id ? <p>Asignado</p> : <button className="assign-btn assign-action-button" onClick={() => {AsignarTecnico(tech.id)}}>Asignar</button> }
                <div className="assign-menu-icon">⋮</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer de Acciones Estático */}
      <footer className="assign-footer assign-static-content">
        <button className="assign-main-btn assign-exit-btn" onClick={onExit}>Salir</button>
        <div className="assign-right-buttons">
        </div>
      </footer>
    </div>
  );
}

export default VistaDeAsignar;