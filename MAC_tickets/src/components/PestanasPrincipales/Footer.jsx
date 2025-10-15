import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import logoutLogo from '../../assets/logout.png'
import editIcon from '../../assets/pencil.png'
import addIcon from '../../assets/plus.png'
import Beluga from '../../assets/BelugaMeme.png'

import '../../components_css/Footer.css'

import CrearUsuario from '../PestanasPequenas/CrearUsuario.jsx'
import CreacionDeTicket from '../PestanasPequenas/CreacionDeTicket.jsx'

const Footer = () => {
    const [redirect, setRedirect] = useState(false)
    const [accountRole, setAccountRole] = useState("")

    const [abrirCrearUsuario, setAbrirCrearUsuario] = useState(false); 
    const [abrirCrearticket, setAbrirCrearTicket] = useState(false); 


    // Funcionamiento de Login
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('role')
        setRedirect(true)
    }

    // Editar el último Ticket abierto
    // Crear un nuevo Ticket
    // Crear un nuevo usuario


    // ponerle el role a la variable accountRole
    useEffect(() => {
        setAccountRole(localStorage.getItem("role"))  
    }, [])

    if (redirect) {
        return <Navigate to='/' />
    }

    // Placeholder para los botones sin usar
    const sinFuncionamiento = () => {
       {(
         <div className="menu-display" onClick={handleCloseModal}>
           <div className="menu-content" onClick={e => e.stopPropagation()}>
             <CrearUsuario
             />
           </div>
         </div>
       )}
    }

    
    const handleClickCreateUser = () => {
     setAbrirCrearUsuario(true); 
   };
    
   const handleClickCreateTicket = () => {
     setAbrirCrearTicket(true); 
    };
    
    // Función para cerrar el modal
    const handleCloseModal = () => {
        setAbrirCrearUsuario(false);
        setAbrirCrearTicket(false); 
   };



    // Distintos Menús dependiendo del role de la cuenta.
 
    if(accountRole == "TECNICO"){
        return(
            <section className='Footer'>
            <div className='footerbox'>
                <button type="button" onClick={logout}>
                    <img src={logoutLogo} alt="Logout Logo" />
                </button>
                <button type='button' onClick={sinFuncionamiento}>
                    <img src={editIcon} alt="Edit Button" />
                </button>
            </div>
        </section>    
        )
    }

    if(accountRole == "MESA"){
        return(
            <section className='Footer'>
            <div className='footerbox'>
                <button type="button" onClick={logout}>
                    <img src={logoutLogo} alt="Logout Logo" />
                </button>
                <button type='button' onClick={handleClickCreateTicket}>
                    <img src={addIcon} alt="Add ticket Icon" />
                </button>
            </div>

            {abrirCrearticket && (
            <div className="createUser-display" onClick={handleCloseModal}>
                <div className="createUser-content" onClick={e => e.stopPropagation()}>
                    <CreacionDeTicket
                    onExit = {handleCloseModal}
                    />
                </div>
            </div>
            )}
        </section>    
        )
    }

    if(accountRole == "ADMIN"){
        return(
            <section className='Footer'>
            <div className='footerbox'>
                <button type="button" onClick={logout}>
                    <img src={logoutLogo} alt="Logout Logo" />
                </button>
                <button type='button' onClick={handleClickCreateUser}>
                    <img src={addIcon} alt="Add user Icon" />
                </button>
            </div>
            
            
            {abrirCrearUsuario && (
            <div className="createUser-display" onClick={handleCloseModal}>
                <div className="createUser-content" onClick={e => e.stopPropagation()}>
                    <CrearUsuario
                    onExit = {handleCloseModal}
                    />
                </div>
            </div>
            )}
        </section>    
        )
    }


    return (
        <section className='Footer'>
            <div className='footerbox'>
                <button type="button" onClick={logout}>
                    <img src={logoutLogo} alt="Logout Logo" />
                </button >
                <p>Algo salió mal, esta cuenta no tiene rol</p>
            </div>

            

        </section>
    )
}

export default Footer