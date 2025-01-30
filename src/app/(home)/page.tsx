import Enquiry from '../(components)/(elements)/Enquiry';
import EnquiryDetails from '../(components)/(elements)/EnquiryDetails';
import About from '../(components)/(sections)/(landing)/About';
import GetInTouch from '../(components)/(sections)/(landing)/GetInTouch';
import Highlights from '../(components)/(sections)/(landing)/Highlights';
import Landing from '../(components)/(sections)/(landing)/Landing';
import Missions from '../(components)/(sections)/(landing)/Missions';
import Reviews from '../(components)/(sections)/(landing)/Reviews';

export default function Home() {
  return (
    <>
      {/* <SplashScreen /> */}
      <Enquiry>
        <EnquiryDetails />
      </Enquiry>
      <Landing />
      <Highlights />
      {/* <Package /> */}
      {/* <Services /> */}
      <About />
      <Missions />
      {/* <News /> */}
      {/* <Gallery /> */}
      {/* <GalleryV2 /> */}
      <Reviews />
      <GetInTouch />
    </>
  );
}
