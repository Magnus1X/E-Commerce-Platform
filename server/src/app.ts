import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import { ErrorMiddleware } from './middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use(ErrorMiddleware.handle);

export default app;
