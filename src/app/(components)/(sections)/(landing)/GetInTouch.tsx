'use client';
import axiosInst from '@/core/utils/axoisInst';
import { useEffect, useState } from 'react';
// import Modal from '../../elements/Modal';
// import StepForm from '../../elements/StepForm';

export default function GetInTouch() {
  const [showModal, setShowModal] = useState(false);
  const [hotline, setHotline] = useState('');

  useEffect(() => {
    axiosInst.get('/footer/').then((result) => {
      const data = result.data.data;
      setHotline(data[0].hotline);
    });
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className="get_in_touch">
      <div className="touch_container">
        <div className="touch_heading_container">
          <h2>Get in touch with us?</h2>
        </div>

        <div className="enquiry_container">
          <div className="contact_container">
            <a href={`tel:${hotline}`}>
              <h2>{hotline}</h2>
            </a>
          </div>
          <div className="button_container">
            <button className="action-button" onClick={openModal}>
              Enquiry Now
            </button>
          </div>
        </div>
      </div>
      {/* {showModal && (
        <Modal show={showModal} hide={closeModal}>
          <StepForm hide={closeModal} />
        </Modal>
      )} */}
    </section>
  );
}
