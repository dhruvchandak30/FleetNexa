export interface Driver {
    id?: number;
    name: string;
    email: string;
    password_hash: string;
    phone_number: string;
    vehicle_id?: number;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}
