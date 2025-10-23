import React from 'react';
import { useState, useEffect } from 'react';
import { useRef } from "react"


import '../../components_css/VistaDeChatTicket.css'

const estados = ["---","ABIERTO", "EN_PROCESO", "CERRADO"];

const TicketChatView = ({ticket, onExit}) => {
    
    const [loadingTickets, setLoadingTickets] = useState(false);
    const [errorTickets, setErrorTickets] = useState(false);
    const [mensajes, setMensajes] = useState([]);
    const [mensajeNuevo, setMensajeNuevo] = useState(0);

    const formulario = useRef(null)
    const formulario2 = useRef(null)

    const estado_ticket = ticket.status;


    useEffect(() => {
          setLoadingTickets(false);
          setErrorTickets(false);

        fetch(`http://localhost:3000/ticketMessages/byTicket/${ticket.id}`,{
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
        setErrorTickets(true);
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
      await fetch('http://localhost:3000/ticketMessages/insertar',{
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
      if(dataToSend.status == '---'){
        return onExit();
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
      onExit();

        } catch(error) {
          alert("No se pudo modificar la prioridad")
          console.error("No se pudo modificar la prioridad", error)
        }
    }

    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
      fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("ticket_id", ticket.id);
  formData.append("sender_user_id", localStorage.getItem("id"));

  try {
    await fetch("http://localhost:3000/archivos/upload", {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });

    setMensajeNuevo(mensajeNuevo + 1)
    alert("Archivo subido!");
  } catch (err) {
    console.error("Error subiendo archivo", err);
  }
};



    // ----- Renderizado del componente opciones ------ //

      // 1. Mostrar mensaje de error si hasError es true
  if (errorTickets) {
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
              <p>Hubo un error al obtener los mensajes</p>
            </div>
        </div>
    
        {/* 4. Action/Input Bar (File Upload & Send) */}
        <div className="tc-input-bar tc-fixed">
          {estado_ticket != 'CERRADO' && (
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
          )}
            <div className="tc-label-foot">
            </div>
        </div>
    
        {/* 5. Footer Buttons */}
        <footer className="tc-foot-acts tc-fixed">
          <button className="tc-act-btn tc-accept-btn" onClick={ModificarEstado}>Modificar Estado</button>
          <button className="tc-act-btn tc-cancel-btn" onClick={() => {
            onExit()
          }}>Salir</button>
        </footer>
    </div>
    );
  }

    // 2. (Opcional) Mostrar un mensaje de carga mientras se obtienen los datos
  if (!loadingTickets) {
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
              <p>Cargando Mensajes...</p>
            </div>
        </div>
    
        {/* 4. Action/Input Bar (File Upload & Send) */}
        <div className="tc-input-bar tc-fixed">
            {estado_ticket != 'CERRADO' && (
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
          )}
        </div>
    
        {/* 5. Footer Buttons */}
        <footer className="tc-foot-acts tc-fixed">
          <button className="tc-act-btn tc-accept-btn" onClick={ModificarEstado}>Modificar Estado</button>
          <button className="tc-act-btn tc-cancel-btn" onClick={() => {
            onExit()
          }}>Salir</button>
        </footer>
    </div>
    );
  }

  // 2. Mostrar un mensaje de carga mientras se obtienen los datos
  if (loadingTickets && mensajes.length === 0) {
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
         <h2 className="tc-desc-head">Description</h2>
        <div className="tc-desc-area tc-fixed">
         <p className="tc-desc-text">
          {ticket.description}
         </p>
        </div>
        
        {/* 3. SCROLLABLE CHAT/WORK LOG AREA */}
        <div className="tc-log-cont">
            <div className="tc-msg-area">
              <p>No hay mensajes en este ticket</p>
            </div>
        </div>
    
        {/* 4. Action/Input Bar (File Upload & Send) */}
        <div className="tc-input-bar">
            {estado_ticket != 'CERRADO' && (
            <div className="tc-input-block">
                <button className="tc-upload-btn">
                    {/* Upload Icon */}
                    <span className="tc-icon">⇧</span>
                </button>

                  <form ref={formulario} onSubmit={SubirComentario}>
                <input 
                    name='body'
                    type="text" 
                    placeholder="Escribir mensaje..." 
                    className="tc-text-input" 
                    />
                  </form>
                <button type='button' className="tc-send-btn" onClick={SubirComentario}>
                    <span className="tc-icon">➤</span> 
                </button>
            </div>
          )}
        </div>
    
        {/* 5. Footer Buttons */}
        <footer className="tc-foot-acts tc-fixed">
          <button className="tc-act-btn tc-accept-btn" onClick={ModificarEstado}>Modificar Estado</button>
          <button className="tc-act-btn tc-cancel-btn" onClick={() => {
            onExit()
          }}>Salir</button>
        </footer>
    </div>
    );
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
         <h2 className="tc-desc-head">Description</h2>
        <div className="tc-desc-area tc-fixed">
         <p className="tc-desc-text">
          {ticket.description}
         </p>
        </div>
        
        {/* 3. SCROLLABLE CHAT/WORK LOG AREA */}
        <div className="tc-log-cont">
            <div className="tc-msg-area">
                {mensajes.map((mensaje) => (
                  <div key={mensaje.id} className="tc-msg-item">
                    <br />
                    <strong className="tc-msg-user">{mensaje.sender_name}</strong>
                    <br />
                    <div className="tc-msg-text">
                      {mensaje.body}

                      {mensaje.file_id && (
                        <a
                          href={`http://localhost:3000/archivos/download/${mensaje.file_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: "block", marginTop: "5px", textDecoration: "underline", cursor: "pointer" }}
                        >
                          - Descargar archivo
                        </a>
                      )}
                    </div>
                    <br />
                    <br />
                  </div>
                ))}
            </div>
        </div>
    
        {/* 4. Action/Input Bar (File Upload & Send) */}
        <div className="tc-input-bar tc-fixed">
            {estado_ticket != 'CERRADO' && (
            <div className="tc-input-block">
                {/* ✅ BOTÓN QUE ABRE EL SELECTOR DE ARCHIVO */}
                  <button 
                    className="tc-upload-btn"
                    onClick={handleUploadClick}
                    type="button"
                  >
                    <span className="tc-icon">⇧</span>
                  </button>

                  {/* ✅ INPUT FILE OCULTO */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                  />

                  <form ref={formulario} onSubmit={SubirComentario}>
                <input 
                    name='body'
                    type="text" 
                    placeholder="Escribir mensaje..." 
                    className="tc-text-input" 
                    />
                  </form>
                <button type="submit" className="tc-send-btn" onClick={SubirComentario}>
                    <span className="tc-icon">➤</span> 
                </button>
            </div>
          )}
        </div>
    
        {/* 5. Footer Buttons */}
        <footer className="tc-foot-acts tc-fixed">
          <button className="tc-act-btn tc-accept-btn" onClick={ModificarEstado}>Modificar Estado</button>
          <button className="tc-act-btn tc-cancel-btn" onClick={() => {
            onExit()
          }}>Salir</button>
        </footer>
    </div>
    );
}

export default TicketChatView;