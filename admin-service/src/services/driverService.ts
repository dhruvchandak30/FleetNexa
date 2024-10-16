import { supabase } from '../config';
import { Driver } from '../models/driverModel';

export const createDriver = async (driverData: Driver) => {

    const { data, error } = await supabase
        .from('drivers')
        .insert([{
            name: driverData.name,
            email: driverData.email,
            password_hash: driverData.password_hash,
            phone_number: driverData.phone_number,
            status: driverData.status,
        }]);
    if (error){
        console.log(error);
        throw new Error(error.message);
    } 
    return data;
};

export const getAllDrivers = async () => {
    const { data, error } = await supabase
        .from('drivers')
        .select('*');
    if (error) throw new Error(error.message);
    return data;
};
