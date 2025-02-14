'use client';
import animateOnScroll from '@/core/utils/animateOnScroll';
import Image from 'next/image';

import { useEffect } from 'react';

export default function Highlights() {
  useEffect(() => {
    animateOnScroll(
      '.highlights .svg_text_container',
      '.highlights .animation-observer-helper',
      'animate__zoomIn'
    );
  }, []);
  return (
    <section className="highlights" id="highlights">
      <div className="animation-observer-helper" />
      <div className="highlights_container">
        <div className="border-[1rem] border-[#fbc200] max-w-60 py-14 px-20 mr-[10vw] flex items-center">
          <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl font-gilroy text-white m-0">
            WHY ALTITUDE AIR?
          </h2>
        </div>

        <div className="feature_container">
          <div
            className="svg_text_container"
            style={{ animationDuration: '.1s' }}
          >
            <div className="svg_container ">
              <Image
                src="/icons/support.svg"
                alt="Support svg icon"
                width={100}
                height={100}
              />
            </div>
            <h4 className="text-white">Our Experienced Team</h4>
            <p>
              The Altitude Air Team is guided by legendary veterans of Nepal’s
              Tourism industry. Our team comprises highly experienced pilots and
              crew, specializing in high altitude flights and rescue operations
              over the treacherous Himalayan terrain.
            </p>
          </div>
          <div
            className="svg_text_container"
            style={{ animationDelay: '.1s', animationDuration: '.3s' }}
          >
            <div className="svg_container">
              <Image
                src="/icons/24-hours.svg"
                alt="24hr svg icon"
                width={100}
                height={100}
              />
            </div>
            <h4 className="text-white">We are here </h4>
            <p>
              Our reliable support system ensures we can be reached at all
              times, providing rapid responses during emergent situations. We
              value you and respect your time.
            </p>
          </div>
          <div
            className="svg_text_container"
            style={{ animationDelay: '.2s', animationDuration: '.3s' }}
          >
            <div className="svg_container">
              <Image
                src="/icons/helicopter.svg"
                alt="Helicopter svg icon"
                width={100}
                height={100}
              />
            </div>
            <h4 className="text-white">Newest Helicopters</h4>
            <p>
              Altitude Air’s first class fleet of Airbuses combat the Nepali
              region with ease, venturing through remote landscapes for rescue
              missions and emergent medical services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
