import React from 'react';

import { useState, useEffect } from 'react';
import { useRef } from "react"

import '../../components_css/CreacionDeTicket.css'

// Opciones de Prioridad y Categoría
const priorities = ["ALTA", "MEDIA", "BAJA"];
const categories = ["REDES", "HARDWARE", "SOFTWARE", "OTRO"];

function TicketCreationForm({onExit}) {
  const [tecnicos, setTecnicos] = useState([])

  const creadorDeTicket = localStorage.getItem("id")


  useEffect(() => {
       
       // 2. Usar la cadena de promesas de fetch para manejar errores
       fetch(`http://Api-tickets-env.eba-3z343hb2.us-east-1.elasticbeanstalk.com/usuarios/tecnicos`, {
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
          })
          .catch(error => { // 4. Fallo: Registrar el error y marcar que hubo un error
            console.error("Fetch failed:", error);
          });
        }, []); // Añadir userid como dependencia por si cambia

        
        // Endpoint para crear el usuario
  const formulario = useRef(null)
  const CrearTicket = async (evt) => {
      evt.preventDefault();

      const from = new FormData(formulario.current);
      const dataToSend = Object.fromEntries(from.entries());
      
      if(dataToSend.title == '' || dataToSend.description == '' || dataToSend.tecnico_id == ''){
        return alert("Faltan información para completar el ticket")
      }

      try{
        
      await fetch('http://Api-tickets-env.eba-3z343hb2.us-east-1.elasticbeanstalk.com/tickets/insertar',{
        method: "POST",
        headers: {
          'Content-Type' : 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body : JSON.stringify({
          "title" : dataToSend.title,
          "description" : dataToSend.description,
          "category" : dataToSend.category,
          "priority" : dataToSend.priority,
          "created_by" : creadorDeTicket,
          "assigned_to" : dataToSend.tecnico_id,
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
    <div className="create-container">
      
      <header className="create-header">
        <h1 className="create-form-title">Creación de Nuevo Ticket</h1>
      </header>
      
      {/* 1. Título del Ticket */}
      <form ref={formulario}>
        <div className="create-input-group">
          <label htmlFor="title">Título</label>
          <div className="create-input-field">
            <span className="create-icon">📄</span>
            <input 
              name='title'
              type="text" 
              id="title" 
              placeholder="Título breve del ticket" 
            />
          </div>
        </div>

        {/* 2. Área de Descripción (Scrollable) */}
        <div className="create-input-group">
          <label htmlFor="description">Descripción</label>
          {/* El textarea es el elemento que permite el scroll natural */}
          <textarea 
            name = "description"
            id="description" 
            className="create-scrollable-textarea"
            placeholder="Escriba aquí los detalles completos y extensos del problema. Este campo es scrollable."
            rows="6"
            ></textarea>
        </div>

        {/* 3. Prioridad y Categoría (Selectables) */}
        <div className="create-metadata-row">
          {/* Prioridad */}
          <div className="create-select-group">
            <label htmlFor="priority">Prioridad</label>
            <select id="priority" name="priority" className="create-styled-select">
              {priorities.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          
          {/* Categoría */}
          <div className="create-select-group">
            <label htmlFor="category">Categoría</label>
            <select id="category" name="category" className="create-styled-select">
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 4. Asignar Técnico (Menú Desplegable) */}
        <div className="create-input-group create-technician-group">
          <label htmlFor="technician">Asignar Técnico</label>
          <select id="technician" name="tecnico_id" className="create-styled-select create-full-width">
            <option value="">-- Seleccione un Técnico --</option>
            {tecnicos.map((t) => (
              <option key={t.id} value={t.id}>{t.email}</option> 
            ))}
            </select>
        </div>
      </form>

      {/* Acciones del Formulario (Botones) */}
      <footer className="create-actions">
        <button className="create-btn create-cancel-btn" onClick={onExit}>Cancelar</button>
        <button className="create-btn create-accept-btn" onClick={CrearTicket}>Crear Ticket</button>
      </footer>
    </div>
  );
}

export default TicketCreationForm;