import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/components/Home/Navbar';
import Footer from '@/components/Home/Footer';

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
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
