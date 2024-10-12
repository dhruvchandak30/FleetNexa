export interface Booking {
    id?: number;
    userId: number;
    driverId?: number;
    vehicleId?: number;
    pickupLocation: string;
    dropoffLocation: string;
    bookingTime?: Date;
    status: string;
    estimatedCost: number;
}
