"use client";

import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useEffect, useRef, useState } from 'react';
import Image from "next/image";

const heroBackgroundImages = [
        '/images/rush.jpg',
        '/images/rush_kyle.JPG',
        '/images/rush_grp.JPG',
        '/images/rush_logan.JPG',
        '/images/rush_kylie.JPG',
    ];

export default function RushPage() {
    const [scrollY, setScrollY] = useState(0);
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    const contentSectionRef = useRef<HTMLDivElement>(null);
    const fadeDistance = 300; // tweak to taste
    const heroOpacity = 1 - Math.min(scrollY / fadeDistance, 1);

    useEffect(() => {
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Auto-cycle background images
    useEffect(() => {
        const interval = setInterval(() => {
            setBackgroundIndex((prevIndex) => (prevIndex + 1) % heroBackgroundImages.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Small delay to ensure CSS is loaded
        const timer = setTimeout(() => {
            // Handle timeline animations
            const items = document.querySelectorAll<
            HTMLElement
            >('.vertical-timeline-element--work');

            const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
                });
            },
            { threshold: 0.2 }
            );

            items.forEach((el) => io.observe(el));

            // Handle content section fade-in
            const fadeObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                        }
                    });
                },
                { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
            );

            if (contentSectionRef.current) {
                fadeObserver.observe(contentSectionRef.current);
            }

            // Store observers for cleanup
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).__observers = { io, fadeObserver };
        }, 100);

        return () => {
            clearTimeout(timer);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const observers = (window as any).__observers;
            if (observers) {
                observers.io.disconnect();
                observers.fadeObserver.disconnect();
            }
        };
    }, []);

    return (
        <>
            <style jsx>{`
                .fade-in-section {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                }
                
                .fade-in-section.visible {
                    opacity: 1;
                    transform: translateY(0);
                }

                .slide-in-right {
                    opacity: 0;
                    transform: translateX(30px);
                    transition: opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s;
                }

                .fade-in-section.visible .slide-in-right {
                    opacity: 1;
                    transform: translateX(0);
                }

                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 1s ease-out;
                }

                .vertical-timeline-element--work {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
                }

                .vertical-timeline-element--work.in-view {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>

            <section className="relative flex flex-col justify-center items-center min-h-[92vh] font-sans overflow-hidden">
                <div className="fixed inset-0 -z-20">
                    {heroBackgroundImages.map((image, idx) => (
                        <div
                            key={idx}
                            className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
                            style={{
                                opacity: idx === backgroundIndex ? 1 : 0,
                            }}
                        >
                            <Image
                                src={image}
                                alt=""
                                fill
                                priority={idx === 0}
                                style={{ objectFit: 'cover', objectPosition: 'center' }}
                                aria-hidden="true"
                            />
                        </div>
                    ))}
                </div>
    
                <div className="fixed inset-0 -z-10 bg-black/60 pointer-events-none" />
    
                <div
                    className="relative z-0 max-w-[1100px] transition-transform duration-75 text-left"
                    style={{ 
                        transform: `translateY(${scrollY * 0.5}px)`,
                        opacity: heroOpacity,
                    }}
                >
                    <h1 className="text-white leading-[0.9] text-[clamp(2.5rem,12vw,7rem)] sm:text-[clamp(3rem,10vw,7rem)] md:text-[clamp(3rem,8vw,7rem)] font-thin tracking-tight animate-fade-in-up">
                    RECRUITMENT
                    </h1>
                </div>      
                {/* Scroll Indicator */}
                <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>

            <section className="min-h-[300px] flex items-center bg-[#141416] text-white py-10">
                <div 
                    ref={contentSectionRef}
                    className="max-w-[1100px] mx-auto px-4 w-full fade-in-section"
                >
                    <div className="flex flex-col items-center justify-between gap-8 py-8">
                        <div className="flex-1 w-full md:max-w-[50%] items-center">
                            <div className="grid grid-rows-[40px_auto] items-center">
                                <div className='text-center'>
                                    <h2 className="text-[#fecb33] font-thin mb-2 text-2xl">WHAT IS RUSH</h2>
                                </div>
                                <div className='text-left ml-4'>
                                    <p className="text-[#787e91] text-base">
                                    Rush is an opportunity for students to learn more about Theta Tau. 
                                    It consists of multiple events that will give you a taste of what our fraternity stands for, whether you are a good fit for us, and whether we are a good fit for you. 
                                    At the end of rush, we extend a limited number of interviews and bids. 
                                    Those who receive bids can then decide whether or not they would like to pledge. 
                                    Rushing is completely free of charge and there are no obligations.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="py-16 bg-[#18181a]">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-[#fecb33] font-semibold text-3xl mb-10 text-center">Rush Week Timeline</h2>
                        <VerticalTimeline lineColor="#fecb33">
                            <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                contentStyle={{ background: "#18181a", color: "#e4e4e4", borderTop: "4px solid #fecb33" }}
                                contentArrowStyle={{ borderRight: "7px solid #18181a" }}
                                iconStyle={{ background: "#fecb33", color: "#18181a" }}
                            >
                                <h3 className="vertical-timeline-element-title font-bold text-lg">Information Night #1</h3>
                                <h4 className='italic'>August 25th, 2025</h4>
                                <p>
                                Meet the brothers and learn about Theta Tau! <br />
                                Time and Location TBD
                                </p>
                            </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                contentStyle={{ background: "#18181a", color: "#e4e4e4", borderTop: "4px solid #fecb33" }}
                                contentArrowStyle={{ borderRight: "7px solid #18181a" }}
                                iconStyle={{ background: "#fecb33", color: "#18181a" }}
                            >
                                <h3 className="vertical-timeline-element-title font-bold text-lg">Innovation Night</h3>
                                <h4 className='italic'>August 27th, 2025</h4>
                                <p>
                                Activities with fellow Rushees and Actives!<br />
                                Time and Location TBD
                                </p>
                            </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                contentStyle={{ background: "#18181a", color: "#e4e4e4", borderTop: "4px solid #fecb33" }}
                                contentArrowStyle={{ borderRight: "7px solid #18181a" }}
                                iconStyle={{ background: "#fecb33", color: "#18181a" }}
                            >
                                <h3 className="vertical-timeline-element-title font-bold text-lg">Professional Night</h3>
                                <h4 className='italic'>August 28th, 2025</h4>
                                <p>
                                Workshop and network with Theta Tau Actives!<br />
                                Time and Location TBD
                                </p>
                            </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                contentStyle={{ background: "#18181a", color: "#e4e4e4", borderTop: "4px solid #fecb33" }}
                                contentArrowStyle={{ borderRight: "7px solid #18181a" }}
                                iconStyle={{ background: "#fecb33", color: "#18181a" }}
                            >
                                <h3 className="vertical-timeline-element-title font-bold text-lg">Information Night #2</h3>
                                <h4 className='italic'>August 31st, 2025</h4>
                                <p>
                                Makeup Information Night to learn about Theta Tau.<br />
                                Time and Location TBD
                                </p>
                            </VerticalTimelineElement>
                            <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                contentStyle={{ background: "#18181a", color: "#e4e4e4", borderTop: "4px solid #fecb33" }}
                                contentArrowStyle={{ borderRight: "7px solid #18181a" }}
                                iconStyle={{ background: "#fecb33", color: "#18181a" }}
                            >
                                <h3 className="vertical-timeline-element-title font-bold text-lg">Meet the Brothers</h3>
                                <h4 className='italic'>September 3rd, 2025</h4>
                                <p>
                                Mingle and talk with the Actives of Theta Tau!<br />
                                Time and Location TBD
                                </p>
                            </VerticalTimelineElement>
                    </VerticalTimeline>
                </div>
            </section>
        </>
    )
}