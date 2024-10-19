import Image from 'next/image';
import vivacity from '@/assets/Vivacity.png';
import webrtc from '@/assets/webrtc.jpeg';
import dhruv from '@/assets/dhruv.jpg';
import lnmiit from '@/assets/lnmiit.jpg';
import leadcatalyst from '@/assets/snipowl.png';
import payment from '@/assets/payment.jpeg';

const Contact = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#d2eae5] pt-12 to-[#ead9ce] flex items-center justify-center">
            <div className="max-w-4xl w-full bg-white p-10 rounded-lg shadow-lg">
                <div className="flex flex-col items-center space-y-4">
                    <Image
                        src={dhruv.src}
                        alt="Dhruv Chandak"
                        width={150}
                        height={150}
                        className=" rounded-3xl shadow-md"
                    />
                    <h1 className="text-4xl font-bold text-[#A9592C]">
                        Dhruv Chandak
                    </h1>
                    <p className="text-black text-lg text-center">
                        Software Engineer | Nagpur, India
                    </p>
                </div>

                <div className="mt-10 space-y-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-black">
                            Contact Information
                        </h2>
                        <p className="text-black">
                            <strong>Email:</strong> dhruvchandak5@gmail.com{' '}
                            <br />
                            <strong>Phone:</strong> +91 94055914xx
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                            <h2 className="text-2xl font-semibold text-black">
                                GitHub
                            </h2>
                            <a
                                href="https://github.com/dhruvchandak30"
                                className="text-[#A9592C] hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                github.com/dhruvchandak30
                            </a>
                        </div>
                        <div className="text-center">
                            <h2 className="text-2xl font-semibold text-black">
                                LinkedIn
                            </h2>
                            <a
                                href="https://linkedin.com/in/dhruvchandak30"
                                className="text-[#A9592C] hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                linkedin.com/in/dhruvchandak30
                            </a>
                        </div>
                        <div className="text-center col-span-2">
                            <h2 className="text-2xl font-semibold text-black">
                                Portfolio
                            </h2>
                            <a
                                href="https://dhruv-chandak.vercel.app"
                                className="text-[#A9592C] hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                dhruv-chandak.vercel.app
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="text-2xl font-semibold text-black text-center mb-6">
                        Internships
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col items-center">
                            <Image
                                src={leadcatalyst.src}
                                alt="Lead Catalyst Tech LLP"
                                width={300}
                                height={200}
                                className="rounded-lg shadow-md"
                            />
                            <p className="text-black text-lg mt-4 text-center">
                                <strong>
                                    Lead Catalyst Tech LLP (Aug 2024 - Present)
                                </strong>
                                <br />
                                Revamped UI, integrated AI, and boosted customer
                                acquisition by 5x.
                            </p>
                        </div>

                        <div className="flex flex-col items-center">
                            <Image
                                src={lnmiit.src}
                                alt="LNMIIT Summer Internship"
                                width={300}
                                height={200}
                                className="rounded-lg shadow-md"
                            />
                            <p className="text-black text-lg mt-4 text-center">
                                <strong>LNMIIT (May 2024 - July 2024)</strong>
                                <br />
                                Developed a project management platform used by
                                over 2,000 users.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="text-2xl font-semibold text-black text-center mb-6">
                        Projects
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col items-center">
                            <Image
                                src={payment.src}
                                alt="Payment Application"
                                width={300}
                                height={200}
                                className="rounded-lg shadow-md"
                            />
                            <p className="text-black text-lg mt-4 text-center">
                                <a
                                    href="https://payment-software.vercel.app/"
                                    className="text-[#A9592C] hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Payment Application
                                </a>
                                <br />
                                Quick money transfers with wallet funding and
                                database integrity.
                            </p>
                        </div>

                        <div className="flex flex-col items-center">
                            <Image
                                src={webrtc.src}
                                alt="Real-Time Video Communication"
                                width={300}
                                height={200}
                                className="rounded-lg shadow-md"
                            />
                            <p className="text-black text-lg mt-4 text-center">
                                <a
                                    href="https://webrtc-ts.vercel.app"
                                    className="text-[#A9592C] hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Real-Time Video Communication
                                </a>
                                <br />
                                Peer-to-peer video chat with camera control and
                                group scalability.
                            </p>
                        </div>

                        <div className="flex flex-col items-center">
                            <Image
                                src={vivacity.src}
                                alt="Vivacity Cultural Fest Website"
                                width={300}
                                height={200}
                                className="rounded-lg shadow-md"
                            />
                            <p className="text-black text-lg mt-4 text-center">
                                <a
                                    href="https://vivacity.live"
                                    className="text-[#A9592C] hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Vivacity Cultural Fest Website
                                </a>
                                <br />
                                Built the LNMIIT cultural fest site (MERN Stack)
                                with 40,000 hits in the first week.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
