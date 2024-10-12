export interface Booking {
    id?: number;
    user_id: string;
    driver_id?: string;
    vehicle_id: string;
    pickup_location: string;
    dropoff_location: string;
    estimated_cost: number;
    status: 'pending' | 'accepted' | 'completed' | 'canceled';
    created_at?: Date;
    updated_at?: Date;
}
