'use client';

import { useEffect, useState } from 'react';
import Head from "next/head";
import Carousel from "@/components/Carousel";
import ValueCard from "@/components/ValueCard";
import CompanyLogoDisplay from "@/components/CompanyLogoDisplay";
import Image from "next/image";

export default function Home() {
    const [scrollY, setScrollY] = useState(0);

    const carouselImages = [
        './images/s25reveal_v3.jpg',
        './images/eboard.JPG',
        './images/retreat_1.jpg',
        './images/snowboard.jpg',
        './images/sled.jpg',
        './images/gmerica.jpg',
        './images/basketball.jpg',
        './images/hike.jpg',
        './images/beach.jpg',

    ];

    useEffect(() => {
        // if URL is "/#about" (or has any "#about"), scroll there
        if (typeof window !== "undefined" && window.location.hash === "#about") {
            // give the DOM a moment to paint
            setTimeout(() => {
                document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" });
            }, 50);
        }
    }, []);

    useEffect(() => {
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.toggle('animate-in', entry.isIntersecting)
                }
                entry.target.classList.toggle('animate-in', entry.isIntersecting);
            });
        }, observerOptions);

        const elements = document.querySelectorAll('.fade-in-section');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const fadeDistance = 300; // tweak to taste
    const heroOpacity = 1 - Math.min(scrollY / fadeDistance, 1);

    return (
        <>
            <Head>
                <title>Theta Tau - SJSU</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="shortcut icon" href="/images/logo.png" type="image/x-icon" />
            </Head>

            <section className="relative flex flex-col justify-start pt-95 min-h-[80vh] md:min-h-screen font-sans overflow-hidden">
                <div className="fixed inset-0 -z-20">
                    <Image
                        src="/images/group.jpg"
                        alt=""
                        fill
                        priority
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                        aria-hidden="true"
                    />
                </div>

                <div className="fixed inset-0 -z-10 bg-black/60 pointer-events-none" />

                <div
                    className="relative z-0 max-w-[1100px] px-5 sm:px-8 md:px-12 lg:px-20 pt-2 sm:pt-4 md:pt-6 lg:pt-8 transition-transform duration-75 text-left"
                    style={{
                        transform: `translateY(${scrollY * 0.5}px)`,
                        opacity: heroOpacity,
                    }}
                >
                    <h1 className="text-white leading-[0.9] text-[clamp(2.5rem,12vw,7rem)] sm:text-[clamp(3rem,10vw,7rem)] md:text-[clamp(3rem,8vw,7rem)] font-bold tracking-tight animate-fade-in-up">
                        THETA TAU
                    </h1>
                    <p
                        className="mt-2 sm:mt-3 md:mt-4 text-white text-[1.1rem] sm:text-[1.25rem] md:text-[1.75rem] lg:text-[2rem] font-thin leading-tight tracking-tight animate-fade-in-up animation-delay-800"
                    >
                        Premier Professional <span className="font-semibold">CO-ED</span> Engineering
                        <br />Fraternity at San José State
                    </p>
                </div>
                <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>

            <section id="about" className="min-h-[300px] flex items-center bg-[#141416] text-white py-10 pb-32">
                <div className="max-w-[1100px] mx-auto px-4 w-full fade-in-section opacity-0">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8">
                        <div className="flex-1 w-full md:max-w-[50%] text-left slide-in-left">
                            <div className="grid grid-rows-[40px_auto]">
                                <h2 className="text-[#fecb33] font-thin mb-2 text-2xl">WHO ARE WE</h2>
                                <p className="text-[#787e91] text-base">
                                    Theta Tau is a co-ed professional engineering fraternity at
                                    SJSU, built on fostering strong bonds among members. We strive
                                    to support professional growth while making a positive impact
                                    on our community.
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 w-full md:max-w-[50%] slide-in-right">
                            <Carousel images={carouselImages} />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-4 bg-[#18181a] pb-32">
                <div className="max-w-6xl mx-auto px-4 fade-in-section opacity-0">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8">
                        <div className="flex-1 w-full md:max-w-[50%] text-left slide-in-left">
                            <div className="grid grid-rows-[40px_auto]">
                                <h2 className="text-[#fecb33] font-thin mb-2 text-2xl">
                                    WHERE WE&rsquo;VE WORKED
                                </h2>
                                <p className="text-[#787e91] text-base">
                                    We strive to provide our brothers with the resources they need to accomplish their professional goals,
                                    and further their careers. Whether it&rsquo;s through recruiter mock interviews, resume workshops, or networking
                                    opportunities, the Omega Epsilon Chapter of Theta Tau here at San Jose State is committed to providing the best
                                    tools and support for our brothers to succeed in their professional endeavors.
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 w-full md:max-w-[100%] slide-in-right">
                            <CompanyLogoDisplay />
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="py-16 pb-32 bg-[#141416]">
                <div className="max-w-6xl mx-auto px-4 fade-in-section opacity-0">
                    <div className="flex flex-col gap-8">
                        <h1 className="text-[#fecb33] font-thin text-2xl mb-4 text-center">OUR VALUES</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="value-card-animation flex flex-col items-center p-8 bg-[#141416] rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                                <p className="text-5xl font-bold text-[#e4e4e4] mb-4">01.</p>
                                <h3 className="text-2xl font-bold text-[#e4e4e4] mb-2">Brotherhood</h3>
                                <p className="text-base text-[#787e91] leading-relaxed text-center">
                                    We forge lifelong friendships and a network of professional
                                    relationships.
                                </p>
                            </div>

                            <div className="value-card-animation flex flex-col items-center p-8 bg-[#141416] rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300" style={{ animationDelay: '0.2s' }}>
                                <p className="text-5xl font-bold text-[#e4e4e4] mb-4">02.</p>
                                <h3 className="text-2xl font-bold text-[#e4e4e4] mb-2">Community Service</h3>
                                <p className="text-base text-[#787e91] leading-relaxed text-center">
                                    Our service projects create an environment for learning and
                                    personal growth for our members.
                                </p>
                            </div>

                            <div className="value-card-animation flex flex-col items-center p-8 bg-[#141416] rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300" style={{ animationDelay: '0.4s' }}>
                                <p className="text-5xl font-bold text-[#e4e4e4] mb-4">03.</p>
                                <h3 className="text-2xl font-bold text-[#e4e4e4] mb-2">Professionalism</h3>
                                <p className="text-base text-[#787e91] leading-relaxed text-center">
                                    We develop and nurture engineers with strong communication,
                                    problem-solving, and leadership skills.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brotherhood Section */}
            <section className="py-12 pb-32 bg-[#18181a]">
                <div className="max-w-6xl mx-auto px-4 fade-in-section opacity-0">
                    <div className="flex flex-col gap-8">
                        <h1 className="text-[#fecb33] font-thin text-2xl mb-4 slide-in-left">BROTHERHOOD</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="stagger-animation">
                                <ValueCard
                                    frontImage="/images/mu-class.jpg"
                                    title="PNM Classes"
                                    description="Potential New Members are put into classes to learn, grow, and bond with each other!"
                                />
                            </div>
                            <div className="stagger-animation" style={{ animationDelay: '0.1s' }}>
                                <ValueCard
                                    frontImage="/images/helena&jaden.jpg"
                                    title="Big Brothers"
                                    description="Each Potential New Member is matched with a Big Brother that can provide mentorship and foster a deeper friendship!"
                                />
                            </div>
                            <div className="stagger-animation" style={{ animationDelay: '0.2s' }}>
                                <ValueCard
                                    frontImage="/images/fam2.jpg"
                                    title="Families"
                                    description="Our chapter is broken up into four families, each descending from a founding brother of Omega Epsilon Chapter.
                                Each family provides a closer-knit community for brothers to connect and bond with."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Professionalism Section */}
            <section className="py-12 pb-32 bg-[#141416]">
                <div className="max-w-6xl mx-auto px-4 fade-in-section opacity-0">
                    <div className="flex flex-col gap-8">
                        <h1 className="text-[#fecb33] font-thin text-2xl mb-4 slide-in-left">PROFESSIONALISM</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="stagger-animation">
                                <ValueCard
                                    frontImage="/images/goats.jpg"
                                    title="Alumni Network"
                                    description="Our organization connects you with an extensive alumni network, offering valuable mentorship, career guidance, and professional opportunities to support your growth and success."
                                />
                            </div>
                            <div className="stagger-animation" style={{ animationDelay: '0.1s' }}>
                                <ValueCard
                                    frontImage="/images/intern.jpg"
                                    title="Internships & Jobs"
                                    description="Our organization provides personalized internship and job support, offering career advice, resume guidance, and interview preparation to help you secure professional opportunities."
                                />
                            </div>
                            <div className="stagger-animation" style={{ animationDelay: '0.2s' }}>
                                <ValueCard
                                    frontImage="/images/mock.jpg"
                                    title="Mock Interviews"
                                    description="Our organization conducts mock interviews to build your confidence, sharpen your communication skills, and prepare you for professional success."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Community Service Section */}
            <section className="py-12 pb-32 bg-[#18181a]">
                <div className="max-w-6xl mx-auto px-4 fade-in-section opacity-0">
                    <div className="flex flex-col gap-8">
                        <h1 className="text-[#fecb33] font-thin text-2xl mb-4 slide-in-left">COMMUNITY SERVICE</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="stagger-animation">
                                <ValueCard
                                    frontImage="/images/painting.jpeg"
                                    title="Mural Painting"
                                    description="This was for a mural painting project in the San Jose community, bringing creativity and color to the area. We even got to personally work with and meet the mayor!"
                                />
                            </div>
                            <div className="stagger-animation" style={{ animationDelay: '0.1s' }}>
                                <ValueCard
                                    frontImage="/images/food_drive.jpg"
                                    title="Food Drives"
                                    description="This was from our food drive event, where our members sorted 3,742 pounds of food for Second Harvest of Silicon Valley, making a real impact in the community!"
                                />
                            </div>
                            <div className="stagger-animation" style={{ animationDelay: '0.2s' }}>
                                <ValueCard
                                    frontImage="/images/pickup.jpg"
                                    title="Community Clean-ups"
                                    description="This was from our creek cleanup event, where our members joined forces to restore and beautify the local environment. Engineers do go outside!"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes slideInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }

            @keyframes scaleIn {
                from {
                    opacity: 0;
                    transform: scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            .animate-fade-in-up {
                opacity: 0;
                animation: fadeInUp 1.2s ease-out forwards;
            }
            
            .animation-delay-800 {
                animation-delay: 0.8s;
            }
            
            .animation-delay-1200 {
                animation-delay: 1.2s;
            }

            .fade-in-section {
                opacity: 0;
                transition: opacity 0.6s ease-out;
            }

            .fade-in-section.animate-in {
                opacity: 1 !important;
            }

            .slide-in-left {
                opacity: 0;
                animation: slideInLeft 0.8s ease-out forwards;
            }

            .slide-in-right {
                opacity: 0;
                animation: slideInRight 0.8s ease-out forwards;
            }

            .animate-in .slide-in-left {
                animation-play-state: running;
            }

            .animate-in .slide-in-right {
                animation-play-state: running;
            }

            .value-card-animation {
                opacity: 0;
                animation: scaleIn 0.6s ease-out forwards;
                animation-play-state: paused;
            }

            .animate-in .value-card-animation {
                animation-play-state: running;
            }

            .stagger-animation {
                opacity: 0;
                animation: fadeInUp 0.6s ease-out forwards;
                animation-play-state: paused;
            }

            .animate-in .stagger-animation {
                animation-play-state: running;
            }

            @media (prefers-reduced-motion: reduce) {
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            }
        `}</style>
        </>
    );
}