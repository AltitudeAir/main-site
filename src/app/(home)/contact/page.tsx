import ImageWithFallback from '@/app/(components)/(elements)/ImageWithFallback';
import { fetchData } from '@/core/api/api_client';
import { apiPaths } from '@/core/api/apiConstants';
import { altitudeAirLocation } from '@/core/constants/appConstants';
import { PaginatedResponseType } from '@/core/types/responseTypes';
import { parseHtml } from '@/core/utils/helper';
import {
  ContactType,
  GeneralType,
  SocialLinkType,
} from '@/modules/contact/contactType';
import {
  Airplane,
  Bookmark,
  Building4,
  Location,
  MessageQuestion,
} from 'iconsax-react';
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
  FaYoutubeSquare,
} from 'react-icons/fa';
import PackageLocation from '../packages/[slug]/(components)/PackageLocation';
import ContactForm from './(components)/ContactForm';

export default async function ContactPage() {
  const { data: contactData } = await fetchData<
    PaginatedResponseType<ContactType>
  >(apiPaths.getContactUrl);

  const { data: socialLinksData } = await fetchData<
    PaginatedResponseType<SocialLinkType>
  >(apiPaths.getSociallinkUrl);
  const { data: generalData } = await fetchData<
    PaginatedResponseType<GeneralType>
  >(apiPaths.getGeneralUrl);

  //   const mapContainer = useRef(null);
  //   const map = useRef<any>(null);

  //   useEffect(() => {
  //     if (map.current) {
  //       axiosInst
  //         .get('/contact/')
  //         .then((res) => {
  //           let lat = res.data.data[0].latitude;
  //           let lng = res.data.data[0].longitude;
  //           map.current?.flyTo({
  //             center: [lng, lat],
  //             minZoom: 5,
  //             speed: 0.8,
  //             zoom: 13,
  //           });
  //           new mapboxgl.Marker({ color: '#fbc200' })
  //             .setLngLat([lng, lat])
  //             .addTo(map.current);
  //         })
  //         .catch((err) => {});
  //     }

  //     if (map.current || !mapContainer.current) {
  //       return;
  //     }
  //     if (!map.current && mapContainer.current) {
  //       map.current = new mapboxgl.Map({
  //         container: mapContainer.current,
  //         style: 'mapbox://styles/icyhotshoto/ckto9qg2x123s18kkno3md7h4',
  //         center: [86, 27],
  //         zoom: 8,
  //       });
  //     }
  //   }, []);
  const contactDetails = [
    { title: 'Location', key: 'address', icon: Location },
    { title: 'Airport Office', key: 'airportNumber', icon: Airplane },
    { title: 'Head Office', key: 'headNumber', icon: Building4 },
    { title: 'Booking Email', key: 'bookingEmail', icon: Bookmark },
    { title: 'Booking Inquiry', key: 'bookingInquiry', icon: MessageQuestion },
  ];

  const mainClass = {
    backgroundImage: 'url(/images/contact/helicopter.webp)',
    backgroundPositionY: '-300px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };
  const smMainClass = {
    backgroundImage: 'url(/images/contact/helicopter.webp)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };
  const mainHeading = {
    fontFamily: 'BankGothic-Regular',
    wordSpacing: '5px',
  };
  return (
    <div>
      <section
        className={`relative px-10 h-[40vh] md:h-[60vh] lg:h-[80vh] w-full flex items-end justify-center`}
      >
        <div
          className="hidden absolute top-0 w-full h-full md:block"
          style={mainClass}
        />
        <div
          className="block absolute top-0 w-full h-full md:hidden"
          style={smMainClass}
        />
        <h1
          className="text-5xl mb-5 z-10 text-custom-blue/60 font-bold text-left container"
          style={mainHeading}
        >
          CONTACT US
        </h1>

        <div className="absolute bottom-0 left-0 top-0 right-0 bg-gradient-to-t from-custom-bg to-custom-blue/60"></div>
      </section>
      <main className="bg-custom-bg px-10">
        <div className="container mx-auto py-10">
          <div className="flex flex-col lg:flex-row items-start justify-stretch gap-16">
            <aside className="shrink-0 w-full lg:max-w-md flex flex-col gap-2">
              <div className="container mx-auto">
                <div className="px-5 py-5 bg-[#314666] text-white rounded">
                  Additional Info
                </div>
              </div>
              {contactDetails.map(({ title, key, icon: Icon }) => {
                const value =
                  contactData?.results?.[0]?.[key as keyof ContactType] || '';
                const parsedValue = value ? parseHtml(value as string) : '';
                return (
                  <div
                    key={key}
                    className={`bg-white/75 rounded h-16 overflow-hidden ${
                      value === '' ? 'hidden' : 'block'
                    }`}
                  >
                    <div className="flex justify-start gap-5 items-stretch h-full">
                      <div className="relative shrink-0 overflow-hidden h-full w-20 flex items-center justify-center before:absolute before:top-0 before:-left-2 before:bottom-0 before:right-2 before:bg-white before:-z-10 before:skew-x-6 before:border-r-4 before:border-custom-blue/90 z-0">
                        <Icon
                          size="30"
                          variant="Bulk"
                          className="text-custom-blue"
                        />
                      </div>
                      <div className="flex flex-col justify-center items-start gap-1">
                        <h5 className="font-semibold text-custom-blue text-base">
                          {title}
                        </h5>
                        <p className="font-medium text-custom-text text-sm">
                          {parsedValue}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className=" qr_wrapper space-x-8 lg:space-x-5 md:space-x-36  flex items-start justify-start">
                {socialLinksData?.results?.map((link, index) => (
                  <div key={index} className="socials flex flex-col ">
                    <h2 className="text-lg mb-2 flex items-start justify-start font-bold text-custom-blue">
                      Follow Us
                    </h2>
                    <div className="flex">
                      <a href={link.facebook}>
                        <FaFacebookSquare size={36} />
                      </a>
                      <a href={link.twitter}>
                        <FaTwitterSquare size={36} />
                      </a>
                      <a href={link.youtube}>
                        <FaYoutubeSquare size={36} />
                      </a>
                      <a href={link.instagram}>
                        <FaInstagramSquare size={36} />
                      </a>
                    </div>
                  </div>
                ))}
                <div className="md:h-72 lg:h-72 sm:h-40 h-36 w-[1px]  border-1 bg-custom-blue"></div>
                <div>
                  <h1 className="text-lg mb-2 flex items-center justify-center font-bold text-custom-blue">
                    Scan to Pay
                  </h1>
                  {generalData?.results.map((item, index) => (
                    <div key={index} className="qr">
                      <ImageWithFallback
                        src={item.QRcode}
                        alt="QR Code"
                        className="rounded-md"
                        height={255}
                        width={255}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </aside>
            <div className="container mx-auto">
              <div className="grow bg-[#314666] py-10 px-6 rounded relative">
                <div className="absolute -left-4 top-1/2 h-[90%] border-l-[16px] border-[#314666] border-dashed transform -translate-y-1/2"></div>

                <h2 className="text-2xl font-bold text-white">Send Message</h2>
                <div className="mt-2">
                  {' '}
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-20">
          <div className="flex flex-col items-stretch justify-stretch">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-5xl text-custom-blue font-bold mb-5">
                Find us on map
              </h2>
              <p className="text-lg text-custom-blue">
                Experience premium air travel! Locate us on the map and take off
                with our exclusive helicopter charter services.
              </p>
            </div>

            <PackageLocation
              latitude={altitudeAirLocation[0]}
              longtitude={altitudeAirLocation[1]}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

// Address: P.O Box 4515, Sinamangal, Kathmandu, Nepal

// For Booking: reservation@altitudeheli.com

// For Enquiry: marketing@altitudeheli.com

// Airport Office: +977-1-4489300

// Head Office: +977-1-4116665 / +977-1-4116666

// For Inquiry: 9801249918 /9801249908/9801249907
