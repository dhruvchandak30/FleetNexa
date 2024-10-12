export interface Driver {
    id?: number;
    name: string;
    email: string;
    passwordHash: string;
    phoneNumber: string;
    vehicleId?: number;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}
