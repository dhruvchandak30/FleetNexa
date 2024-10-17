import { supabase } from '../config';
import { Booking } from '../models/bookingModel';

export const createBooking = async (bookingData: Booking) => {
    const { data, error } = await supabase.from('bookings').insert([
        {
            user_id: bookingData.userId,
            driver_id: bookingData.driverId,
            vehicle_id: bookingData.vehicleId,
            pickup_location: bookingData.pickupLocation,
            dropoff_location: bookingData.dropoffLocation,
            booking_time: bookingData.bookingTime || new Date(),
            status: bookingData.status,
            estimated_cost: bookingData.estimatedCost,
        },
    ]);
    if (error) throw new Error(error.message);
    return data;
};

export const getAllBookings = async () => {
    const { data, error } = await supabase.from('bookings').select('*');
    if (error) throw new Error(error.message);
    return data;
};
export const getBookingById = async (id: string) => {
    const { data, error } = await supabase
        .from('bookings')
        .select(
            `
            *,
            driver:drivers(*),
            vehicle:vehicles(*)
        `
        )
        .eq('id', id)
        .single();
    if (error) throw new Error(error.message);
    return data;
};

export const updateBookingStatus = async (id: string, status: string) => {
    const { data, error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);

    if (error) throw new Error(error.message);
    return data;
};
