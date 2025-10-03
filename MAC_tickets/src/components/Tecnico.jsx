
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Ticket from '../components/Ticket.jsx'
import AsignedTicketList from '../components/AsignedTicketsList.jsx'

import '../components_css/Tecnico.css'

const Tecnico = ({ ticket, onClick }) => {

      const role = "Técnico";

    return(
        <div>
            <Header name={role} />
            <section className='TechnicalView'>
                <div className='AsignedTickets'>
                    <AsignedTicketList />
                </div>
                <div className='NewTickets'>
                </div>
                <div className='Notifications'>
                </div>
            </section>
            <Footer />
        </div>
    )
}


export default Tecnico

