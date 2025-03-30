'use client';
import Image from 'next/image';

export default function SplashScreen() {
  // useEffect(() => {
  //   animateOnScroll(
  //     '.splash_screen img',
  //     '.splash_screen .observable',
  //     'animate__backInDown'
  //   );

  //   animateOnScroll(
  //     '.splash_screen .text_content',
  //     '.splash_screen .observable',
  //     'animate__bounceInRight'
  //   );
  // }, []);

  return (
    <div className="splash_screen animate__delay-2s">
      <div className="observable" />
      <Image
        src="/images/inverse-logo.webp"
        alt="Altitude Air Logo"
        width={100}
        height={100}
      />
      <div className="text_content animate__delay-1s">
        <p>Loading...</p>
      </div>
    </div>
  );
}
