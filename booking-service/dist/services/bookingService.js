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
exports.acceptBooking = exports.getDriverBookings = exports.getUserBookings = exports.updateBookingStatus = exports.getBookingsByUserId = exports.getBookingById = exports.createBookingWithDriverAndVehicle = void 0;
const supabaseClient_1 = require("../config/supabaseClient");
const createBookingWithDriverAndVehicle = (bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(bookingData);
    const { user_id, pickup_location, dropoff_location, vehicle_type, booking_time, capacity, } = bookingData;
    const { data: driverData, error: driverError } = yield supabaseClient_1.supabase
        .from('drivers')
        .select('*')
        .eq('status', 'available')
        .limit(1);
    if (driverError || !driverData.length) {
        console.log(driverError);
        throw new Error('No available driver found.');
    }
    console.log('Driver Data', driverData);
    const driver = driverData[0];
    const { data: vehicleData, error: vehicleError } = yield supabaseClient_1.supabase
        .from('vehicles')
        .select('*')
        .gte('capacity', capacity.toString())
        .eq('type', vehicle_type)
        .eq('status', 'available')
        .order('capacity', { ascending: true });
    if (vehicleError || !vehicleData.length) {
        console.log(vehicleError);
        throw new Error('No matching vehicle found.');
    }
    console.log('Vehicle Data', vehicleData);
    const vehicle = vehicleData[0];
    const pricingServiceUrl = 'https://pricing-service-seven.vercel.app/calculate-cost';
    const pricingResponse = yield fetch(pricingServiceUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            pickup_location,
            dropoff_location,
        }),
    });
    if (!pricingResponse.ok) {
        const errorData = yield pricingResponse.json();
        throw new Error(`Error fetching estimated cost: ${errorData.message}`);
    }
    const { estimated_cost } = yield pricingResponse.json();
    const { data: bookingDataResult, error: bookingError } = yield supabaseClient_1.supabase
        .from('bookings')
        .insert([
        {
            user_id,
            pickup_location,
            dropoff_location,
            booking_time,
            status: 'pending',
            driver_id: driver.id,
            vehicle_id: vehicle.id,
            created_at: new Date(),
            updated_at: new Date(),
            estimated_cost,
        },
    ]);
    if (bookingError) {
        console.log('Booking Error', bookingError);
        throw new Error(`Error creating booking: ${bookingError.message}`);
    }
    console.log(bookingDataResult, driver, vehicle);
    const { error: vehicleUpdateError } = yield supabaseClient_1.supabase
        .from('vehicles')
        .update({ status: 'unavailable' })
        .eq('id', vehicle.id);
    if (vehicleUpdateError) {
        console.log('Vehicle Status Update Error', vehicleUpdateError);
        throw new Error(`Error updating vehicle status: ${vehicleUpdateError.message}`);
    }
    const { error: driverUpdateError } = yield supabaseClient_1.supabase
        .from('drivers')
        .update({ status: 'active' })
        .eq('id', driver.id);
    if (driverUpdateError) {
        console.log('Driver Status Update Error', driverUpdateError);
        throw new Error(`Error updating driver status: ${driverUpdateError.message}`);
    }
    const data = [driver, vehicle, estimated_cost];
    return data;
});
exports.createBookingWithDriverAndVehicle = createBookingWithDriverAndVehicle;
const getBookingById = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data: booking, error: bookingError } = yield supabaseClient_1.supabase
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .single();
    if (bookingError) {
        throw new Error(`Error fetching booking: ${bookingError.message}`);
    }
    const { driver_id, vehicle_id } = booking;
    const { data: driver, error: driverError } = yield supabaseClient_1.supabase
        .from('drivers')
        .select('*')
        .eq('id', driver_id)
        .single();
    if (driverError) {
        throw new Error(`Error fetching driver: ${driverError.message}`);
    }
    const { data: vehicle, error: vehicleError } = yield supabaseClient_1.supabase
        .from('vehicles')
        .select('*')
        .eq('id', vehicle_id)
        .single();
    if (vehicleError) {
        throw new Error(`Error fetching vehicle: ${vehicleError.message}`);
    }
    return {
        booking,
        driver,
        vehicle,
    };
});
exports.getBookingById = getBookingById;
const getBookingsByUserId = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield supabaseClient_1.supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user_id);
    if (error) {
        throw new Error(`Error fetching bookings: ${error.message}`);
    }
    return data;
});
exports.getBookingsByUserId = getBookingsByUserId;
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
    console.log('Driver Id', driverId);
    const { data, error } = yield supabaseClient_1.supabase
        .from('bookings')
        .select('*')
        .eq('driver_id', driverId);
    if (error) {
        console.log(error);
        throw new Error(`Error fetching driver bookings: ${error.message}`);
    }
    return data;
});
exports.getDriverBookings = getDriverBookings;
const acceptBooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield supabaseClient_1.supabase
        .from('bookings')
        .update({ status: 'On the way' })
        .eq('id', bookingId);
    if (error) {
        throw new Error(`Error accepting booking: ${error.message}`);
    }
});
exports.acceptBooking = acceptBooking;
