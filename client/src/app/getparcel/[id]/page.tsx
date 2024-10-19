'use client';
import GetParcel from '@/components/Driver/GetParcel'
import React from 'react'
import { useParams } from 'next/navigation';

const page = () => {
    const params = useParams();
    const id = params.id;
    if (!id) {
        return <p className='pt-12 my-12'>Loading...</p>;
    }

  return (
    <div>
        <GetParcel id={Array.isArray(id) ? id[0] : id}/>
    </div>
  )
}

export default page