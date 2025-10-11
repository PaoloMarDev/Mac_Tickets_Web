import { useEffect, useState } from "react";

import '../components_css/UserOptionMenu.css'

import disable from '../assets/delete.png'
import recover from '../assets/recover.png'

import AvisoDeEliminacion from './AvisoDeEliminacion.jsx'


const UserOptionsMenu = ({user}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const userid = localStorage.getItem("id"); // Obtenemos el id del usuario que está guardado en el localstorage

    const handleOpenModal = (user) => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const disableUser = async () => {
        if(user.id == userid || user.role == 'ADMIN'){
            return alert("No puedes eliminar tu propia cuenta o la de un Administrador")
        }
        
        try{
        
        const bodyData = { email: user.email };
        
        const response = await fetch(`http://localhost:3000/usuarios/desabilitar`,{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                authorization : `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(bodyData)
        });

        if (!response.ok) {
                // Si la petición falla (ej: error 404/500), lanzamos un error
                throw new Error(`Fallo la aceptación del ticket: ${response.status}`);
            }


        } catch(error){
            console.error("Error al desactivar el usuario:", error)
            alert("Error al desactivar el usuario:")
        }

        handleCloseModal();
    }

    return(
        <section className="UserMenuContent">
            <div className="MenuBotones">
                <button type='button' className='buttonOption'>
                    <img src={recover} alt='Icono para recuperar contraseña'></img>
                    Recupere Contraseña
                </button>
            </div>
            <div className="MenuBotones">
                <button type='button' className='buttonOption' onClick={() => 
                    handleOpenModal()
                }>
                    <img src={disable} alt='Icono de Borrar'></img>
                    Eliminar
                </button>

                {isModalOpen && (
                    <div className="menueliminar-display" onClick={handleCloseModal}>
                    <div className="menueliminar-content" onClick={e => e.stopPropagation()}>
                        <AvisoDeEliminacion
                            // Si el menú necesita datos de un usuario específico, pásalo aquí
                            user={selectedUser} 
                            onExit={handleCloseModal}
                            disable={disableUser}
                        />
                    </div>
                </div>
                )}

            </div>            
        </section>
    )
}

export default UserOptionsMenu