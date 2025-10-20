
import { useEffect, useState } from "react";

import Asig from './AsignarTecnico' // Falta añadir esta funcionalidad
import ModificarPrioYCateScreen from './ModificarPrioYCateScreen.jsx'
import VistaDeChatTicket from './VistaDeChatTicket.jsx'

const MenuTicketAdmin = ({ticket, onExit}) => {

        const [isModalAsigTec, setisModalAsigTec] = useState(false);
        const [isModalEditTicket, setIsModalEditTicket] = useState(false);
        const [isModalEnterTicket, setIsModalEnterTicket] = useState(false);

        const handleOpenModalAsigTec = () => {
            setisModalAsigTec(true);
        };

        const handleOpenModalEnterTick = () => {
            setIsModalEnterTicket(true)
        };
        
        const handleOpenModalEditTick = () => {
            setIsModalEditTicket(true)
        };
        
        const handleCloseModal = () => {
            setisModalAsigTec(false);
            setIsModalEditTicket(false)
            setIsModalEnterTicket(false)
        };



        return(
            <div>
            <section className="UserMenuContent">
                <div className="MenuBotones">
                    <button type='button' className='buttonOption' onClick={() => handleOpenModalAsigTec()}>
                        Asignar Técnico
                    </button>
                    <button type='button' className='buttonOption' onClick={() => handleOpenModalEnterTick()}>
                        Ingresar al ticket
                    </button>
                    <button type='button' className='buttonOption' onClick={() => handleOpenModalEditTick()}>
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

                {isModalEditTicket && (
                    <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <ModificarPrioYCateScreen 
                        ticket={ticket} 
                        onExit={handleCloseModal}
                        />
                    </div>
                    </div>
                )}
                
                {isModalEnterTicket && (
                    <div className="vista-modal-overlay" onClick={handleCloseModal}>
                    <div className="vista-modal-content" onClick={e => e.stopPropagation()}>
                        <VistaDeChatTicket 
                        ticket={ticket} 
                        onExit={handleCloseModal}
                        />
                    </div>
                    </div>
                )}

            </section>
            </div>
        )}

export default MenuTicketAdmin