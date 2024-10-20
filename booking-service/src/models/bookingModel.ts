export interface Booking {
    id?: number;
    user_id: string;
    driver_id?: string;
    vehicle_id: string;
    pickup_location: JSON;
    dropoff_location: JSON;
    estimated_cost?: number;
    vehicle_type: string;
    booking_time: Date;
    capacity: number;
    status: 'pending' | 'accepted' | 'completed' | 'canceled';
    created_at?: Date;
    updated_at?: Date;
}
