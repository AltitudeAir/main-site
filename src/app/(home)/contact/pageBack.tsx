'use client';
import axiosInst from '@/core/utils/axoisInst';
import { constants } from '@/core/utils/constants';
import { parseHtml } from '@/core/utils/helper';
import mapboxgl from 'mapbox-gl';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
  FaYoutubeSquare,
} from 'react-icons/fa';
import { ContactForm } from './(components)/ContactFormBack';
export default function Description() {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY ?? '';
  const mapContainer = useRef(null);
  const map = useRef<any>(null);
  useEffect(() => {
    if (map.current) {
      axiosInst
        .get('/contact/')
        .then((res) => {
          let lat = res.data.data[0].latitude;
          let lng = res.data.data[0].longitude;
          map.current?.flyTo({
            center: [lng, lat],
            minZoom: 5,
            speed: 0.8,
            zoom: 13,
          });
          new mapboxgl.Marker({ color: '#fbc200' })
            .setLngLat([lng, lat])
            .addTo(map.current);
        })
        .catch((err) => {});
    }

    if (map.current || !mapContainer.current) {
      return;
    }
    if (!map.current && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/icyhotshoto/ckto9qg2x123s18kkno3md7h4',
        center: [86, 27],
        zoom: 8,
      });
    }
  }, []);
  const [footerData, setFooterData] = useState({
    copyright: '',
    hotline: null,
    address: '',
    airportNumber: '',
    email: '',
    aboutUs: '',
  });
  const [contactData, setContactData] = useState({
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
  useEffect(() => {
    axiosInst.get('/footer/').then((result) => {
      const data = result.data.data;
      setFooterData(data[0]);
    });
    axiosInst.get('/contact/').then((result) => {
      const data = result.data.data;
      setContactData(data[0]);
    });
    axiosInst.get('/socialLink/').then((result) => {
      const data = result.data.data;
      setSocialLinks(data[0]);
    });
    axiosInst.get('/general/').then((result) => {
      const data = result.data.data;
      setQr(data.QRcode);
    });
  }, []);
  const mainClass = {
    backgroundImage: 'url(/images/contact/helicopter.webp)',
    // backgroundPositionY: '-300px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };
  const mainHeading = {
    fontFamily: 'BankGothic-Regular',
    wordSpacing: '5px',
  };
  return (
    <>
      <section
        className={`relative h-[40vh] md:h-[60vh] lg:h-[80vh] w-full flex items-end justify-center`}
      >
        <div className="block absolute top-0 w-full h-full" style={mainClass} />
        <h1
          className="text-5xl mb-16 z-10 text-custom-blue/60 font-bold text-left container"
          style={mainHeading}
        >
          CONTACT US
        </h1>
        <div className="absolute bottom-0 left-0 top-0 right-0 bg-gradient-to-t from-[#b3c6d5] to-transparent"></div>
      </section>
      <main className="contact-main">
        <section className="contact-section !flex-col lg:!flex-row gap-10">
          <div
            className={
              'contact-details flex flex-col justify-stretch items-start gap-7'
            }
          >
            <h2 className="!text-left w-full">Details</h2>
            <p>
              <strong>{'Address: '}</strong>
              <span>
                {contactData.address ? parseHtml(contactData.address) : '...'}
              </span>
            </p>
            <p>
              <strong>{'For Booking: '}</strong>
              <span>
                {contactData.bookingEmail
                  ? parseHtml(contactData.bookingEmail)
                  : '...'}
              </span>
            </p>
            <p>
              <strong>{'For Enquiry: '}</strong>
              <span>
                {contactData.bookingInquiry
                  ? parseHtml(contactData.bookingInquiry)
                  : '...'}
              </span>
            </p>
            <p>
              <strong>{'Airport Office: '}</strong>
              <span>
                {contactData.airportNumber
                  ? parseHtml(contactData.airportNumber)
                  : '...'}
              </span>
            </p>
            <p>
              <strong>{'Head Office: '}</strong>
              <span>
                {contactData.headNumber
                  ? parseHtml(contactData.headNumber)
                  : '...'}
              </span>
            </p>
            <p>
              <strong>{'For Inquiry: '}</strong>
              <span>
                {contactData.inquiry1
                  ? parseHtml(
                      contactData.inquiry1 +
                        contactData.inquiry2 +
                        contactData.inquiry3 +
                        contactData.inquiry4
                    )
                  : '...'}
              </span>
            </p>
            <p>
              <strong>Socials:</strong>
            </p>
            <div className="qr_wrapper flex items-start justify-evenly">
              <div className="socials flex gap-2 items-center">
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
              <div className="qr">
                <Image
                  src={constants.baseUrl + qr}
                  alt="QR Code"
                  onError={(e) => {
                    e.currentTarget.src = '/images/errors/placeholder.webp';
                  }}
                  height={100}
                  width={100}
                />
              </div>
            </div>
            <div className="desc-map-wrapper">
              <div ref={mapContainer}></div>
            </div>
          </div>
          <div className="contact-form !mt-4">
            <h2>Send a Message</h2>
            <ContactForm />
          </div>
        </section>
      </main>
    </>
  );
}
