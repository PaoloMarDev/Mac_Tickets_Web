import { useEffect, useState } from "react";

import Usuario from '../PestanasPequenas/Usuario.jsx'
import UserOptionsMenu from '../PestanasPequenas/UserOptionsMenu.jsx'


const AllDisableUsersList = ({setUserListToUse, getUserListToUse}) => {
  const [usuarios, setUsuarios] = useState([]); // Estado que guarda todos los tickets obtenidos de la API
  const [loadedUsers, setLoadedUser] = useState(false); // Estado para indicar si la carga ha finalizado (éxito o fallo)
  const [hasError, setHasError] = useState(false); // Estado para manejar si hubo un error en la carga
  const [selectedUser, setSelectedUser] = useState(null); 

  const userid = localStorage.getItem("id"); // Obtenemos el id del usuario que está guardado en el localstorage

  useEffect(() => {
    // 1. Resetear estados al iniciar la carga
    setLoadedUser(false);
    setHasError(false);

    // 2. Usar la cadena de promesas de fetch para manejar errores
    fetch(`http://Api-tickets-env.eba-3z343hb2.us-east-1.elasticbeanstalk.com/usuarios/usuarioDesactivados`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        },
    })
      .then(res => {
        if (!res.ok) {
          // Si la respuesta HTTP no es 2xx, lanzar un error
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        // 3. Éxito: Establecer los tickets y marcar como cargado
        setLoadedUser(true);
        setUserListToUse(data)
        setUsuarios(getUserListToUse());
      })
      .catch(error => {
        // 4. Fallo: Registrar el error y marcar que hubo un error
        console.error("Fetch failed:", error);
        setHasError(true);
        setLoadedUser(true); // La carga ha finalizado, aunque con error
      });
  }, [userid]); // Añadir userid como dependencia por si cambia

  // **Añadir un segundo useEffect para actualizar tickets cuando la lista filtrada cambie**
    // Esto se activa cada vez que el padre (Administrador) llama a setFilteredList a través de setListToUse.
    useEffect(() => {
      setUsuarios(getUserListToUse());
    }, [getUserListToUse]);

    const handleClick = (userData) => {
     // ticketData ahora recibe el objeto del ticket
     setSelectedUser(userData); 
     console.log(userData)
   };

   // Función para cerrar el modal
   const handleCloseModal = () => {
     setSelectedUser(null);
   };

  // --- Renderizado Condicional ---

  

  // 1. Mostrar mensaje de error si hasError es true
  if (hasError) {
    return (
      <div className="error-message">
        <p>No se pudieron cargar los usuarios. Por favor, inténtalo de nuevo más tarde.</p>
      </div>
    );
  }



  // 2. Mostrar "Sin tickets" si ya cargó y la lista está vacía
  if (loadedUsers && usuarios.length === 0) {
    return (
      <div className="empty-state">
        <p>Sin usuarios</p>
      </div>
    );
  }



  // 3. (Opcional) Mostrar un mensaje de carga mientras se obtienen los datos
  if (!loadedUsers) {
      return (
          <div className="loading-state">
              <p>Cargando usuarios...</p>
          </div>
      );
  }



// Mostrar la lista y el modal (si está abierto)
  return (
     <div className="ticket-list-container">
        {usuarios.map(usuario => (
         <Usuario 
           key={usuario.id} 
           user={usuario} 
           // Esto asegura que el objeto 'ticket' se pase a handleClick
           onClick={() => handleClick(usuario)} 
         />
       ))}

      {/* 2. Menú para recuperar o desabilitar usuario */}
       {selectedUser && (
         <div className="menu-display" onClick={handleCloseModal}>
           <div className="menu-content" onClick={e => e.stopPropagation()}>
             <UserOptionsMenu
               user={selectedUser} 
             />
           </div>
         </div>
       )}

     </div>
  );
}

export default AllDisableUsersList