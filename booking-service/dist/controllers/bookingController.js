"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookingRate = exports.updateBookingStatus = exports.acceptBooking = exports.getDriverBookings = exports.getBookingById = exports.getBookings = exports.createBooking = void 0;
const bookingService = __importStar(require("../services/bookingService"));
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingData = yield bookingService.createBookingWithDriverAndVehicle(req.body);
        return res.status(201).json({ message: 'Booking created', data: bookingData });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'An unknown error occurred' });
    }
});
exports.createBooking = createBooking;
const getBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield bookingService.getBookingsByUserId(req.body.user_id);
        return res.status(200).json(bookings);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'An unknown error occurred' });
    }
});
exports.getBookings = getBookings;
const getBookingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield bookingService.getBookingById(req.body.booking_id);
        return res.status(200).json(booking);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'An unknown error occurred' });
    }
});
exports.getBookingById = getBookingById;
const getDriverBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield bookingService.getDriverBookings(req.body.driver_id);
        return res.status(200).json({ bookings });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'An unknown error occurred' });
    }
});
exports.getDriverBookings = getDriverBookings;
const acceptBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield bookingService.acceptBooking(req.body.booking_id);
        return res.status(200).json({ message: 'Booking accepted' });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'An unknown error occurred' });
    }
});
exports.acceptBooking = acceptBooking;
const updateBookingStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield bookingService.updateBookingStatus(req.body.booking_id, req.body.status);
        return res.status(200).json({ message: 'Booking status updated' });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'An unknown error occurred' });
    }
});
exports.updateBookingStatus = updateBookingStatus;
const updateBookingRate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield bookingService.updateBookingRate(req.body.bookingId, req.body.rating);
        return res.status(200).json({ message: 'Booking rated' });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'An unknown error occurred' });
    }
});
exports.updateBookingRate = updateBookingRate;
