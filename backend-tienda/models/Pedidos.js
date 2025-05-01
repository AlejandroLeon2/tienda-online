const pool = require('../config/db');

const allPedidos = async () => {
    const resultado = await pool.query('SELECT id_dpe, id_pe, id_pr, cantidad_rpe, precio_unidad_pr, total_dpe, created_at, updated_at, created_by, updated_by FROM dpedidos; ');
    return resultado.rows;
};

module.exports = { allPedidos };