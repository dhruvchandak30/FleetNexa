import BookingDetails from '@/components/Bookings/IndividualBooking';

const Page = ({ params }: { params: { id: string } }) => {
    return (
        <div>
            <BookingDetails id={params.id} />
        </div>
    );
};

export default Page;
