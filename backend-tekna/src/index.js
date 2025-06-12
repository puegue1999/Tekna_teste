import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRouter from '../routes/user.routes.js';
import taskRouter from '../routes/task.routes.js';

dotenv.config();

const app = express();

// Middleware for CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Register routes
app.use('/', userRouter);
app.use('/tasks', taskRouter);

// Health check route
app.get('/api/health', (req, res) => {
  try {
    res.send('Tekna API running!');
  } catch (error) {
    console.error('Error on /api/health:', error);
    res.status(500).send('Internal server error');
  }
});

const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
