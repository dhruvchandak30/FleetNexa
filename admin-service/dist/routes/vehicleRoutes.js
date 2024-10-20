"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehicleController_1 = require("../controllers/vehicleController");
const router = (0, express_1.Router)();
router.post('/', vehicleController_1.createVehicle);
router.get('/', vehicleController_1.getAllVehicles);
router.patch('/:id', vehicleController_1.updateVehicleStatus);
exports.default = router;
