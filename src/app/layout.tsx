import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import Head from 'next/head';
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import FooterV2 from './(components)/(modules)/FooterV2';

import './globals.css';
// Import Swiper styles
import Provider from '@/core/redux/provider';
import Notification from '@/core/ui/components/notification';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/pagination';
import Navbar from './(components)/(modules)/Navbar';
import SocialIcon from './(components)/(modules)/SocialIcon';

const inter = Inter({ subsets: ['latin'] });
const gilroy = localFont({
  src: '../../public/fonts/Gilroy-Light.ttf',
  variable: '--font-gilroy',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Altitude Air Nepal',
    template: '%s | Altitude Air Nepal',
  },

  description:
    'Altitude Air offers top-rated helicopter services and scenic package tours to beautiful destinations.',
  keywords:
    'helicopter flights, helicopter tours, helicopter rescue, Altitude Air, Nepal',
  icons: {
    icon: './favicon.ico',
  },
  openGraph: {
    title: 'Altitude Air Nepal',
    description:
      'Altitude Air offers top-rated helicopter services and scenic package tours to beautiful destinations.',
    locale: 'en_US',
    type: 'website',
    siteName: 'Altitude Air',
    url: 'https://altitudeairnepal.com',
    images: [
      {
        url: 'https://altitudeairnepal.com/images/banner/banner-4.jpg',
        width: 1200,
        height: 630,
        alt: 'Scenic view from Altitude Air helicopter tour',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  ``;
  return (
    <html lang="en">
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <body className={`${inter.className} ${gilroy.variable}`}>
        <Notification />
        <Provider>
          <main>
            {/* <Header /> */}
            <Navbar />
            {children}
            <FooterV2 />
            <SocialIcon />
          </main>
        </Provider>
      </body>
    </html>
  );
}
