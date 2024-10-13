import { supabase } from '../config';
import { Vehicle } from '../models/vehicleModel';

export const createVehicle = async (vehicleData: Vehicle) => {
    const { data, error } = await supabase
        .from('vehicles')
        .insert([{
            type: vehicleData.type,
            license_plate: vehicleData.license_plate,
            capacity: vehicleData.capacity,
            driver_id: vehicleData.driver_id,
            created_at: new Date(),
            updated_at: new Date(),
        }]);
    if (error) throw new Error(error.message);
    return data;
};

export const getAllVehicles = async () => {
    const { data, error } = await supabase
        .from('vehicles')
        .select('*');
    if (error) throw new Error(error.message);
    return data;
};
