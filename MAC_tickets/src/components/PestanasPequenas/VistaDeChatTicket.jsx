import React from 'react';

import '../../components_css/VistaDeChatTicket.css'

const estados = ["Abierto", "En Proceso", "Cerrado"];

const TicketChatView = ({ticket, onExit}) => {
  
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
    
         <div className="tc-state">
           <label htmlFor="status">Estado - {ticket.status}</label>
           <select id="status" name="status" className="tc-select">
            {estados.map(p => (
             <option key={p} value={p}>{p}</option>
            ))}
           </select>
         </div>
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
         
         <div className="tc-msg-area" /* This MUST be scrollable */>
          <div className="tc-sig-div">
           <hr />
           <span className="tc-sig-text">Mesa De Trabajo</span>
           </div>
          
          {/* Example Chat/Log Entry (Scrollable Content) */}
          <p className="tc-entry">
           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          
          {/* Example Signature/Divider */}
          <div className="tc-sig-div">
           <hr />
           <span className="tc-sig-text">Técnico</span>
          </div>

                    {/* Another Log Entry */}
                    <p className="tc-entry right-aligned">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
            </div>
    
        {/* 4. Action/Input Bar (File Upload & Send) */}
        <div className="tc-input-bar tc-fixed">
            <div className="tc-input-block">
                <button className="tc-upload-btn">
                    {/* Upload Icon */}
                    <span className="tc-icon">⇧</span>
                </button>
                <input 
                    type="text" 
                    placeholder="Escribir mensaje..." 
                    className="tc-text-input" 
                />
                <button className="tc-send-btn">
                    {/* Send Icon (Arrow) */}
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
          <button className="tc-act-btn tc-accept-btn">Aceptar</button>
          <button className="tc-act-btn tc-cancel-btn" onClick={() => {
            onExit()
          }}>Cancelar</button>
        </footer>
    </div>
    );
}

export default TicketChatView;