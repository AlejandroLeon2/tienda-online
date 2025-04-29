const user = require('../models/User');
const producto = require('../models/Productos');
const pool = require('../config/db');

const getUsers = async (req, res) => {
    try {
        const users = await user.fetchUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductos = async (req, res) => {
    try {
        const productos = await producto.allProductos();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const postProductos = async (req, res) => {
    try {
        const {
            nombre_pr,
            descripcion_pr,
            marca_pr,
            precio_pr,
            estado_pr,
            created_by,
            foto_pr
        } = req.body;

        if (!nombre_pr || !descripcion_pr || !marca_pr || !precio_pr || !estado_pr || !created_by) {
            return res.status(400).json({ error: 'Faltan campos obligatorios.' });
        }

        if (isNaN(precio_pr) || precio_pr <= 0) {
            return res.status(400).json({ error: 'El precio debe ser un número positivo.' });
        }

        // Conversión de la imagen
        const bufferFoto = foto_pr ? Buffer.from(foto_pr, 'base64') : null;

        const insertQuery = `
            INSERT INTO productos (nombre_pr, descripcion_pr, marca_pr, precio_pr, estado_pr, foto_pr, created_by)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        const values = [
            nombre_pr,
            descripcion_pr,
            marca_pr,
            precio_pr,
            estado_pr,
            bufferFoto,
            created_by
        ];

        await pool.query(insertQuery, values);
        res.status(201).json({ message: 'Producto creado exitosamente' });

    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ error: 'Ya existe un producto con ese nombre.' });
        }

        console.error('Error al insertar producto:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};


module.exports = { getUsers, getProductos, postProductos };
