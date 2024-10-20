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
exports.updateBookingStatus = exports.getBookingById = exports.getAllBookings = exports.createBooking = void 0;
const bookingService = __importStar(require("../services/bookingService"));
const createBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingData = yield bookingService.createBooking(req.body);
        res.status(201).json({ message: 'Booking created', data: bookingData });
    }
    catch (error) {
        res.status(400).json({ error: 'Error creating booking' });
    }
});
exports.createBooking = createBooking;
const getAllBookings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield bookingService.getAllBookings();
        res.status(200).json(bookings);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Error fetching bookings' + error });
    }
});
exports.getAllBookings = getAllBookings;
const getBookingById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingId = req.params.id;
        console.log('Booking Id', bookingId);
        const booking = yield bookingService.getBookingById(bookingId);
        if (booking) {
            res.status(200).json(booking);
        }
        else {
            res.status(404).json({ error: 'Booking not found' });
        }
    }
    catch (error) {
        res.status(400).json({ error: 'Error fetching booking' });
    }
});
exports.getBookingById = getBookingById;
const updateBookingStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, status } = req.body;
        console.log("Got Booking Status", id, status);
        if (!id || !status) {
            res.status(400).json({
                error: 'Missing required parameters: id or status',
            });
            return;
        }
        const updatedBooking = yield bookingService.updateBookingStatus(id, status);
        if (updatedBooking) {
            res.status(200).json({
                message: 'Booking status updated successfully',
                data: updatedBooking,
            });
        }
        else {
            res.status(404).json({ error: 'Booking not found' });
        }
    }
    catch (error) {
        res.status(400).json({ error: 'Error updating booking status' });
    }
});
exports.updateBookingStatus = updateBookingStatus;
