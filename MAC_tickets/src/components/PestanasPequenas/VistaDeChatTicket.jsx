import React from 'react';
import { useState, useEffect } from 'react';
import { useRef } from "react"


import '../../components_css/VistaDeChatTicket.css'

const estados = ["ABIERTO", "EN_PROCESO", "CERRADO"];

const TicketChatView = ({ticket, onExit}) => {
    
    const [loadingTickets, setLoadingTickets] = useState(false);
    const [errorTickets, setErrorTickets] = useState(false);
    const [mensajes, setMensajes] = useState([]);
    const [mensajeNuevo, setMensajeNuevo] = useState(0);

    const formulario = useRef(null)
    const formulario2 = useRef(null)

    useEffect(() => {
        fetch(`http://localhost:3000/mensajes/byTicket/${ticket.id}`,{
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
    }).then(res => {
        if (!res.ok) {
          // Si la respuesta HTTP no es 2xx, lanzar un error
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        // 3. Éxito: Establecer los tickets y marcar como cargado
        setLoadingTickets(true);
        setMensajes(data)
        console.log(data)
      })
      .catch(error => {
        // 4. Fallo: Registrar el error y marcar que hubo un error
        console.error("Fetch failed:", error);
        setHasError(true);
        setLoadingTickets(true); // La carga ha finalizado, aunque con error
      });
    }, [mensajeNuevo])
    

    const SubirComentario = async (evt) => {
      evt.preventDefault();
      

      const from = new FormData(formulario.current);
      const dataToSend = Object.fromEntries(from.entries());
      
      if(dataToSend.body == ''){
        return alert("Escribe un Mensaje")
      }

      try{
      await fetch('http://localhost:3000/mensajes/insertar',{
        method: "POST",
        headers: {
          'Content-Type' : 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body : JSON.stringify({
          "ticket_id" : ticket.id,
          "sender_user_id" : localStorage.getItem("id"),
          "body" : dataToSend.body
        })
      })

      console.log(dataToSend)

        setMensajeNuevo(mensajeNuevo + 1)
        } catch {
          alert("No se pudo agregar el nuevo usuario")
          console.error("No se pudo agregar el nuevo usuario", error)
        }
    }

    const ModificarEstado = async (evt) => {
      evt.preventDefault();

      const from = new FormData(formulario2.current);
      const dataToSend = Object.fromEntries(from.entries());

      if(!dataToSend.status){
        return alert("Algo falló con el estado")
      }

      try{
      await fetch('http://localhost:3000/tickets/asigEstado',{
        method: "PATCH",
        headers: {
          'Content-Type' : 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body : JSON.stringify({
          "id" : ticket.id,
          "status" : dataToSend.status
        })
      })
      console.log(dataToSend)
      onExit()
        } catch {
          alert("No se pudo modificar la prioridad")
          console.error("No se pudo modificar la prioridad", error)
        }
    }



  return (
    <div className="tc-wrap">
    
        {/* 1. Header & Metadata Section */}
        <header className="tc-header tc-fixed">
    
         <div className="tc-meta">
          <h1>{ticket.title}</h1>
    
          <div className="tc-details">
           <div className="tc-detail-item">
            <span className="tc-box"></span> Prioridad - {ticket.priority}
           </div>
           <div className="tc-detail-item">
            <span className="tc-box"></span> Categoría - {ticket.category}
           </div>
          </div>
         </div>

          <form ref={formulario2}>
          <div className="tc-state">
            <label htmlFor="status">Estado - {ticket.status}</label>
            <select id="status" name="status" className="tc-select">
              {estados.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          </form>

        </header>
        
        {/* 2. Description (Static) */}
        <div className="tc-desc-area tc-fixed">
         <h2 className="tc-desc-head">Description</h2>
         <p className="tc-desc-text">
          {ticket.description}
         </p>
        </div>
        
        {/* 3. SCROLLABLE CHAT/WORK LOG AREA */}
        <div className="tc-log-cont">
            <div className="tc-msg-area">
                {mensajes.map((ticket) => (
                    <div key={ticket.id} className="tc-msg-item">
                    <br />
                    <strong className="tc-msg-user">{ticket.sender_name}</strong>
                    <br />
                    <div className="tc-msg-text">{ticket.body}</div>
                    <br />
                    <br />
                    </div>
                ))}
            </div>
        </div>
    
        {/* 4. Action/Input Bar (File Upload & Send) */}
        <div className="tc-input-bar tc-fixed">
            <div className="tc-input-block">
                <button className="tc-upload-btn">
                    {/* Upload Icon */}
                    <span className="tc-icon">⇧</span>
                </button>
                <form ref={formulario}>
                <input 
                    name='body'
                    type="text" 
                    placeholder="Escribir mensaje..." 
                    className="tc-text-input" 
                    />
                  </form>
                <button className="tc-send-btn" onClick={SubirComentario}>
                    <span className="tc-icon">➤</span> 
                </button>
            </div>
            <div className="tc-label-foot">
                <span className="tc-tech-label">Técnico</span>
                <span className="tc-ev-label">Evidencia (PM)</span>
            </div>
        </div>
    
        {/* 5. Footer Buttons */}
        <footer className="tc-foot-acts tc-fixed">
          <button className="tc-act-btn tc-accept-btn" onClick={ModificarEstado}>Aceptar</button>
          <button className="tc-act-btn tc-cancel-btn" onClick={() => {
            onExit()
          }}>Cancelar</button>
        </footer>
    </div>
    );
}

export default TicketChatView;