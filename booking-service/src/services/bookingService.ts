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

    const pricingServiceUrl = 'http://localhost:5002/calculate-cost';
    const pricingResponse = await fetch(pricingServiceUrl, {
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
        const errorData = await pricingResponse.json();
        throw new Error(`Error fetching estimated cost: ${errorData.message}`);
    }

    const { estimated_cost } = await pricingResponse.json();

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
                estimated_cost,
            },
        ]);

    if (bookingError) {
        console.log('Booking Error', bookingError);
        throw new Error(`Error creating booking: ${bookingError.message}`);
    }
    console.log(bookingDataResult, driver, vehicle);

    const { error: vehicleUpdateError } = await supabase
        .from('vehicles')
        .update({ status: 'unavailable' })
        .eq('id', vehicle.id);

    if (vehicleUpdateError) {
        console.log('Vehicle Status Update Error', vehicleUpdateError);
        throw new Error(
            `Error updating vehicle status: ${vehicleUpdateError.message}`
        );
    }

    const { error: driverUpdateError } = await supabase
        .from('drivers')
        .update({ status: 'active' })
        .eq('id', driver.id);

    if (driverUpdateError) {
        console.log('Driver Status Update Error', driverUpdateError);
        throw new Error(
            `Error updating driver status: ${driverUpdateError.message}`
        );
    }

    const data = [driver, vehicle, estimated_cost];
    return data;
};

export const getBookingById = async (bookingId: number) => {
    const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .single();

    if (bookingError) {
        throw new Error(`Error fetching booking: ${bookingError.message}`);
    }

    const { driver_id, vehicle_id } = booking;

    const { data: driver, error: driverError } = await supabase
        .from('drivers')
        .select('*')
        .eq('id', driver_id)
        .single();

    if (driverError) {
        throw new Error(`Error fetching driver: ${driverError.message}`);
    }

    const { data: vehicle, error: vehicleError } = await supabase
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
};

export const getBookingsByUserId = async (user_id: number) => {
    const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user_id)
        .eq('status', 'pending');

    if (error) {
        throw new Error(`Error fetching bookings: ${error.message}`);
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
    console.log('Driver Id', driverId);
    const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('driver_id', driverId);

    if (error) {
        console.log(error);
        throw new Error(`Error fetching driver bookings: ${error.message}`);
    }

    return data;
};

export const acceptBooking = async (bookingId: number) => {
    const { error } = await supabase
        .from('bookings')
        .update({ status: 'On the way' })
        .eq('id', bookingId);

    if (error) {
        throw new Error(`Error accepting booking: ${error.message}`);
    }
}