const express = require('express');
const upload = require('../config/multer');
const { getUsers, getProductos, getPedidos, postProductos, putProductos, deleteProductos, registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

router.get('/users', getUsers);
router.get('/productos', getProductos);
router.get('/pedidos', getPedidos)
router.post('/productos', upload.single('imagen_producto'), postProductos);
router.put('/productos/:id', upload.single('imagen_producto'), putProductos);
router.delete('/productos/:id', deleteProductos);
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
