/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MainMenu from './MainMenu';
import MobileNav from './MobileNav';

const Navbar = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isStickyLogoVisible, setIsStickyLogoVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      setIsNavbarVisible(false);
      setIsStickyLogoVisible(true);
    } else {
      setIsNavbarVisible(true);
      setIsStickyLogoVisible(false);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-16 w-full z-50 bg-white/60 backdrop-blur-md transition-transform duration-300 ${
          isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="lg:container mx-auto">
          <div className="flex justify-between items-center">
            <div className="w-24 flex justify-center">
              <Link href="/" className="flex items-center relative h-16 w-16">
                <Image
                  alt="altitude-air-logo"
                  src="/images/inverse-logo.webp"
                  width={100}
                  height={100}
                  quality={75}
                  sizes="(max-width: 768px) 75vw, 33vw"
                  className="object-contain"
                />
              </Link>
            </div>

            <MainMenu />
            <MobileNav />
          </div>
        </div>
      </div>
      {isStickyLogoVisible && (
        <div className="fixed top-0 left-0 w-full z-40">
          <div className="lg:container mx-auto flex items-center h-16">
            <div className="bg-white w-24 flex justify-center">
              <Link href="/" className="flex items-center relatives h-16 w-16">
                <Image
                  alt="altitude-air-logo"
                  src="/images/inverse-logo.webp"
                  width={100}
                  height={100}
                  quality={75}
                  sizes="(max-width: 768px) 75vw, 33vw"
                  className="object-contain max-w-full h-auto"
                />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
