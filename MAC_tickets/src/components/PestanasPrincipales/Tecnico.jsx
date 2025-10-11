
import { useEffect, useState } from 'react'
import AsignedTicketList from '../PestanasPequenas/AsignedTicketsList.jsx'
import NotAsignedTicketsList from '../PestanasPequenas/NotAsignedTicketsList.jsx'

import '../../components_css/Tecnico.css'

const Tecnico = () => {


    
    return(
            <section className='TechnicalView'>
                <div className='vertical-line'></div>
                <div className='ViewSection AssignedTickets'>
                    <div className="SectionHeader">
                        <h2>Tickets Aceptados</h2>
                        <div className='filtros'>
                            <button>Categoria</button>
                            <button>Prioridad</button>
                            <button>Fecha</button>
                        </div>
                    </div>
                    <p>Tickets Aceptados ###</p>
                    <div className='ListContainer TicketContainer'>
                        <AsignedTicketList />
                    </div>
                </div>
                <div className='vertical-line'></div>
                <div className='ViewSection NewTickets'>
                    <div className="SectionHeader">
                        <h2>Nuevos Tickets</h2>
                    </div>
                    <div className='ListContainer NewTicketsContainer'>
                        <NotAsignedTicketsList />
                        {/* Aquí iría el componente de lista de Nuevos Tickets */}
                    </div>
                </div>
                <div className='vertical-line'></div>
                <div className='ViewSection Notifications'>
                    <div className="SectionHeader">
                        <h2>Notificaciones</h2>
                    </div>
                    <div className='ListContainer NotificationContainer'>
                        {/* Aquí iría el componente de lista de Nuevos Tickets */}
                    </div>
                </div>
                <div className='vertical-line'></div>
            </section>
    )
}


export default Tecnico

