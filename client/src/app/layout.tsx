import type { Metadata } from 'next';
import './globals.css';
import 'leaflet/dist/leaflet.css';
import Navbar from '@/components/Home/Navbar';
import Footer from '@/components/Home/Footer';
import { UserProvider } from '@/context/UserContext';

export const metadata: Metadata = {
    title: 'Fleet Nexa',
    description: 'Reliable Logistics and Transportation',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={` antialiased`}>
                <UserProvider>
                    <Navbar />
                    {children}
                    <Footer />
                </UserProvider>
            </body>
        </html>
    );
}
