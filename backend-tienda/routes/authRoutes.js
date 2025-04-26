const express = require('express');
const { getUsers, getProductos } = require('../controllers/authController');

const router = express.Router();

router.get('/users', getUsers);
router.get('/productos', getProductos);

module.exports = router;
