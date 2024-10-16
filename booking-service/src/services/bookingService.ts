import { supabase } from '../config/supabaseClient';
import { Booking } from '../models/bookingModel';

export const createBookingWithDriverAndVehicle = async (
    bookingData: Booking
) => {
    console.log(bookingData);
    const {
        user_id,
        pickup_location,
        dropoff_location,
        vehicle_type,
        booking_time,
        capacity,
    } = bookingData;

    const { data: driverData, error: driverError } = await supabase
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

    const { data: vehicleData, error: vehicleError } = await supabase
        .from('vehicles')
        .select('*')
        .eq('capacity', capacity)
        .eq('type', vehicle_type)
        .limit(1);

    if (vehicleError || !vehicleData.length) {
        console.log(vehicleError);
        throw new Error('No matching vehicle found.');
    }
    console.log('vehicle Data', vehicleData);

    const vehicle = vehicleData[0];

    const { data: bookingDataResult, error: bookingError } = await supabase
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
                estimated_cost: 0,
            },
        ]);

    if (bookingError) {
        console.log('Booking Error', bookingError);
        throw new Error(`Error creating booking: ${bookingError.message}`);
    }
    console.log(bookingDataResult, driver, vehicle);
    return bookingDataResult;
};

export const getBookingById = async (bookingId: number) => {
    const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .single();

    if (error) {
        throw new Error(`Error fetching booking: ${error.message}`);
    }

    return data;
};

export const updateBookingStatus = async (
    bookingId: number,
    status: string
) => {
    const { data, error } = await supabase
        .from('bookings')
        .update({ status, updated_at: new Date() })
        .eq('id', bookingId);

    if (error) {
        throw new Error(`Error updating booking status: ${error.message}`);
    }

    return data;
};

export const getUserBookings = async (userId: number) => {
    const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', userId);

    if (error) {
        throw new Error(`Error fetching user bookings: ${error.message}`);
    }

    return data;
};

export const getDriverBookings = async (driverId: number) => {
    const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('driver_id', driverId);

    if (error) {
        throw new Error(`Error fetching driver bookings: ${error.message}`);
    }

    return data;
};
