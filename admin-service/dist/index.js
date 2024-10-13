"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingRoutes_1 = __importDefault(require("./routes/bookingRoutes"));
const driverRoutes_1 = __importDefault(require("./routes/driverRoutes"));
const vehicleRoutes_1 = __importDefault(require("./routes/vehicleRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
app.use(express_1.default.json());
app.use('/api/bookings', bookingRoutes_1.default);
app.use('/api/drivers', driverRoutes_1.default);
app.use('/api/vehicles', vehicleRoutes_1.default);
app.listen(PORT, () => {
    // main();
    console.log(`Server is running on http://localhost:${PORT}`);
});
