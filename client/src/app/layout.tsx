import type { Metadata } from 'next';
import './globals.css';
import 'leaflet/dist/leaflet.css';
import Navbar from '@/components/Home/Navbar';
import Footer from '@/components/Home/Footer';
import { UserProvider } from '@/context/UserContext';

export const metadata: Metadata = {
    title: 'Fleet Nexa | On-Demand Logistics and Transportation',
    description:
        'Fleet Nexa provides reliable and efficient logistics services for transporting goods with real-time tracking and seamless bookings.',
    keywords:
        'logistics, transportation, fleet management, goods transport, real-time tracking, delivery service, logistics platform',
    openGraph: {
        title: 'Fleet Nexa | On-Demand Logistics and Transportation',
        description:
            'Move goods quickly and easily with Fleet Nexa, offering reliable logistics services with real-time tracking and seamless bookings.',
        url: 'https://fleet-nexa.vercel.app',
        images: [
            {
                url: '/assets/delivery-boy.png',
                width: 800,
                height: 600,
                alt: 'Fleet Nexa - Reliable Goods Transportation',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Fleet Nexa | On-Demand Logistics and Transportation',
        description:
            'Book your transport service and track goods in real-time with our efficient logistics platform.',
        images: ['/assets/delivery-boy.png'],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />

                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />

                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

                <link rel="manifest" href="/site.webmanifest" />
            </head>
            <body className={`antialiased`}>
                <UserProvider>
                    <Navbar />
                    {children}
                    <Footer />
                </UserProvider>
            </body>
        </html>
    );
}
