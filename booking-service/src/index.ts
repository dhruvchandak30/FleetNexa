import express from 'express';
import bookingRoutes from './routes/bookingRoutes';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/bookings', bookingRoutes);

app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`);
});
