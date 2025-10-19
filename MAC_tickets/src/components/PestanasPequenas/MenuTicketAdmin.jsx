
import { useEffect, useState } from "react";

import Asig from './AsignarTecnico' // Falta añadir esta funcionalidad
import EnterTicketScreen from './EnterTicketScreen.jsx'
import ModificarPrioYCateScreen from './ModificarPrioYCateScreen.jsx'


const MenuTicketAdmin = ({ticket, onExit}) => {

        const [isModalAsigTec, setisModalAsigTec] = useState(false);
        const [selectedTicket, setSelectedTicket] = useState(null); 


        const cuentaActual = localStorage.getItem("role"); // Obtenemos el id del usuario que está guardado en el localstorage
    
        const handleOpenModalAsigTec = (user) => {
            setisModalAsigTec(true);
        };
        
        const handleOpenModalEntTick = (ticket) => {
            setSelectedTicket(ticket);
        };
        
        const handleCloseModal = () => {
            setisModalAsigTec(false);
            setSelectedTicket(null);
        };



    if(cuentaActual == "ADMIN"){
        return(
            <div>
            <section className="UserMenuContent">
                <div className="MenuBotones">
                    <button type='button' className='buttonOption' onClick={() => handleOpenModalAsigTec()}>
                        Asignar Técnico
                    </button>
                    <button type='button' className='buttonOption' onClick={() => alert("Eso aún no tiene funcionalidad")}>
                        Ingresar al ticket
                    </button>
                    <button type='button' className='buttonOption' onClick={() => handleOpenModalEntTick(ticket)}>
                        Editar Ticket
                    </button>
                </div>

                {isModalAsigTec && (
                    <div className="menueliminar-display" onClick={handleCloseModal}>
                    <div className="menueliminar-content" onClick={e => e.stopPropagation()}>
                        <Asig
                            ticket = {ticket}
                            onExit = {onExit}
                        />
                    </div>
                </div>
                )}

                {selectedTicket && (
                    <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <ModificarPrioYCateScreen 
                        ticket={selectedTicket} 
                        onExit={handleCloseModal}
                        />
                    </div>
                    </div>
                )}

            </section>
            </div>
        )}

    if(cuentaActual == "MESA"){
        return(
            <div>
            <section className="UserMenuContent">
                <div className="MenuBotones">
                    <button type='button' className='buttonOption' onClick={() => handleOpenModalEntTick(ticket)}>
                        Editar Ticket
                    </button>
    
                    {selectedTicket && (
                        <div className="modal-overlay" onClick={handleCloseModal}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <EnterTicketScreen 
                            ticket={selectedTicket} 
                            onExit={handleCloseModal}
                            />
                        </div>
                        </div>
                    )}
    
                </div>            
            </section>
            </div>
        )}
    
}

export default MenuTicketAdmin