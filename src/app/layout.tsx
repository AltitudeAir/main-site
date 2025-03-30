import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import Head from 'next/head';
import Script from 'next/script'; // Import Next.js Script
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import FooterV2 from './(components)/(modules)/FooterV2';

import './globals.css';
// Import Swiper styles
import { customMetaDataGenerator } from '@/core/helpers/customMetaDataGenerator';
import Provider from '@/core/redux/provider';
import Notification from '@/core/ui/components/notification';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Metadata } from 'next';
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

export const metadata: Metadata = customMetaDataGenerator({
  title: 'Home',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>

      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-KFMVCNDJ55"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KFMVCNDJ55');
          `,
        }}
      />

      <body className={`${inter.className} ${gilroy.variable}`}>
        <Notification />
        <Provider>
          <main>
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
