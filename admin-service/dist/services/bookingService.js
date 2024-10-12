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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBookings = exports.createBooking = void 0;
const config_1 = require("../config");
const createBooking = (bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield config_1.supabase
        .from('bookings')
        .insert([{
            user_id: bookingData.userId,
            driver_id: bookingData.driverId,
            vehicle_id: bookingData.vehicleId,
            pickup_location: bookingData.pickupLocation,
            dropoff_location: bookingData.dropoffLocation,
            booking_time: bookingData.bookingTime || new Date(),
            status: bookingData.status,
            estimated_cost: bookingData.estimatedCost,
        }]);
    if (error)
        throw new Error(error.message);
    return data;
});
exports.createBooking = createBooking;
const getAllBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield config_1.supabase
        .from('bookings')
        .select('*');
    if (error)
        throw new Error(error.message);
    return data;
});
exports.getAllBookings = getAllBookings;
