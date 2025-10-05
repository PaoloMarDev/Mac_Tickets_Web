
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Ticket from '../components/Ticket.jsx'
import AsignedTicketList from '../components/AsignedTicketsList.jsx'
import NotAsignedTicketsList from '../components/NotAsignedTicketsList.jsx'

import '../components_css/Tecnico.css'

const Tecnico = ({ ticket, onClick }) => {

    return(
        <div>
            <section className='TechnicalView'>
                {/* SECCIÓN 1: TICKETS ACEPTADOS - IMPLEMENTADA */}
                <div className='ViewSection AssignedTickets'>
                    <div className="SectionHeader">
                        <h2>Tickets Aceptados</h2>
                        {/* Simulación de Filtros */}
                    </div>
                    <div className='ListContainer TicketContainer'>
                        <AsignedTicketList />
                    </div>
                </div>
                <div className='ViewSection NewTickets'>
                    <div className="SectionHeader">
                        <h2>Nuevos Tickets</h2>
                    </div>
                    <div className='ListContainer NewTicketsContainer'>
                        <NotAsignedTicketsList />
                        {/* Aquí iría el componente de lista de Nuevos Tickets */}
                    </div>
                </div>
                <div className='ViewSection Notifications'>
                    <div className="SectionHeader">
                        <h2>Notificaciones</h2>
                    </div>
                    <div className='ListContainer NotificationContainer'>
                        {/* Aquí iría el componente de lista de Nuevos Tickets */}
                    </div>
                </div>
            </section>
            
        </div>
    )
}


export default Tecnico

