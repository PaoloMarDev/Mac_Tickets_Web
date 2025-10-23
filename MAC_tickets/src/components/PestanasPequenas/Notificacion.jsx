
import '../../components_css/Usuario.css'

const Notificacion = ({notificacion}) => {
   

    if(notificacion.type == 'TICKET_CREATED'){
        return(
            <section className='user-card'>
            <div className="limiter"></div>
            <div className="user-content">
                <div className="user-left">
                    <h2 className="username">¡Nuevo Ticket Creado!</h2>
                    <span className="role">{notificacion.data.title}</span>
                </div>
                <div className="user-right">

                </div>
            </div>
            <div className="limiter"></div>
            </section>
        )
    }


    if(notificacion.type == 'NEW_MESSAGE'){
        return(
            <section className='user-card'>
            <div className="limiter"></div>
            <div className="user-content">
                <div className="user-left">
                    <h2 className="username">¡Nuevo Mensaje!</h2>
                    <span className="role">Mensaje: {notificacion.data.message}</span>
                </div>
                <div className="user-right">

                </div>
            </div>
            <div className="limiter"></div>

            
            </section>
        )
    }
}

export default Notificacion
