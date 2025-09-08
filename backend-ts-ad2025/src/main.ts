import express from 'express';
import dotenv from 'dotenv';
import router from "./routes/empleado.routes"
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT! || 5050;

const app = express();
const corsApp = cors();
app.use(corsApp);
app.use(express.json());
app.use('/empleados', router);
app.get('/', (req, res) => {
  res.send('Corriendo servidor :)');
})


app.listen(PORT, () => {
  console.log(`Corriendo en ${PORT}`);
})