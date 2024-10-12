import { supabase } from '../config/supabaseClient';
import { Booking } from '../models/bookingModel';

export const createBooking = async (bookingData: Booking) => {
    const {
        user_id,
        driver_id,
        vehicle_id,
        pickup_location,
        dropoff_location,
        estimated_cost,
    } = bookingData;

    const { data, error } = await supabase.from('bookings').insert([
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
