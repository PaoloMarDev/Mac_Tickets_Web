import { useEffect, useState } from "react";

import Notificacion from '../PestanasPequenas/Notificacion.jsx'


const AllNotifications = () => {
  const [notificaciones, setNotificaciones] = useState([]); // Estado que guarda todos los tickets obtenidos de la API
  const [loadedNotifications, setLoadedNotifications] = useState(false); // Estado para indicar si la carga ha finalizado (éxito o fallo)
  const [hasError, setHasError] = useState(false); // Estado para manejar si hubo un error en la carga

  const userid = localStorage.getItem("id"); // Obtenemos el id del usuario que está guardado en el localstorage

  useEffect(() => {
    // 1. Resetear estados al iniciar la carga
    setLoadedNotifications(false);
    setHasError(false);

    // 2. Usar la cadena de promesas de fetch para manejar errores
    fetch(`http://Api-tickets-env.eba-3z343hb2.us-east-1.elasticbeanstalk.com/notificaciones/${userid}`, {
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
        console.log(data)
        // 3. Éxito: Establecer los tickets y marcar como cargado
        setLoadedNotifications(true);
        setNotificaciones(data)
      })
      .catch(error => {
        // 4. Fallo: Registrar el error y marcar que hubo un error
        console.error("Fetch failed:", error);
        setHasError(true);
        setLoadedNotifications(true); // La carga ha finalizado, aunque con error
      });
  }, [userid]); // Añadir userid como dependencia por si cambia


  // --- Renderizado Condicional ---
  

  // 1. Mostrar mensaje de error si hasError es true
  if (hasError) {
    return (
      <div className="error-message">
        <p>No se pudieron cargar las notificaciones. Por favor, inténtalo de nuevo más tarde.</p>
      </div>
    );
  }



  // 2. Mostrar "Sin tickets" si ya cargó y la lista está vacía
  if (loadedNotifications && notificaciones.length === 0) {
    return (
      <div className="empty-state">
        <p>Sin notificaciones</p>
      </div>
    );
  }



  // 3. (Opcional) Mostrar un mensaje de carga mientras se obtienen los datos
  if (!loadedNotifications) {
      return (
          <div className="loading-state">
              <p>Cargando notificaciones...</p>
          </div>
      );
  }



// Mostrar la lista y el modal (si está abierto)
  return (
     <div className="ticket-list-container">
        {notificaciones.map(noti => (
         <Notificacion 
           key={noti.id} 
           notificacion={noti} 
         />
       ))}
     </div>
  );
}

export default AllNotifications