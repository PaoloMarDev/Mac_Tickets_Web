
import '../components_css/Usuario.css'

const Usuario = ({user, onClick}) => {
    return(
        <section className='user-card'>
            <div className="limiter"></div>
            <div className="user-content">
                <div className="user-left">
                    <h2 className="username">{user.email}</h2>
                    <span className="role">Rol: {user.role}</span>
                </div>
                <div className="user-right">
                    <button>Eliminar/Recuperar</button>
                </div>
            </div>
            <div className="limiter"></div>
    </section>
    )
}


export default Usuario