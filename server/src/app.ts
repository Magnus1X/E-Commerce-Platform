import express from 'express';
import cors from 'cors';
// Import routes here later

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes will be mounted here
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error handling middleware usage here later

export default app;
