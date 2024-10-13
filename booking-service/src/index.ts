import express from 'express';
import bookingRoutes from './routes/bookingRoutes';
import signupRoutes from './routes/signupRoutes';
import cors from 'cors';
import loginRoutes from './routes/loginRoutes';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use('/api/bookings', bookingRoutes);
app.use('/api/signup', signupRoutes);
app.use('/api/login', loginRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
