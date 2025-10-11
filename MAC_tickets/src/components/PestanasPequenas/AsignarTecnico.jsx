import React from 'react';

import '../../components_css/AsignarTecnico.css'

// Datos de ejemplo
const technicians = [
  { id: 1, name: "Juan Pérez", assignedTickets: 99 },
  { id: 2, name: "María Gómez", assignedTickets: 99 },
  { id: 3, name: "Carlos Ruiz", assignedTickets: 99 },
  { id: 4, name: "Laura Sánchez", assignedTickets: 99 },
  { id: 5, name: "Miguel Torres", assignedTickets: 99 },
  { id: 6, name: "Sofía Vargas", assignedTickets: 99 },
  { id: 7, name: "Diego Castro", assignedTickets: 99 },
  { id: 8, name: "Ana Herrera", assignedTickets: 99 },
];

function AssignmentScreen() {
  return (
    <div className="assign-container assign-view">
      
      {/* Sección Superior Estática */}
      <header className="assign-header assign-static-content">
        <h1 className="assign-title">Título Ticket</h1>
        <div className="assign-description-area">
          <h2 className="assign-description-heading">Description</h2>
          <p className="assign-description-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </header>

      {/* LISTA SCROLLABLE DE TÉCNICOS */}
      <div className="assign-list-scroll-area">
        <div className="assign-technician-list">
          {technicians.map((tech) => (
            <div key={tech.id} className="assign-list-item">
              <div className="assign-info-block">
                <p className="assign-tech-name">Nombre</p>
                <p className="assign-tech-stats">Tickets Asignados: {tech.assignedTickets}</p>
              </div>
              
              <div className="assign-action-block">
                <button className="assign-btn assign-action-button">Asignar</button>
                <div className="assign-menu-icon">⋮</div>
              </div>
            </div>
          ))}
        </div>
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

export default AssignmentScreen;