'use client';

import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";

export default function SponsorshipPage() {
    const [scrollY, setScrollY] = useState(0);

    /* ---------------- Scroll Tracking ---------------- */
    useEffect(() => {
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* ---------------- Intersection Animations ---------------- */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    entry.target.classList.toggle("animate-in", entry.isIntersecting);
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
        );


        document.querySelectorAll(".fade-in-section").forEach((el) => observer.observe(el));
        return () => observer.disconnect();


    }, []);

    const fadeDistance = 300;
    const heroOpacity = 1 - Math.min(scrollY / fadeDistance, 1);

    return (
        <> <Head> <title>Sponsorship | Theta Tau - SJSU</title> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> </Head>

            <section className="relative flex flex-col justify-center min-h-[70vh] font-sans overflow-hidden">
                <div className="fixed inset-0 -z-20">
                    <Image
                        src="/images/group.jpg"
                        alt=""
                        fill
                        priority
                        style={{ objectFit: "cover" }}
                    />
                </div>

                <div className="fixed inset-0 -z-10 bg-black/70" />

                <div
                    className="relative z-10 max-w-[1100px] px-6 md:px-12 transition-transform duration-75"
                    style={{
                        transform: `translateY(${scrollY * 0.5}px)`,
                        opacity: heroOpacity,
                    }}
                >
                    <h1 className="text-white text-[clamp(3rem,8vw,6rem)] font-bold tracking-tight animate-fade-in-up">
                        PARTNER WITH US
                    </h1>
                    <p className="text-white text-xl font-light mt-4 animate-fade-in-up animation-delay-800">
                        Invest in the next generation of engineers, innovators, and leaders.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-[#141416] text-white">
                <div className="max-w-5xl mx-auto px-6 fade-in-section opacity-0">
                    <h2 className="text-[#fecb33] text-3xl font-thin mb-6">WHY SPONSOR?</h2>
                    <p className="text-[#787e91] leading-relaxed text-lg">
                        Theta Tau at San José State University connects driven engineering students
                        with industry leaders. Sponsorship enables us to host professional development
                        workshops, technical projects, community outreach, and networking events that
                        prepare students for impactful careers.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-[#18181a]">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center fade-in-section opacity-0">
                    {[
                        { number: "60+", label: "Active Members" },
                        { number: "200+", label: "Alumni Network" },
                        { number: "10+", label: "Annual Professional Events" },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="p-8 bg-[#141416] rounded-lg shadow-lg hover:scale-105 transition-all"
                        >
                            <p className="text-5xl text-[#fecb33] font-bold mb-3">{item.number}</p>
                            <p className="text-[#787e91]">{item.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-20 bg-[#141416]">
                <div className="max-w-6xl mx-auto px-6 fade-in-section opacity-0">
                    <h2 className="text-[#fecb33] text-3xl font-thin mb-10 text-center">
                        SPONSORSHIP TIERS
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Gold Sponsor",
                                perks: [
                                    "Priority access to recruiting events",
                                    "Company logo on all materials",
                                    "Exclusive workshop collaboration",
                                    "Direct engagement with members",
                                ],
                            },
                            {
                                title: "Silver Sponsor",
                                perks: [
                                    "Resume book access",
                                    "Networking event invitations",
                                    "Brand visibility at events",
                                ],
                            },
                            {
                                title: "Bronze Sponsor",
                                perks: [
                                    "Recognition on website",
                                    "Support student initiatives",
                                    "Community impact visibility",
                                ],
                            },
                        ].map((tier, i) => (
                            <div
                                key={i}
                                className="p-8 bg-[#18181a] rounded-lg shadow-lg hover:shadow-2xl transition"
                            >
                                <h3 className="text-2xl text-white mb-4 font-semibold">{tier.title}</h3>
                                <ul className="text-[#787e91] space-y-2">
                                    {tier.perks.map((perk, j) => (
                                        <li key={j}>• {perk}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-32 relative overflow-hidden bg-[#18181a]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#fecb33]/10 blur-[120px] rounded-full -z-10" />

                <div className="max-w-4xl mx-auto px-6 text-center fade-in-section opacity-0">
                    <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-[#fecb33]/30 bg-[#fecb33]/5 text-[#fecb33] text-sm tracking-wider uppercase font-medium">
                        Get In Touch
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
                        Let’s Build the <span className="text-[#fecb33]">Future</span> Together
                    </h2>
                    <p className="text-[#787e91] text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                        We welcome partnerships that empower students, foster innovation, and strengthen industry connections. Join us in shaping the next generation of engineering leaders.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <a
                            href="mailto:sjsuthetatau@gmail.com"
                            className="group relative px-10 py-5 bg-[#fecb33] text-black rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(254,203,51,0.3)] hover:shadow-[0_0_30px_rgba(254,203,51,0.5)]"
                        >
                            Become a Sponsor
                        </a>
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

    .animate-fade-in-up {
      opacity: 0;
      animation: fadeInUp 1.2s ease-out forwards;
    }

    .animation-delay-800 {
      animation-delay: 0.8s;
    }

    .fade-in-section {
      opacity: 0;
      transition: opacity 0.6s ease-out;
    }

    .fade-in-section.animate-in {
      opacity: 1 !important;
    }
  `}</style>
        </>


    );
}
