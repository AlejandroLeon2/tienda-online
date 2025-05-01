const user = require('../models/User');
const Producto = require('../models/Productos');
const pedido = require('../models/Pedidos');
const handleError = require('../utils/errorHandler');

const getUsers = async (req, res) => {
    try {
        const users = await user.createUser();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const registerUser = async (req, res) => {
    try {
        const { body } = req;

        // Validación básica
        const requiredFields = [
            'nombre', 'apellido', 'email',
            'telefono', 'tipoDocumento', 'password'
        ];

        const missingFields = requiredFields.filter(field => !body[field]);
        if (missingFields.length > 0) {
            return handleError(res, new Error(`Campos faltantes: ${missingFields.join(', ')}`), 400);
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findByEmail(body.email);
        if (existingUser) {
            return handleError(res, new Error('El correo ya está registrado'), 409);
        }

        // Crear nuevo usuario
        const newUser = await User.createUser(body);

        res.status(201).json({
            success: true,
            data: newUser
        });

    } catch (error) {
        handleError(res, error);
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validación básica
        if (!email || !password) {
            return handleError(res, new Error('Email y contraseña son requeridos'), 400);
        }

        // Buscar usuario
        const user = await User.findByEmail(email);
        if (!user) {
            return handleError(res, new Error('Credenciales inválidas'), 401);
        }

        // Verificar contraseña
        const validPassword = await bcrypt.compare(password, user.contraseña_us);
        if (!validPassword) {
            return handleError(res, new Error('Credenciales inválidas'), 401);
        }

        // Eliminar datos sensibles de la respuesta
        delete user.contraseña_us;

        res.json({
            success: true,
            data: user
        });

    } catch (error) {
        handleError(res, error);
    }
};
const getCategorias= async (req, res) => {
    try {
        const categorias = await Producto.allCategorias();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getProductos = async (rep, res) => {
    try {
        const productos = await Producto.allProductos();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getPedidos = async (req, res) => {
    try {
        const pedidos = await pedido.allPedidos();
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const postProductos = async (req, res) => {
    try {
        if (!req.file) return handleError(res, new Error('Imagen requerida'), 400);

        const productData = {
            nombre_pr: req.body.nombre_producto,
            id_ca: parseInt(req.body.categoria_producto),
            marca_pr: req.body.marca_producto,
            precio_pr: parseInt(req.body.precio_producto),
            descripcion_pr: req.body.descripcion_producto,
            foto_pr: req.file.buffer
        };

        const newProduct = await Producto.addProducto(productData);
        res.status(201).json({ success: true, data: newProduct });

    } catch (error) {
        handleError(res, error);
    }
};

const putProductos = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) return handleError(res, new Error('ID inválido'), 400);

        const updateData = {
            nombre_pr: req.body.nombre_producto,
            id_ca: parseInt(req.body.categoria_producto),
            marca_pr: req.body.marca_producto,
            precio_pr: parseInt(req.body.precio_producto),
            descripcion_pr: req.body.descripcion_producto,
            foto_pr: req.file?.buffer  // Imagen opcional en actualización
        };

        const updatedProduct = await Producto.updateProducto(productId, updateData);

        if (!updatedProduct) return handleError(res, new Error('Producto no encontrado'), 404);

        res.json({ success: true, data: updatedProduct });

    } catch (error) {
        handleError(res, error);
    }
};

const deleteProductos = async (req, res) => {
    try {
        const productoEliminado = await Producto.deleteProducto(req.params.id);
        res.json(productoEliminado);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getUsers, getProductos, getPedidos, postProductos, putProductos, deleteProductos, registerUser,loginUser };
