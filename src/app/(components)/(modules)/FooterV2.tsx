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
        <div className="flex wrap max-w-7xl mx-auto py-20 justify-between">
          <div className="max-w-52 md:text-sm text-xs">
            <Image
              src="/images/inverse-logo.webp"
              alt="altitude-air-logo"
              width={100}
              height={100}
            />
            <span className="font-gilroy">{parseHtml(footerData.aboutUs)}</span>
          </div>
          <div className=" flex flex-col gap-2">
            <h5>ABOUT US</h5>
            <ul className="font-gilroy md:text-sm text-xs flex flex-col gap-4">
              <li>
                <Link href="/news">Media Coverage</Link>
              </li>
              <li>
                <Link href="/about#crew">Our Fleet</Link>
              </li>
              <li>
                <Link href="/voluntary-hazard-report">
                  Voluntary Hazard Report
                </Link>
              </li>
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h5>NAVIGATE TO</h5>
            <ul className="font-gilroy md:text-sm text-xs flex flex-col gap-4">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/gallery">Gallery</Link>
              </li>
              <li>
                <Link href="/blog">Blogs</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h5>Follow Us</h5>
            <ul className="font-gilroy md:text-sm text-xs flex  gap-4">
              <a
                href="https://www.facebook.com/altitude.airlines"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-[#b33935] hover:text-white text-xs sm:text-sm md:text-lg lg:text-xl"
              >
                <Facebook size="24" />
              </a>
              <a
                href="https://www.instagram.com/altitude.air/"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer text-[#b33935] hover:text-white text-xs sm:text-sm md:text-lg lg:text-xl"
              >
                <Instagram size="24" />
              </a>
            </ul>
          </div>
          <div className="flex flex-col gap-2 max-w-80">
            {/* <h5>SUBSCRIBE TO OUR NEWSLETTER</h5>
            <p className="font-gilroy md:text-sm text-xs flex flex-col gap-4">
              Subscribe for Latest News and Updates from <br />
              Altitude Air
            </p>
            <Formik
              initialValues={{ email: '' }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email('Not a valid email')
                  .required('Required'),
              })}
              onSubmit={async (values, { resetForm }) => {
                if (submitting) {
                  return;
                }

                setSubmitting(true);
                try {
                  let response = await axiosInstance.post(
                    '/newsletter/',
                    values
                  );
                  if (response.status === 200) {
                    resetForm();
                  }
                } catch (error: any) {
                  if (error.response.status === 409) {
                    showError('Email already exists');
                  } else {
                    showError('Network Error');
                  }

                  setSubmitting(false);
                }
              }}
            > */}
            {/* <>
                <Form className="flex items-stretch w-full justify-between">
                  <Field
                    className="bg-transparent border border-white border-r-0 py-2 px-3  w-1/2 "
                    name="email"
                    type="email"
                    placeholder="Email Address"
                  />
                  <button
                    type="submit"
                    className="bg-[#fbc200] text-[#202e43] px-3 font-bold basis-1/2"
                    disabled={submitting}
                  >
                    {submitting ? 'Subscribed' : 'Subscribe Now'}
                  </button>
                </Form>
                <p className="error_email">
                  <ErrorMessage name="email" />
                </p>
              </>
            </Formik> */}
          </div>
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
