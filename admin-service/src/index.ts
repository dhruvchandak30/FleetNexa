import express from 'express';
import bookingRoutes from './routes/bookingRoutes';
import driverRoutes from './routes/driverRoutes';
import vehicleRoutes from './routes/vehicleRoutes';
import dotenv from 'dotenv';
import { main } from './queues/consumer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use('/api/bookings', bookingRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/vehicles', vehicleRoutes);

app.listen(PORT, () => {
    // main();
    console.log(`Server is running on http://localhost:${PORT}`);
});
