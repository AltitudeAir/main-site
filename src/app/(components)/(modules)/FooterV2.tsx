'use client';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useEffect, useState } from 'react';
// import {
//   faFacebookSquare,
//   faInstagramSquare,
//   faTwitterSquare,
//   faYoutubeSquare,
// } from "@fortawesome/free-brands-svg-icons";
import { parseHtml } from '@/core/utils/helper';
import { Facebook, Instagram } from 'iconsax-react';
import Image from 'next/image';
import {
  default as axiosInst,
  default as axiosInstance,
} from '../../../core/utils/axoisInst';

export default function FooterV2() {
  const [footerData, setFooterData] = useState({
    copyright: '',
    hotline: null,
    address: '',
    email: '',
    aboutUs: '',
  });

  const [socialLinks, setSocialLinks] = useState({
    id: 1,
    instagram: '',
    facebook: 'https://www.facebook.com/altitude.airlines',
  });

  // const notificationContext = useNotificationContext();

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axiosInstance.get('/footer/').then((result) => {
      const data = result.data.data;
      setFooterData(data[0]);
    });

    // eslint-disable-next-line no-undef
    axiosInst.get('/socialLink/').then((result) => {
      const data = result.data.data;
      setSocialLinks(data[0]);
    });
  }, []);

  function showError(message: any) {
    // notificationContext.showNotification(message, 2000);
  }

  return (
    <footer>
      <div className="bg-[#202e43]/90 text-[#a7b9c7]">
        <div className="flex flex-wrap max-w-7xl mx-auto py-20 justify-between px-4">
          <div className="max-w-xs sm:max-w-52 md:text-sm text-xs mb-8 sm:mb-0">
            <Image
              src="/images/inverse-logo.webp"
              alt="altitude-air-logo"
              width={100}
              height={100}
            />
            <span className="font-gilroy">{parseHtml(footerData.aboutUs)}</span>
          </div>

          <div className="flex flex-col gap-2 mb-8 sm:mb-0 w-full sm:w-auto">
            <h5 className="text-lg font-semibold">ABOUT US</h5>
            <ul className="font-gilroy text-xs sm:text-sm flex flex-col gap-4">
              <li>
                <Link href="/about#overview" className="hover:text-white">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/about#message" className="hover:text-white">
                  Message From Executive Chairman
                </Link>
              </li>
              <li>
                <Link href="/about#board_info" className="hover:text-white">
                  Board Of Directors
                </Link>
              </li>
              <li>
                <Link href="/about#crew" className="hover:text-white">
                  Crew
                </Link>
              </li>
              <li>
                <Link href="/about#mission&vision" className="hover:text-white">
                  Mission & Vision
                </Link>
              </li>
              <li>
                <Link href="/about#statistics" className="hover:text-white">
                  Mission Statistics
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2 mb-8 sm:mb-0 w-full sm:w-auto">
            <h5 className="text-lg font-semibold">NAVIGATE TO</h5>
            <ul className="font-gilroy text-xs sm:text-sm flex flex-col gap-4">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-2 mb-8 sm:mb-0 w-full sm:w-auto">
            <h5 className="text-lg font-semibold">Follow Us</h5>
            <ul className="font-gilroy text-xs sm:text-sm flex gap-4">
              <a
                href="https://www.facebook.com/altitude.airlines"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-[#a7b9c7] hover:text-white text-lg"
              >
                <Facebook size="24" />
              </a>
              <a
                href="https://www.instagram.com/altitude.air/"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-[#a7b9c7] hover:text-white text-lg"
              >
                <Instagram size="24" />
              </a>
            </ul>
          </div>

          <div className="flex flex-col gap-2 max-w-80 w-full sm:w-auto"></div>
        </div>

        <div className="copyright_container font-gilroy">
          {parseHtml(footerData.copyright)}
          <p>
            Crafted by <a href="https://kurmatechnepal.com">KurmaTech</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
