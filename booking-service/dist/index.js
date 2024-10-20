"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingRoutes_1 = __importDefault(require("./routes/bookingRoutes"));
const signupRoutes_1 = __importDefault(require("./routes/signupRoutes"));
const cors_1 = __importDefault(require("cors"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
require('dotenv').config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/bookings', bookingRoutes_1.default);
app.use('/api/signup', signupRoutes_1.default);
app.use('/api/login', loginRoutes_1.default);
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
