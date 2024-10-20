import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const services = {
    admin: 'https://admin-service-olive.vercel.app',
    booking: 'http://localhost:5000',
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

const healthCheckMiddleware = (serviceName: keyof typeof services) => {
    return (req: Request, res: Response, next: () => void) => {
        if (serviceStatusCache[serviceName] === 'healthy') {
            next();
        } else {
            res.status(503).send({
                error: `${serviceName} service is currently unavailable.`,
            });
        }
    };
};

app.use(
    '/admin',
    healthCheckMiddleware('admin'),
    createProxyMiddleware({
        target: services.admin,
        changeOrigin: true,
    })
);


app.use(
    '/booking',
    (req: Request, res: Response, next: () => void) => {
        console.log('Received request at /booking:', req.method, req.body);
        healthCheckMiddleware('booking')(req, res, next);
    },
    createProxyMiddleware({
        target: services.booking,
        changeOrigin: true,
        pathRewrite: { '^/booking': '' },
        onProxyReq: (proxyReq: any, req: any) => {
            console.log('Forwarding request to:', `${services.booking}${req.originalUrl.replace('/booking', '')}`);

            // Only log if method is POST, PUT, or PATCH
            if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
                const bodyData = JSON.stringify(req.body);
                proxyReq.setHeader('Content-Type', 'application/json');
                proxyReq.write(bodyData);
                console.log('Booking service request body:', bodyData);
            } else {
                console.log('Request method not supported for body logging:', req.method);
            }
        },
        onError: (err: any, req: Request, res: Response) => {
            console.error('Proxy error:', err);
            res.status(502).send({ error: 'Bad Gateway: Unable to reach the booking service.' });
        },
    } as any)
);



app.use(
    '/pricing',
    healthCheckMiddleware('pricing'),
    createProxyMiddleware({
        target: services.pricing,
        changeOrigin: true,
    })
);

app.listen(PORT, () => {
    console.log(`API Gateway is running on http://localhost:${PORT}`);
    checkServicesHealth();
});
