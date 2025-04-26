const pool = require('../config/db');

const fetchUsers = async () => {
    const resultado = await pool.query('SELECT * FROM usuario');
    return resultado.rows; // Devuelve los usuarios desde la base de datos
};



module.exports = { fetchUsers};
