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
const http_proxy_1 = __importDefault(require("http-proxy"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(express_1.default.json());
const services = {
    admin: 'https://admin-service-olive.vercel.app',
    booking: 'https://booking-service-eight.vercel.app',
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
// Proxy setup
const proxy = http_proxy_1.default.createProxyServer();
app.use('/admin', (req, res) => {
    console.log('Admin service request');
    if (serviceStatusCache['admin'] === 'healthy') {
        proxy.web(req, res, { target: services.admin });
    }
    else {
        res.status(503).send({
            error: 'Admin service is currently unavailable.',
        });
    }
});
app.use('/booking', (req, res) => {
    console.log('Booking request');
    if (serviceStatusCache['booking'] === 'healthy') {
        proxy.web(req, res, { target: services.booking });
    }
    else {
        res.status(503).send({
            error: 'Booking service is currently unavailable.',
        });
    }
});
app.use('/pricing', (req, res) => {
    console.log('Pricing request');
    if (serviceStatusCache['pricing'] === 'healthy') {
        proxy.web(req, res, { target: services.pricing });
    }
    else {
        res.status(503).send({
            error: 'Pricing service is currently unavailable.',
        });
    }
});
app.listen(PORT, () => {
    console.log(`API Gateway is running on http://localhost:${PORT}`);
    checkServicesHealth();
});
