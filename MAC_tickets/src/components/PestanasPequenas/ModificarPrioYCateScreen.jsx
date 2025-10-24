
import { useState, useEffect } from 'react';
import { useRef } from "react"

import '../../components_css/EnterTicketScreen.css'


const priorities = ["ALTA", "MEDIA", "BAJA"];
const categories = ["REDES", "HARDWARE", "SOFTWARE", "OTRO"];

function ModificarPrioYCateScreen({ ticket, onExit }) { // Renamed for clarity (Read-Only View)


  const formulario = useRef(null)
  const CambiarPrioYCat = async (evt) => {
    evt.preventDefault();

    const from = new FormData(formulario.current);
    const dataToSend = Object.fromEntries(from.entries());
    
    try{
      await fetch('http://Api-tickets-env.eba-3z343hb2.us-east-1.elasticbeanstalk.com/tickets/asigCategoria',{
        method: "PATCH",
        headers: {
          'Content-Type' : 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body : JSON.stringify({
          "id" : ticket.id,
          "category" : dataToSend.category,
        })
      })

      await fetch('http://Api-tickets-env.eba-3z343hb2.us-east-1.elasticbeanstalk.com/tickets/asigPrioridad',{
        method: "PATCH",
        headers: {
          'Content-Type' : 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body : JSON.stringify({
          "id" : ticket.id,
          "priority" : dataToSend.priority,
        })
      })

      console.log(dataToSend)

        onExit()

        } catch {
          alert("No se pudo agregar el nuevo usuario")
          console.error("No se pudo agregar el nuevo usuario", error)
        }
  }
  
  return (
<div className="ticket-container">
      <header className="ticket-header">
        <h1>{ticket.title}</h1>
        <p className="technician-name">Nombre Técnico</p>
      </header>
      
      <form ref={formulario}>
        <div className="metadata-row">
              <label htmlFor="category">Categoría</label>
              <select id="category" name="category" className="create-styled-select">
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

          {/* 3. Prioridad y Categoría (Selectables) */}
              <label htmlFor="priority">Prioridad</label>
              <select id="priority" name="priority" className="create-styled-select">
              {priorities.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
              </select>
        </div>
      </form>
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
        <button className="btn edit-btn" type='button' 
          onClick={CambiarPrioYCat}>Guardar</button>
      </footer>
    </div>
  );
}
export default ModificarPrioYCateScreen;
