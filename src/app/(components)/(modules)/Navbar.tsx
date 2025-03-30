'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import MainMenu from './MainMenu';
import MobileNav from './MobileNav';

const Navbar = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isStickyLogoVisible, setIsStickyLogoVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const updateVisibility = (
    navbarVisible: boolean,
    stickyLogoVisible: boolean,
    currentScrollY: number
  ) => {
    setIsNavbarVisible(navbarVisible);
    setIsStickyLogoVisible(stickyLogoVisible);
    setLastScrollY(currentScrollY);
  };

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      const currentScrollY =
        window.scrollY || document.documentElement.scrollTop;

      if (currentScrollY < 50) {
        updateVisibility(true, false, currentScrollY);
        return;
      }

      if (currentScrollY > lastScrollY) {
        updateVisibility(false, true, currentScrollY);
        return;
      }

      updateVisibility(true, false, currentScrollY);
    });
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-16 z-50 bg-white/70 backdrop-blur-md transition-transform duration-300 ease-in-out ${
          isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="lg:container mx-auto">
          <div className="flex justify-between">
            <div className="w-24 flex justify-center">
              <Link href="/" className="flex items-center relative h-16 w-20">
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

      {isStickyLogoVisible && !isNavbarVisible && (
        <div className="fixed w-full sm:pl-0 pl-2 top-0 left-0 z-40 transition-transform duration-300 ease-in-out">
          <div className="lg:container mx-auto">
            <div className="bg-white w-24 flex justify-center shadow-lg p-2">
              <Link href="/" className="flex items-center relative h-12 w-20">
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
