
import '../../components_css/Usuario.css'

import dots from '../../assets/dots.png'

const Usuario = ({user, onClick}) => {
   
    return(
        <section className='user-card' onClick={() => onClick(user.id)}>
            <div className="limiter"></div>
            <div className="user-content">
                <div className="user-left">
                    <h2 className="username">{user.username}</h2>
                    <span className="role">Rol: {user.role}</span>
                    <span className="role">Email: {user.email}</span>
                </div>
                <div className="user-right">
                    <button> 
                        <img src={dots} alt="Boton de menú" />
                    </button>
                </div>
            </div>
            <div className="limiter"></div>

            
    </section>
    )
}


export default Usuario