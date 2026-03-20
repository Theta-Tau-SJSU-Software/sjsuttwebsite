"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import logo from "../../public/images/logo.png";
import { useRouter, usePathname } from "next/navigation";

const NAV_ITEMS = ["about", "brothers", "rush", "FAQ", "careers", "sponsorship"];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // toggle mobile menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // close mobile menu on resize ≥ md
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // track scroll direction
  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      // show if scrolling up OR near top of page
      setShowNav(y < lastY || y < 50);
      lastY = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAboutClick = (e: React.MouseEvent) => {
    // already on home?
    if (pathname === "/") {
      e.preventDefault();
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // navigate to home with hash
      router.push("/#about");
    }
    setMenuOpen(false);
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        bg-[#141416] py-4 px-6
        transition-opacity duration-300 ease-in-out
        ${showNav ? "opacity-100" : "opacity-0"}
      `}
    >
      <div className="max-w-[1100px] mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="logo" width={30} height={30} className="mr-2" />
          <div className="inline-flex flex-col font-semibold">
            <span className="text-white">THETA TAU</span>
            <span className="text-[#fecb33] text-[10px]">Omega Epsilon</span>
          </div>
        </Link>

        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Desktop menu */}
          <ul className="hidden md:flex items-center space-x-6 text-white">
            {NAV_ITEMS.map((path) => {
            if (path === "about") {
              return (
                <li key="about">
                  <Link
                    href="/#about"
                    scroll={false}
                    onClick={handleAboutClick}
                    className="hover:text-[#fecb33]"
                  >
                    About
                  </Link>
                </li>
              );
            }
            return (
              <li key={path}>
                <Link href={`/${path}`} onClick={() => setMenuOpen(false)} className="hover:text-[#fecb33]">
                  {path[0].toUpperCase() + path.slice(1)}
                </Link>
              </li>
            );
          })}
          <li className="relative group">
            <Link href="#" className="px-4 py-2 bg-[#e2e8f0] text-[#94a3b8] rounded-full pointer-events-none cursor-not-allowed">
              Apply
            </Link>
            <span className="absolute top-full text-center whitespace-nowrap left-1/2 -translate-x-1/2 mb-2 p-2 rounded-md text-xs text-white bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Apply soon
            </span>
          </li>
        </ul>

        {/* Login Icon */}
        <Link href="/login" className="text-white hover:text-[#fecb33] transition-colors" title="Member Login">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </Link>

        {/* Mobile hamburger */}
        <button onClick={toggleMenu} className="md:hidden p-2">
          <span className="block w-6 h-0.5 bg-white mb-1" />
          <span className="block w-6 h-0.5 bg-white mb-1" />
          <span className="block w-6 h-0.5 bg-white" />
        </button>
      </div>

      {/* Mobile menu overlay */}
        {menuOpen && (
          <>
            <div className="fixed inset-0 bg-black/50 z-40" onClick={toggleMenu} />
            <div className="fixed top-0 right-0 w-64 h-full bg-[#141416] z-50 p-6">
              <ul className="space-y-4 text-white font-thin">
                {NAV_ITEMS.map((path) => {
                  if (path === "about") {
                    return (
                      <li key="about">
                        <Link
                          href="/#about"
                          scroll={false}
                          onClick={handleAboutClick}
                          className="hover:text-[#fecb33]"
                        >
                          About
                        </Link>
                      </li>
                    );
                  }
                  return (
                    <li key={path}>
                      <Link href={`/${path}`} onClick={() => setMenuOpen(false)} className="hover:text-[#fecb33]">
                        {path[0].toUpperCase() + path.slice(1)}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <Link href="#" className="px-4 py-2 inline-block bg-[#e2e8f0] text-[#94a3b8] rounded-full pointer-events-none cursor-not-allowed mb-2">
                    Apply
                  </Link>
                </li>
                <li className="pt-4 border-t border-gray-700">
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="flex items-center space-x-3 text-white hover:text-[#fecb33]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span>Member Login</span>
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
