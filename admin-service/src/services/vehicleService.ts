import { supabase } from '../config';
import { Vehicle } from '../models/vehicleModel';

export const createVehicle = async (vehicleData: Vehicle) => {
    const { data, error } = await supabase.from('vehicles').insert([
        {
            type: vehicleData.type,
            license_plate: vehicleData.license_plate,
            capacity: vehicleData.capacity,
        },
    ]);
    if (error) {
        console.log(error);
        throw new Error(error.message);
    }
    return data;
};

export const getAllVehicles = async () => {
    const { data, error } = await supabase.from('vehicles').select('*');
    if (error) throw new Error(error.message);
    return data;
};

export const updateVehicleStatus = async (
    vehicleId: number,
    status: string
) => {
    const { data, error } = await supabase
        .from('vehicles')
        .update({ status })
        .eq('id', vehicleId);
    if (error) throw new Error(error.message);
    return data;
};
