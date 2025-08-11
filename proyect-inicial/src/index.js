import express from 'express';
import usuarioRutas from './routes/usuario.routes.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/usuarios', usuarioRutas);

app.get('/', (req, res) => {
  res.send('Servidor funcinando');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`servidor corriendo en http://localhost:${PORT}`);
});
