import { pool } from "../helpers/mysql-config.js";

// Metodo para conseguir a todos los tickets
const getTickets = async (req, res) => {
    try{
        
        // CAMBIO
        // 1. Obtener los parámetros de filtro de la query string
        const { category, priority, sort_date } = req.query; 

        let sqlQuery = 'SELECT * FROM tickets';
        
        // Condiciones WHERE base (tecnico_id y aceptado)
        let whereClauses = [];
        let queryParams = []; 

        // 2. Añadir filtro por Categoría
        if (category && category.toUpperCase() !== 'TODOS') {
            whereClauses.push('category = ?');
            queryParams.push(category);
        }

        // 3. Añadir filtro por Prioridad
        if (priority && priority.toUpperCase() !== 'TODOS') {
            whereClauses.push('priority = ?');
            queryParams.push(priority);
        }

        // 4. Unir todas las cláusulas WHERE y añadirlas a la consulta
        if (whereClauses.length > 0) {
            // Note: The spaces around ' AND ' are crucial, but join() usually handles that.
            sqlQuery += ' WHERE ' + whereClauses.join(' AND '); 
        }
        
        // 5. Añadir la cláusula ORDER BY
        const sortOrder = (sort_date && (sort_date.toUpperCase() === 'ASC' || sort_date.toUpperCase() === 'DESC'))
                          ? sort_date.toUpperCase() 
                          : 'DESC'; 
        
        sqlQuery += ` ORDER BY created_at ${sortOrder}`;

        console.log('Final SQL Query:', sqlQuery);
        console.log('Query Parameters:', queryParams);

        // FIN DE CAMBIOS

        const [rows] = await pool.query(sqlQuery, queryParams);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener tickets:', error);
        res.status(500).json({ error: 'Error al obtener los tickets de la aplicación'});}
}

// Metodo para conseguir un ticket
const getTicket = async (req, res) => {
    try{
        const { id } = req.params ;
        const [rows] = await pool.query('SELECT * FROM tickets WHERE id = ?', [id]);
        if (rows.length === 0){
            return res.status(404).json({ error: 'tickets no encontrado'});      
        }

        const user = rows[0];
        res.json(user);
    } catch(error) {
        console.log('Error al obtener tickets por ID', error);
        res.status(500).json({error: 'Error al obtener el tickets' });
    }
}

// Metodo desactivar un ticket
const disableTicket = async (req, res) => {
    try{
        const id = req.body.id
        if(!id){
            return res.status(400).json({error : "Falta el id"})
        }

        await pool.query("UPDATE tickets SET is_active = FALSE WHERE id = ?", [id]); 
        
        res.status(201).json({
            exito: "Se logró la actualización de desabilitar ticket"
        })

    } catch(error){
        console.error('Error al desactivar ticket', error)
        res.status(500).json({ error: 'Error al desactivar el ticket'});
    }
}

// Metodo para crear usuario
const insertTicket = async (req, res) => {
    try{
        const {title, description, category, priority, created_by, assigned_to} = req.body;
        if(!title || !description || !category || !priority || !created_by || !assigned_to){
            return res.status(400).json(
                { error: "Faltan campos obligatorios, campos: title, description, category, priority, created_by, assigned_to"});
        }

        const [result] = await pool.query("INSERT INTO `tickets` (`title`, `description`, `category`, `priority`, `created_by`, `assigned_to`) VALUES (?,?,?,?,?,?)", 
            [title, description, category, priority, created_by, assigned_to]);
        
        res.status(201).json({
            exito: "Se logró agregar al nuevo ticket"
        });

    } catch(error){
        console.error('Error al añadir ticket', error)
        res.status(500).json({ error: 'Error al añadir el ticket'});
    }
}


// Metodo para conseguir un ticket
const getTicketsAcepted = async (req, res) => {
    try{
        const { id } = req.params;

        // CAMBIO
        // 1. Obtener los parámetros de filtro de la query string
        const { category, priority, sort_date } = req.query; 

        let sqlQuery = 'SELECT t.id, title, description, category, priority, status, acepted, t.created_at FROM tickets t JOIN users u ON t.assigned_to = u.id';
        
        // Condiciones WHERE base (tecnico_id y aceptado)
        let whereClauses = ['u.id = ?', 'acepted = 1'];
        let queryParams = [id]; 

        // 2. Añadir filtro por Categoría
        if (category && category.toUpperCase() !== 'TODOS') {
            whereClauses.push('t.category = ?');
            queryParams.push(category);
        }

        // 3. Añadir filtro por Prioridad
        if (priority && priority.toUpperCase() !== 'TODOS') {
            whereClauses.push('t.priority = ?');
            queryParams.push(priority);
        }

        // 4. Unir todas las cláusulas WHERE y añadirlas a la consulta
        if (whereClauses.length > 0) {
            // Note: The spaces around ' AND ' are crucial, but join() usually handles that.
            sqlQuery += ' WHERE ' + whereClauses.join(' AND '); 
        }
        
        // 5. Añadir la cláusula ORDER BY
        const sortOrder = (sort_date && (sort_date.toUpperCase() === 'ASC' || sort_date.toUpperCase() === 'DESC'))
                          ? sort_date.toUpperCase() 
                          : 'DESC'; 
        
        sqlQuery += ` ORDER BY t.created_at ${sortOrder}`;

        console.log('Final SQL Query:', sqlQuery);
        console.log('Query Parameters:', queryParams);

        // FIN DE CAMBIOS

        const [rows] = await pool.query(sqlQuery, queryParams); // Cambio en estos parametros
            //'SELECT t.id, title, description, category, priority, status, acepted, t.created_at FROM tickets t JOIN users u ON t.assigned_to = u.id WHERE u.id = ? and acepted = 1;', [id]);
        res.json(rows);
        
    } catch(error) {
        console.log('Error al obtener tickets por ID', error);
        res.status(500).json({error: 'Error al obtener el tickets' });
    }
}

// Metodo para conseguir un ticket
const getTicketsNotAcepted = async (req, res) => {
    try{
        const { id } = req.params;
        const [rows] = await pool.query('SELECT t.id, title, description, category, priority, status, acepted, t.created_at FROM tickets t JOIN users u ON t.assigned_to = u.id WHERE u.id = ? and acepted = 0;', [id]);

        res.json(rows);
    } catch(error) {
        console.log('Error al obtener tickets por ID', error);
        res.status(500).json({error: 'Error al obtener el tickets' });
    }
}


const getTicketsCerrados = async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM tickets WHERE status = "CERRADO"');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener tickets:', error);
        res.status(500).json({ error: 'Error al obtener los tickets de la aplicación'});}
}


// Metodo desactivar un ticket
const aceptarTicket = async (req, res) => {
    try{
        const id = req.body.id
        if(!id){
            return res.status(400).json({error : "Falta el id"})
        }

        await pool.query("UPDATE tickets SET acepted = TRUE WHERE id = ?", [id]); 
        
        res.status(201).json({
            exito: "Se logró la actualización de aceptar ticket"
        })

    } catch(error){
        console.error('Error al desactivar ticket', error)
        res.status(500).json({ error: 'Error al desactivar el ticket'});
    }
}

// Metodo desactivar un ticket
const rechazarTicket = async (req, res) => {
    try{
        const id = req.body.id
        if(!id){
            return res.status(400).json({error : "Falta el id"})
        }

        await pool.query("UPDATE tickets SET assigned_to = NULL WHERE id = ?", [id]); 
        
        res.status(201).json({
            exito: "Se logró el rechazo del ticket"
        })

    } catch(error){
        console.error('Error al desactivar ticket', error)
        res.status(500).json({ error: 'Error al desactivar el ticket'});
    }
}

const asignarCategoria = async (req, res) => {
    try{
        const {id, category} = req.body // id del ticket
        if(!id){
            return res.status(400).json({error : "Falta el id o la estado"})
        }
        if(!category){
            return res.status(400).json({error : "Falta la estado"})
        }

        if(category != "REDES" && category != "SOFTWARE" && category != "HARDWARE" && category != "OTRO"){
            return res.status(400).json({error : "La estado no está disponible"})
        }

        await pool.query('UPDATE tickets SET category = ? WHERE id = ?', [category, id]);

        res.status(200).json({
            exito: "Se logró actualizar la estado"
        })

    }catch(error){
        res.status(500).json({ error : "Error al actualizar la estado"})
    }
}

const asignarEstado = async (req, res) => {
    try{
        const {id, status} = req.body // id del ticket
        if(!id){
            return res.status(400).json({error : "Falta el id o la categoría"})
        }
        if(!status){
            return res.status(400).json({error : "Falta el Estado"})
        }

        if(status != "ABIERTO" && status != "CERRADO" && status != "EN_PROCESO"){
            return res.status(400).json({error : "La categoría no está disponible"})
        }

        await pool.query('UPDATE tickets SET status = ? WHERE id = ?', [status, id]);

        res.status(200).json({
            exito: "Se logró actualizar la categoría"
        })

    }catch(error){
        res.status(500).json({ error : "Error al actualizar la categoría"})
    }
}

const asignarPrioridad = async (req, res) => {
    try{
        const {id, priority} = req.body // id del ticket
        if(!id){
            return res.status(400).json({error : "Falta el id"})
        }
        if(!priority){
            return res.status(400).json({error : "Falta la prioridad"})
        }


        if(priority != "BAJA" && priority != "ALTA" && priority != "MEDIA" ){
            return res.status(400).json({error : "La prioridad no está disponible"})
        }

        await pool.query('UPDATE tickets SET priority = ? WHERE id = ?', [priority, id]);

        res.status(200).json({
            exito: "Se logró actualizar la prioridad"
        })

    }catch(error){
        res.status(500).json({ error : "Error al actualizar la prioridad"})
    }
}


export { getTicket, 
         getTickets, 
         disableTicket, 
         insertTicket, 
         getTicketsAcepted, 
         getTicketsNotAcepted,
         aceptarTicket,
         rechazarTicket,
         asignarCategoria,
         asignarPrioridad,
         asignarEstado,
         getTicketsCerrados
        }