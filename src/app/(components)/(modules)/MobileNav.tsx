'use client';
import { ArrowLeft, HambergerMenu } from 'iconsax-react';
import { useState } from 'react';
import SideDrawer from '../(elements)/SideDrawer';

const MobileNav = () => {
  const [drawer, setDrawer] = useState(false);

  const hideDrawerHandler = () => {
    setDrawer(false);
  };
  return (
    <>
      <div className="relative z-20 lg:hidden px-2 flex items-center justify-center">
        <div
          className="w-12 h-12 bg-white/50 flex items-center justify-center rounded-md shadow-md"
          onClick={() => setDrawer(!drawer)}
        >
          {drawer ? (
            <ArrowLeft size="32" variant="Broken" className="text-white" />
          ) : (
            <HambergerMenu
              size="32"
              variant="Broken"
              className="text-custom-blue"
            />
          )}
        </div>
      </div>
      <SideDrawer show={drawer} setDrawer={setDrawer} />
    </>
  );
};

export default MobileNav;
