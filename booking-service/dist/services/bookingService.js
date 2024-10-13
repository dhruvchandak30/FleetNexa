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
exports.getDriverBookings = exports.getUserBookings = exports.updateBookingStatus = exports.getBookingById = exports.createBooking = void 0;
const supabaseClient_1 = require("../config/supabaseClient");
const createBooking = (bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, driver_id, vehicle_id, pickup_location, dropoff_location, estimated_cost, } = bookingData;
    const { data, error } = yield supabaseClient_1.supabase.from('bookings').insert([
        {
            user_id,
            driver_id,
            vehicle_id,
            pickup_location,
            dropoff_location,
            estimated_cost,
            status: 'pending',
            created_at: new Date(),
            updated_at: new Date(),
        },
    ]);
    if (error) {
        throw new Error(`Error creating booking: ${error.message}`);
    }
    return data;
});
exports.createBooking = createBooking;
const getBookingById = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabaseClient_1.supabase
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .single();
    if (error) {
        throw new Error(`Error fetching booking: ${error.message}`);
    }
    return data;
});
exports.getBookingById = getBookingById;
const updateBookingStatus = (bookingId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabaseClient_1.supabase
        .from('bookings')
        .update({ status, updated_at: new Date() })
        .eq('id', bookingId);
    if (error) {
        throw new Error(`Error updating booking status: ${error.message}`);
    }
    return data;
});
exports.updateBookingStatus = updateBookingStatus;
const getUserBookings = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabaseClient_1.supabase
        .from('bookings')
        .select('*')
        .eq('user_id', userId);
    if (error) {
        throw new Error(`Error fetching user bookings: ${error.message}`);
    }
    return data;
});
exports.getUserBookings = getUserBookings;
const getDriverBookings = (driverId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabaseClient_1.supabase
        .from('bookings')
        .select('*')
        .eq('driver_id', driverId);
    if (error) {
        throw new Error(`Error fetching driver bookings: ${error.message}`);
    }
    return data;
});
exports.getDriverBookings = getDriverBookings;
