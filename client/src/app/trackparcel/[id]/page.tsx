'use client';
import { useParams } from 'next/navigation';
import TrackingParcel from '@/components/RTTS/TrackingParcel';

export default function Page() {
    const params = useParams();
    const id = params.id;

    if (!id) {
        return <p className="pt-12 my-12">Loading...</p>;
    }

    return <TrackingParcel id={Array.isArray(id) ? id[0] : id} />;
}
