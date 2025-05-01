require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/authRoutes');
const userModel = require('./models/User');

const app = express();

app.use(cors({
  origin: 'http://localhost:4321',
  credentials: true // Agregar esto
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Agregar esta línea
app.use('/api', userRoutes);

app.get('/', async (req, res) => {
  try {
    const users = await userModel.fetchUsers();

    res.send(`
      <html>
        <head>
          <title>API</title>
        </head>
        <body>
          <h1>API de tiendaHG </h1>
          <table border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
              </tr>
            </thead>
            <tbody>
              ${users.map(user => `
                <tr>
                  <td>${user.id_us}</td>
                  <td>${user.nombre_us}</td> 
                  <td>${user.correo_us}</td> 
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Error al obtener usuarios:', error.message);
    res.status(500).send('Error al obtener la lista de usuarios.');
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
