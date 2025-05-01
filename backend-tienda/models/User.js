const pool = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
    createUser: async (userData) => {
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const query = `
            INSERT INTO usuario (
                correo_us,
                nombre_us,
                apellido_us,
                ntelefono_us,
                tdocumento_us,
                contraseña_us,
                created_by,
                updated_by
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id_us, correo_us, nombre_us, created_at
        `;

        const values = [
            userData.email,
            userData.nombre,
            userData.apellido,
            userData.telefono,
            userData.tipoDocumento,
            hashedPassword,
            'system',
            'system'
        ];

        const result = await pool.query(query, values);
        return result.rows[0];
    },

    findByEmail: async (email) => {
        const result = await pool.query(
            'SELECT * FROM usuario WHERE correo_us = $1',
            [email]
        );
        return result.rows[0];
    }
};

module.exports = User;
