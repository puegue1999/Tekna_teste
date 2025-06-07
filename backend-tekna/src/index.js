import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from '../routes/user.routes.js';
import taskRouter from '../routes/task.routes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', userRouter);
app.use('/tasks', taskRouter);

app.get('/', async (req, res) => {
  res.send('API Tekna rodando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});