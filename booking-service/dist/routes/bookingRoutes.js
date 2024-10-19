"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookingController_1 = require("../controllers/bookingController");
const router = (0, express_1.Router)();
//@ts-ignore
router.post('/', bookingController_1.createBooking);
//@ts-ignore
router.post('/getbookings', bookingController_1.getBookings);
//@ts-ignore
router.post('/getBookingDetails', bookingController_1.getBookingById);
exports.default = router;
