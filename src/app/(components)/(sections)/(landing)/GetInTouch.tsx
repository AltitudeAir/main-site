'use client';
import { ArrayResponseType } from '@/core/types/responseTypes';
import { Footer } from '@/modules/footer/footerType';
import { useState } from 'react';

export default function GetInTouch({
  footerdata,
}: {
  footerdata?: ArrayResponseType<Footer> | undefined;
}) {
  const [showModal, setShowModal] = useState(false);
  const hotline = footerdata?.data[0].hotline;
  const firstHotline = hotline?.split('\n')[0].trim();

  const openModal = () => {
    if (
      typeof window !== 'undefined' &&
      /Mobi|Android|iPhone/i.test(navigator.userAgent)
    ) {
      window.location.href = `tel:${firstHotline}`;
    } else {
      const whatsappURL = `https://wa.me/9779801249908`;
      window.open(whatsappURL, '_blank');
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const hotlineNumbers = hotline?.split('\n').join(', ');

  return (
    <section className="get_in_touch !py-10 !px-9">
      <div className="touch_container">
        <div className="touch_heading_container">
          <h2>Get in touch with us?</h2>
        </div>

        <div className="enquiry_container">
          <div className="contact_container">
            <a className="w-10" href={`tel:${firstHotline}`}>
              <h2>{hotlineNumbers}</h2>
            </a>
          </div>

          <div className="button_container">
            <button className="action-button" onClick={openModal}>
              Enquiry Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
