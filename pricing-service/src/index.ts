import express from 'express';

const app = express();
const PORT = 5002;

app.use(express.json());

interface Location {
    lat: number;
    lng: number;
    formatted: string;
    timezone: string;
}

interface CalculateCostRequest {
    pickup_location: Location;
    dropoff_location: Location;
}
//@ts-ignore
app.post('/calculate-cost', (req, res) => {
    const { pickup_location, dropoff_location }: CalculateCostRequest =
        req.body;

    if (!pickup_location || !dropoff_location) {
        return res
            .status(400)
            .json({ message: 'Pickup and dropoff locations are required.' });
    }

    const distance = calculateDistance(pickup_location, dropoff_location);
    const costPerKm = 10;
    const estimated_cost = distance * costPerKm;

    res.json({ estimated_cost: Math.round(estimated_cost) });
});

const calculateDistance = (loc1: Location, loc2: Location): number => {
    const R = 6371;
    const lat1 = loc1.lat * (Math.PI / 180);
    const lat2 = loc2.lat * (Math.PI / 180);
    const deltaLat = (loc2.lat - loc1.lat) * (Math.PI / 180);
    const deltaLng = (loc2.lng - loc1.lng) * (Math.PI / 180);

    const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1) *
            Math.cos(lat2) *
            Math.sin(deltaLng / 2) *
            Math.sin(deltaLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Pricing service is running on http://localhost:${PORT}`);
});
