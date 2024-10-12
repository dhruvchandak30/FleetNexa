import AboutUs from '@/components/Home/AboutUs';
import ChooseUs from '@/components/Home/ChooseUs';
import Hero from '@/components/Home/Hero';
import Navbar from '@/components/Home/Navbar';
import OurClients from '@/components/Home/OurClients';
import OurServices from '@/components/Home/OurServices';
export default function Home() {
    return (
        <div>
            <Hero />
            <AboutUs />
            <OurClients />
            <OurServices />
            <ChooseUs />
        </div>
    );
}
