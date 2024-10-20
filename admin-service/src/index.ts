import express from 'express';
import bookingRoutes from './routes/bookingRoutes';
import driverRoutes from './routes/driverRoutes';
import vehicleRoutes from './routes/vehicleRoutes';
import dotenv from 'dotenv';
import { main } from './queues/consumer';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());
app.use('/api/bookings', bookingRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/vehicles', vehicleRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    // main();
    console.log(`Server is running on http://localhost:${PORT}`);
});
