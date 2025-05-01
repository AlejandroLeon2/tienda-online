const pool = require('../config/db');
const Productos = {

    allCategorias: async () => {
        const result = await pool.query(`SELECT * FROM categorias;`);
        return result.rows;
    },

    allProductos: async () => {
        const result = await pool.query(`
            SELECT 
                id_pr,
                nombre_pr,
                descripcion_pr,
                marca_pr,
                precio_pr,
                ENCODE(foto_pr, 'base64') as imagen_base64,
                -- Obtener el tipo MIME de la imagen
                CASE 
                    WHEN foto_pr IS NULL THEN 'jpeg'
                    ELSE 'image/' || pg_column_size(foto_pr)::text 
                END as tipo_imagen,
                id_ca
            FROM productos
        `);
        return result.rows;
    },


    addProducto: async (productoData) => {
        const query = `
            INSERT INTO productos (
                nombre_pr, 
                id_ca, 
                marca_pr, 
                precio_pr, 
                descripcion_pr, 
                foto_pr
            ) VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *
        `;

        const values = [
            productoData.nombre_pr,
            productoData.id_ca,
            productoData.marca_pr,
            productoData.precio_pr,
            productoData.descripcion_pr,
            productoData.foto_pr
        ];

        const result = await pool.query(query, values);
        return result.rows[0];
    },

    updateProducto: async (id, productoData) => {
        const query = `
            UPDATE productos SET
                nombre_pr = $1,
                id_ca = $2,
                marca_pr = $3,
                precio_pr = $4,
                descripcion_pr = $5,
                foto_pr = COALESCE($6, foto_pr)
            WHERE id_pr = $7
            RETURNING *
        `;

        const values = [
            productoData.nombre_pr,
            productoData.id_ca,
            productoData.marca_pr,
            productoData.precio_pr,
            productoData.descripcion_pr,
            productoData.foto_pr,
            id
        ];

        const result = await pool.query(query, values);
        return result.rows[0];
    },

    deleteProducto: async (id) => {
        const result = await pool.query(
            'DELETE FROM productos WHERE id_pr = $1 RETURNING *',
            [id]
        );
        return result.rows[0];
    }
};

module.exports = Productos;
