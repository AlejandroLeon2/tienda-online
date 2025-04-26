const pool = require('../config/db');

const allProductos = async () => {
    const resultado = await pool.query('SELECT id_pr, nombre_pr, descripcion_pr, marca_pr, precio_pr, estado_pr, foto_pr, created_by FROM productos');
    return resultado.rows;
};

module.exports = { allProductos };