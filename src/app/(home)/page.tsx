import Enquiry from '../(components)/(elements)/Enquiry';
import SplashScreen from '../(components)/(elements)/SplashScreen';
import About from '../(components)/(sections)/(landing)/About';
import Gallery from '../(components)/(sections)/(landing)/Gallery';
import GetInTouch from '../(components)/(sections)/(landing)/GetInTouch';
import Highlights from '../(components)/(sections)/(landing)/Highlights';
import Landing from '../(components)/(sections)/(landing)/Landing';
import News from '../(components)/(sections)/(landing)/News';
import Package from '../(components)/(sections)/(landing)/Package';
import Reviews from '../(components)/(sections)/(landing)/Reviews';
import Services from '../(components)/(sections)/(landing)/Services';

export default function Home() {
  return (
    <>
      <SplashScreen />
      <Enquiry />
      <Landing />
      <Highlights />
      <Package />
      <Services />
      <About />
      {/* <Missions /> */}
      <News />
      <Gallery />

      <Reviews />
      <GetInTouch />
    </>
  );
}
