
// Metodo para conseguir a todos los usuarios
const getUsers = async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT ... FROM ...');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener los usuarios de la aplicación'});}
}

// Metodo para conseguir a 1 usuario
const getUser = async (req, res) => {
    try{
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM lugares WHERE id = ?', [id]);
        if (rows.length === 0){
            return res.status(404).json({ error: 'Lugar no encontrado'});      
        }

        //Obtener comenarios del lugar
        const [comentarios] = await pool.query('SELECT * FROM comentarios WHERE lugar_id = ? ORDER BY fecha DESC', [id]);

        // Combinar comentarios del lugar
        const lugar = rows[0];
        lugar.comentarios = comentarios;
        res.json(lugar);
    } catch(error) {
        console.log('Error al obtener lugar por ID', error);
        res.status(500).json({error: 'Error al obtener el lugar turístico' });
    }
}

// Metodo eliminar usuario
const deleteUser = async (req, res) => {

}

// Metodo para crear usuario
const insertUsers = async (req, res) => {

}

// Metodo para modificar usuario
const patchUser = async (req, res) => {

}
