"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(express_1.default.json());
const services = {
    admin: 'https://admin-service-olive.vercel.app',
    booking: 'http://localhost:5000',
    pricing: 'https://pricing-service-seven.vercel.app',
};
const serviceStatusCache = {};
const checkServicesHealth = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Checking services health...');
    for (const [serviceName, url] of Object.entries(services)) {
        try {
            const response = yield axios_1.default.get(`${url}/health`);
            if (response.status === 200 && response.data.status === 'ok') {
                serviceStatusCache[serviceName] = 'healthy';
            }
            else {
                serviceStatusCache[serviceName] = 'unhealthy';
                console.error(`Service ${serviceName} is unhealthy: Response status ${response.status}, data: ${JSON.stringify(response.data)}`);
            }
        }
        catch (error) {
            serviceStatusCache[serviceName] = 'unhealthy';
            console.error(
            //@ts-ignore
            `Service ${serviceName} is unhealthy: ${error.message}`);
        }
    }
});
setInterval(checkServicesHealth, 30000);
const healthCheckMiddleware = (serviceName) => {
    return (req, res, next) => {
        if (serviceStatusCache[serviceName] === 'healthy') {
            next();
        }
        else {
            res.status(503).send({
                error: `${serviceName} service is currently unavailable.`,
            });
        }
    };
};
app.use('/admin', healthCheckMiddleware('admin'), (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: services.admin,
    changeOrigin: true,
}));
app.use('/booking', (req, res, next) => {
    console.log('Received request at /booking:', req.method, req.body);
    healthCheckMiddleware('booking')(req, res, next);
}, (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: services.booking,
    changeOrigin: true,
    pathRewrite: { '^/booking': '' },
    onProxyReq: (proxyReq, req) => {
        console.log('Forwarding request to:', `${services.booking}${req.originalUrl.replace('/booking', '')}`);
        // Only log if method is POST, PUT, or PATCH
        if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.write(bodyData);
            console.log('Booking service request body:', bodyData);
        }
        else {
            console.log('Request method not supported for body logging:', req.method);
        }
    },
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(502).send({ error: 'Bad Gateway: Unable to reach the booking service.' });
    },
}));
app.use('/pricing', healthCheckMiddleware('pricing'), (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: services.pricing,
    changeOrigin: true,
}));
app.listen(PORT, () => {
    console.log(`API Gateway is running on http://localhost:${PORT}`);
    checkServicesHealth();
});
