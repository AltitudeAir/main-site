'use client';
import { default as axiosInstance } from '@/core/utils/axoisInst';
import { constants } from '@/core/utils/constants';
import { parseHtml } from '@/core/utils/helper';
import {
  Airplane,
  Bookmark,
  Building4,
  Location,
  MessageQuestion,
} from 'iconsax-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
  FaYoutubeSquare,
} from 'react-icons/fa';
import PackageLocation from '../packages/[slug]/(components)/PackageLocation';
import ContactForm from './(components)/ContactForm';

interface contactDataType {
  address: string;
  airportNumber: string;
  headNumber: string;
  inquiry1: string;
  inquiry2: string;
  inquiry3: string;
  inquiry4: string;
  bookingEmail: string;
  bookingInquiry: string;
}

const ContactPage = () => {
  //   mapboxgl.accessToken =
  //     'pk.eyJ1IjoiaWN5aG90c2hvdG8iLCJhIjoiY2tmeHQwc3E5MjRxajJxbzhmbDN1bjJ5aiJ9.mNKmhIjRyKxFkJYrm4dMqg';
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
  const [contactData, setContactData] = useState<any>({
    address: '',
    airportNumber: '',
    headNumber: '',
    inquiry1: '',
    inquiry2: '',
    inquiry3: '',
    inquiry4: '',
    bookingEmail: '',
    bookingInquiry: '',
  });
  const [socialLinks, setSocialLinks] = useState({
    id: 1,
    instagram: '',
    facebook: 'https://www.facebook.com/altitude.airlines/',
    youtube: '',
    twitter: '',
  });
  const [qr, setQr] = useState('');
  console.log('QR Code URL:', constants.baseUrl + qr);

  useEffect(() => {
    axiosInstance.get('/contact/').then((result) => {
      const data = result.data.data;
      setContactData(data[0]);
    });
    axiosInstance.get('/socialLink/').then((result) => {
      const data = result.data.data;
      setSocialLinks(data[0]);
    });
    axiosInstance.get('/general/').then((result) => {
      const data = result.data.data;
      setQr(data.QRcode);
    });
  }, []);

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
        {/* <div className="container mx-auto pt-10">
          <div className="px-5 py-5 bg-custom-blue text-white rounded">
            Additional Info
          </div>
        </div> */}
        <div className="container mx-auto py-10">
          <div className="flex flex-col lg:flex-row items-start justify-stretch gap-16">
            {contactData && (
              <aside className="shrink-0 w-full lg:max-w-md flex flex-col gap-2">
                <div className="container mx-auto">
                  <div className="px-5 py-5 bg-[#314666] text-white rounded">
                    Additional Info
                  </div>
                </div>
                {contactDetails.map(({ title, key, icon: Icon }) => (
                  <div
                    key={key}
                    className={`bg-white/75 rounded h-16 overflow-hidden ${contactData[key] === '' ? 'hidden' : 'block'}`}
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
                          {/* {contactData[key]} */}
                          {contactData[key]
                            ? parseHtml(contactData[key])
                            : '...'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className=" qr_wrapper space-x-8 lg:space-x-5 md:space-x-36  flex items-start justify-start">
                  <div className="socials flex flex-col ">
                    <h2 className="text-lg mb-2 flex items-start justify-start font-bold text-custom-blue">
                      Follow Us
                    </h2>
                    <div className="flex">
                      <a href={socialLinks.facebook}>
                        <FaFacebookSquare size={36} />
                      </a>
                      <a href={socialLinks.twitter}>
                        <FaTwitterSquare size={36} />
                      </a>
                      <a href={socialLinks.youtube}>
                        <FaYoutubeSquare size={36} />
                      </a>
                      <a href={socialLinks.instagram}>
                        <FaInstagramSquare size={36} />
                      </a>
                    </div>
                  </div>
                  <div className="md:h-72 lg:h-72 sm:h-40 h-36 w-[1px]  border-1 bg-custom-blue"></div>
                  <div>
                    <h1 className="text-lg mb-2 flex items-center justify-center font-bold text-custom-blue">
                      Scan to Pay
                    </h1>
                    <div className="qr">
                      <Image
                        src={constants.baseUrl + qr}
                        alt="QR Code"
                        onError={(e) => {
                          e.currentTarget.src =
                            '/images/errors/placeholder.webp';
                        }}
                        className="rounded-md"
                        height={255}
                        width={255}
                      />
                    </div>
                  </div>
                </div>
              </aside>
            )}
            <div className="container mx-auto">
              <div className="grow bg-[#314666] py-10 px-6 rounded relative">
                <div className="absolute -left-4 top-1/2 h-[90%] border-l-[16px] border-[#314666] border-dashed transform -translate-y-1/2"></div>

                <h2 className="text-2xl font-bold text-white">Send Message</h2>
                <div className="mt-2">
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
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Expedita laborum consequuntur nam iste, porro quae?
              </p>
            </div>

            <PackageLocation />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;

// Address: P.O Box 4515, Sinamangal, Kathmandu, Nepal

// For Booking: reservation@altitudeheli.com

// For Enquiry: marketing@altitudeheli.com

// Airport Office: +977-1-4489300

// Head Office: +977-1-4116665 / +977-1-4116666

// For Inquiry: 9801249918 /9801249908/9801249907
