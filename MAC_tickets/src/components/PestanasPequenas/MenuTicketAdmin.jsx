
import { useEffect, useState } from "react";

import Asig from './AsignarTecnico' // Falta añadir esta funcionalidad


const MenuTicketAdmin = () => {

        const [isModalAsigTec, setisModalAsigTec] = useState(false);
        const [Tecnicos, setTecnicos] = useState([]);
    
        const userid = localStorage.getItem("id"); // Obtenemos el id del usuario que está guardado en el localstorage
    
        const handleOpenModalAsigTec = (user) => {
            setisModalAsigTec(true);
        };
        
        const handleCloseModal = () => {
            setisModalAsigTec(false);
        };

    return(
        <div>
        <section className="UserMenuContent">
            <div className="MenuBotones">
                <button type='button' className='buttonOption' onClick={() => handleOpenModalAsigTec()}>
                    Asignar Técnico
                </button>
            </div>
            <div className="MenuBotones">
                <button type='button' className='buttonOption'>
                    Editar Ticket
                </button>

                {isModalAsigTec && (
                    <div className="menueliminar-display" onClick={handleCloseModal}>
                    <div className="menueliminar-content" onClick={e => e.stopPropagation()}>
                        <Asig
                        />
                    </div>
                </div>
                )}

            </div>            
        </section>
        </div>
    )}


export default MenuTicketAdmin