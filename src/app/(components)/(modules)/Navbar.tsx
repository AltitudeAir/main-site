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
      if (currentScrollY > 100) {
        setIsStickyLogoVisible(true);
      }
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
        className={`fixed top-0 left-0 h-16 w-full z-50 bg-white/60 backdrop-blur-md transition-transform duration-500 ease-in-out ${
          isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="lg:container mx-auto">
          <div className="flex justify-between">
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
        <div className="fixed top-0 sm:left-2 w-full left-2 z-40 transition-transform duration-500 ease-in-out">
          <div className="lg:container mx-auto">
            <div className="bg-white w-24 flex justify-center">
              <Link href="/" className="flex items-center relative h-16 w-16">
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
