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
//@ts-ignore
router.post('/getDriverBookings', bookingController_1.getDriverBookings);
//@ts-ignore
router.post('/acceptBooking', bookingController_1.acceptBooking);
//@ts-ignore
router.post('/updateBookingStatus', bookingController_1.updateBookingStatus);
//@ts-ignore
router.post('/rate', bookingController_1.updateBookingRate);
exports.default = router;
