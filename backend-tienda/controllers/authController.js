const user = require('../models/User');
const producto = require('../models/Productos');

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


module.exports = { getUsers, getProductos };
