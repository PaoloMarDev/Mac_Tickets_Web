import AllTicketList from '../PestanasPequenas/AllTicketList.jsx'
import AllUsersList from '../PestanasPequenas/AllUsersList.jsx'


import '../../components_css/Tecnico.css'
import { useState, useEffect } from 'react'



const priorities = ["---","ALTA", "MEDIA", "BAJA"];
const categories = ["---", "REDES", "HARDWARE", "SOFTWARE", "OTRO"];
const roles = ["---", "ADMIN", "MESA", "TECNICO"];

const Administrador = () => {
    //--------------- ESTADOS DE TICKETS Y FILTRADO ---------------//
    const [originalList, setOriginalList] = useState([]); // Lista completa (original)
    const [filteredList, setFilteredList] = useState([]); // Lista que se muestra
    const [query, setQuery] = useState('') // Búsqueda por texto
    
    const [originalUsersList, setOriginalUsersList] = useState([]); // Lista completa (original)
    const [filteredUserList, setFilteredUsersList] = useState([]); // Lista que se muestra
    const [userQuery, setUserQuery] = useState('') // Búsqueda por texto
    
    const [selectedCategory, setSelectedCategory] = useState(categories[0]); // Estado para futura categoría
    const [selectedPriority, setSelectedPriority] = useState(priorities[0]); // Estado para prioridad (inicializado a "---")
    const [selectedRole, setSelectedRole] = useState(roles[0]); // Estado para prioridad (inicializado a "---")


    // Función que AllTicketList usa para guardar la lista COMPLETA por primera vez
    const setListToUse = (tickets) => {
        setOriginalList(tickets);
        setFilteredList(tickets); // Al inicio, la lista filtrada es igual a la original
    }
    
    const setUserListToUse = (Users) => {
        setOriginalUsersList(Users);
        setFilteredUsersList(Users); // Al inicio, la lista filtrada es igual a la original
    }

    // Función que AllTicketList usa para obtener la lista que debe mostrar
    const getListToUse = () => {
        return filteredList;
    }
    
    // Función que AllTicketList usa para obtener la lista que debe mostrar
    const getUserListToUse = () => {
        return filteredUserList;
    }
    
    
    
    
    // 1. Manejador de la búsqueda por texto
    const handleChange = (e) => {
        setQuery(e.target.value.toLowerCase());
    }
    const handleUserChange = (e) => {
        setUserQuery(e.target.value.toLowerCase());
    }
    


    const handleChangePriority = (e) => {
        setSelectedPriority(e.target.value);
    }
    const handleChangeCategory = (e) => {
        setSelectedCategory(e.target.value);
    }
    const handleRoleUsers = (e) => {
        setSelectedRole(e.target.value);
    }
    


    // Este efecto se ejecuta cada vez que 'query', 'selectedPriority' o 'originalList' cambian
    useEffect(() => {
        let currentList = originalList;
        
        // --- 1. Aplicar filtro de Prioridad ---
        // Verificamos que la prioridad seleccionada no sea el valor por defecto ("---")
        if (selectedPriority && selectedPriority !== priorities[0]) {
            currentList = currentList.filter((tick) => {
                return tick["priority"] === selectedPriority; // Filtrado por priority
            });
        }
        
        // --- 2. Aplicar filtro de Categoria ---
        // Verificamos que la categoría seleccionada no sea el valor por defecto ("---")
        if (selectedCategory && selectedCategory !== categories[0]) {
            currentList = currentList.filter((tick) => {
                return tick["category"] === selectedCategory; // Filtrado por priority
            });
        }
        
        // --- 3. Aplicar filtro de Búsqueda por texto ---
        // Se aplica sobre la lista resultante del filtro de prioridad
        if (query) { 
            currentList = currentList.filter((tick) => {
                return tick["title"].toLowerCase().includes(query); // Filtrado por title
            });
        }
        
        // --- 3. Actualizar la lista que se muestra ---
        setFilteredList(currentList);

    }, [query, selectedPriority, selectedCategory, originalList]); // Dependencias: Se ejecuta con cambios en cualquiera de estos estados
    
    // Este efecto se ejecuta cada vez que 'query', 'selectedPriority' o 'originalList' cambian
    useEffect(() => {
        let currentUserList = originalUsersList;
        
        // --- 1. Aplicar filtro de Prioridad ---
        // Verificamos que la prioridad seleccionada no sea el valor por defecto ("---")
        if (selectedRole && selectedRole !== roles[0]) {
            currentUserList = currentUserList.filter((tick) => {
                return tick["role"] === selectedRole; // Filtrado por priority
            });
        }

        // --- 2. Aplicar filtro de Búsqueda por texto ---
        // Se aplica sobre la lista resultante del filtro de prioridad
        if (userQuery) { 
            currentUserList = currentUserList.filter((tick) => {
                return tick["username"].toLowerCase().includes(userQuery); // Filtrado por title
            });
        }
        
        // --- 3. Actualizar la lista que se muestra ---
        setFilteredUsersList(currentUserList);

    }, [userQuery, selectedRole, originalUsersList]); // Dependencias: Se ejecuta con cambios en cualquiera de estos estados

    //-------------------------------------------------------------//


    return(
        <section className='TechnicalView'>
            <div className='vertical-line'></div>
            <div className='ViewSection AssignedTickets'>
                <h2>Tickets</h2>
                <div className="SectionHeader">
                    <div className='Search'>
                        <input type="search" placeholder='Buscar...' onChange={handleChange} value={query}/>
                    </div>
                    <div className='filtros'>
                        
                        <div className="create-select-group">
                            <label htmlFor="category">Categoría</label>
                            <select 
                            name="category" 
                            className="create-styled-select"
                            onChange={handleChangeCategory}
                            value={selectedCategory}>
                            {categories.map(c => (
                                <option className="option" key={c} value={c}>{c}</option>
                            ))}
                            </select>
                        </div>

                        <div className="create-select-group">
                            <label htmlFor="priority">Prioridad</label>
                            <select 
                                name="priority" 
                                className="create-styled-select" 
                                onChange={handleChangePriority} 
                                value={selectedPriority}
                            >
                            {priorities.map(p => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                            </select>
                        </div>
                        
                    </div>
                </div>
                <div className='ListContainer TicketContainer'>
                    <AllTicketList 
                    setListToUse = {setListToUse}
                    getListToUse = {getListToUse}
                    />
                </div>
            </div>
            <div className='vertical-line'></div>
            <div className='ViewSection NewTickets'>
                <h2>Usuarios</h2>
                <div className="SectionHeader">
                    <div className='Search'>
                        <input type="search" placeholder='Buscar...' onChange={handleUserChange} value={userQuery}/>
                    </div>
                    <div className="create-select-group">
                        <label htmlFor="category">Rol</label>
                        <select 
                        name="role" 
                        className="create-styled-select"
                        onChange={handleRoleUsers}
                        value={selectedRole}>
                        {roles.map(c => (
                            <option className="option" key={c} value={c}>{c}</option>
                        ))}
                        </select>
                    </div>
                </div>
                        <div className='ListContainer NewTicketsContainer'>
                            <AllUsersList 
                            setUserListToUse = {setUserListToUse}
                            getUserListToUse = {getUserListToUse}
                            />
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