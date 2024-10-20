import express from 'express';
import { main } from './queue/producer';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const services = {
    admin: 'https://admin-service-olive.vercel.app//health',
    booking: 'https://booking-service-eight.vercel.app/health',
    pricing: 'http://localhost:5002/health',
};

const serviceStatusCache: { [key: string]: string } = {};

const checkServicesHealth = async () => {
    console.log('Checking services health...');
    for (const [serviceName, url] of Object.entries(services)) {
        try {
            const response = await axios.get(url);
            if (response.status === 200 && response.data.status === 'ok') {
                serviceStatusCache[serviceName] = 'healthy';
            } else {
                serviceStatusCache[serviceName] = 'unhealthy';
                console.error(`Service ${serviceName} is unhealthy: Response status ${response.status}, data: ${JSON.stringify(response.data)}`);
            }
        } catch (error) {
            serviceStatusCache[serviceName] = 'unhealthy';
            //@ts-ignore
            console.error(`Service ${serviceName} is unhealthy: ${error.message}`);
        }
    }
};

setInterval(checkServicesHealth, 30000);

app.listen(PORT, () => {
    console.log(`API Gateway is running on http://localhost:${PORT}`);
    checkServicesHealth();
});
