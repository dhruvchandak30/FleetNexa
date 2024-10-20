import express, { Request, Response } from 'express';
import { main } from './queue/producer';
import dotenv from 'dotenv';
import axios from 'axios';
import httpProxy from 'http-proxy';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const services = {
    admin: 'https://admin-service-olive.vercel.app',
    booking: 'https://booking-service-eight.vercel.app',
    pricing: 'https://pricing-service-seven.vercel.app',
};

const serviceStatusCache: { [key: string]: string } = {};

const checkServicesHealth = async () => {
    console.log('Checking services health...');
    for (const [serviceName, url] of Object.entries(services)) {
        try {
            const response = await axios.get(`${url}/health`);
            if (response.status === 200 && response.data.status === 'ok') {
                serviceStatusCache[serviceName] = 'healthy';
            } else {
                serviceStatusCache[serviceName] = 'unhealthy';
                console.error(
                    `Service ${serviceName} is unhealthy: Response status ${
                        response.status
                    }, data: ${JSON.stringify(response.data)}`
                );
            }
        } catch (error) {
            serviceStatusCache[serviceName] = 'unhealthy';
            console.error(
                //@ts-ignore
                `Service ${serviceName} is unhealthy: ${error.message}`
            );
        }
    }
};

setInterval(checkServicesHealth, 30000);

// Proxy setup
const proxy = httpProxy.createProxyServer();

app.use('/admin', (req: Request, res: Response) => {
    console.log('Admin service request');
    if (serviceStatusCache['admin'] === 'healthy') {
        proxy.web(req, res, { target: services.admin });
    } else {
        res.status(503).send({
            error: 'Admin service is currently unavailable.',
        });
    }
});

app.use('/booking', (req: Request, res: Response) => {
    console.log('Booking request');
    if (serviceStatusCache['booking'] === 'healthy') {
        proxy.web(req, res, { target: services.booking });
    } else {
        res.status(503).send({
            error: 'Booking service is currently unavailable.',
        });
    }
});

app.use('/pricing', (req: Request, res: Response) => {
    console.log('Pricing request');
    if (serviceStatusCache['pricing'] === 'healthy') {
        proxy.web(req, res, { target: services.pricing });
    } else {
        res.status(503).send({
            error: 'Pricing service is currently unavailable.',
        });
    }
});

app.listen(PORT, () => {
    console.log(`API Gateway is running on http://localhost:${PORT}`);
    checkServicesHealth();
});
