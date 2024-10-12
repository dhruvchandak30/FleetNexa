import { supabase } from '../config';
import { Driver } from '../models/driverModel';

export const createDriver = async (driverData: Driver) => {
    const { data, error } = await supabase
        .from('drivers')
        .insert([{
            name: driverData.name,
            email: driverData.email,
            password_hash: driverData.passwordHash,
            phone_number: driverData.phoneNumber,
            vehicle_id: driverData.vehicleId,
            status: driverData.status,
            created_at: new Date(),
            updated_at: new Date(),
        }]);
    if (error) throw new Error(error.message);
    return data;
};

export const getAllDrivers = async () => {
    const { data, error } = await supabase
        .from('drivers')
        .select('*');
    if (error) throw new Error(error.message);
    return data;
};
