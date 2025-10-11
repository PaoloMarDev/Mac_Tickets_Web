

import AllTicketList from './AllTicketList.jsx'
import AllUsersList from './AllUsersList.jsx'


import '../components_css/Tecnico.css'




const Administrador = () => {
        return(
                <section className='TechnicalView'>
                    <div className='vertical-line'></div>
                    <div className='ViewSection AssignedTickets'>
                        <div className="SectionHeader">
                            <h2>Tickets</h2>
                            <div className='filtros'>
                                <button>Categoria</button>
                                <button>Prioridad</button>
                                <button>Fecha</button>
                            </div>
                        </div>
                        <div className='ListContainer TicketContainer'>
                            <AllTicketList />
                        </div>
                    </div>
                    <div className='vertical-line'></div>
                    <div className='ViewSection NewTickets'>
                        <div className="SectionHeader">
                            <h2>Usuarios</h2>
                        </div>
                        <div className='ListContainer NewTicketsContainer'>
                            <AllUsersList />
                        </div>
                    </div>
                    <div className='vertical-line'></div>
                    <div className='ViewSection Notifications'>
                        <div className="SectionHeader">
                            <h2>Notificaciones</h2>
                        </div>
                        <div className='ListContainer NotificationContainer'>
                            {/* Aquí iría el componente de notificaiones */}
                        </div>
                    </div>
                    <div className='vertical-line'></div>
                </section>
        )
}

export default Administrador