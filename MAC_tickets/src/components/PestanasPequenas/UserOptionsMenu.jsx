import { useEffect, useState } from "react";

import '../../components_css/UserOptionMenu.css'

import disable from '../../assets/delete.png'
import recover from '../../assets/recover.png'

import AvisoDeEliminacion from '../PestanasPequenas/AvisoDeEliminacion.jsx'
import RecuperaraContra from '../PestanasPequenas/RecuperarContra.jsx'


const UserOptionsMenu = ({user}) => {

    const [isModalElimintaionOpen, setisModalElimintaionOpen] = useState(false);
    const [isModalRecoverOpen, setisModalRecoverOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const userid = localStorage.getItem("id"); // Obtenemos el id del usuario que está guardado en el localstorage

    const handleOpenModalElimination = (user) => {
        setisModalElimintaionOpen(true);
    };

     const handleOpenModalRecover = (user) => {
        setSelectedUser(user)
        setisModalRecoverOpen(true);
    };
    
    const handleCloseModal = () => {
        setisModalRecoverOpen(false);
        setisModalElimintaionOpen(false);
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
                throw new Error(`Fallo la eliminación del usuario: ${response.status}`);
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
                <button type='button' className='buttonOption' onClick={() => {
                    handleOpenModalRecover(user)
                }}>
                    <img src={recover} alt='Icono para recuperar contraseña'></img>
                    Recupere Contraseña
                </button>
            </div>
            <div className="MenuBotones">
                <button type='button' className='buttonOption' onClick={() => 
                    handleOpenModalElimination()
                }>
                    <img src={disable} alt='Icono de Borrar'></img>
                    Eliminar
                </button>

                {isModalElimintaionOpen && (
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

                {isModalRecoverOpen && (
                    <div className="menueliminar-display" onClick={handleCloseModal}>
                    <div className="menueliminar-content" onClick={e => e.stopPropagation()}>
                        <RecuperaraContra
                            // Si el menú necesita datos de un usuario específico, pásalo aquí
                            user={selectedUser} 
                            onExit={handleCloseModal}
                        />
                    </div>
                </div>
                )}

            </div>            
        </section>
    )
}

export default UserOptionsMenu