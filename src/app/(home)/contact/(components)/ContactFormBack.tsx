import axiosInst from '@/core/utils/axoisInst';
import { dateFromSqlDateTime } from '@/core/utils/helper';
import { Field, Form, Formik } from 'formik';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import * as Yup from 'yup';

export function ContactForm() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (value: string | null) => {
    if (value) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  };

  function handleExpired() {
    setIsVerified(false);
  }

  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          tel: '',
          date: '',
          details: '',
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required('First Name is required'),
          lastName: Yup.string().required('Last Name is required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
          tel: Yup.string().required('Phone Number is required'),
          details: Yup.string().required('Message is required'),
        })}
        onSubmit={async (values, { resetForm }) => {
          if (!isVerified) {
            return;
          }

          let obj = {
            ...values,
            isContact: true,
            date: dateFromSqlDateTime(new Date().toISOString()),
          };
          try {
            const response = await axiosInst.post('/contactUs', obj);
            resetForm();
          } catch (error) {
            console.error('Error submitting form:', error);
          }
        }}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col items-start justify-between gap-6">
              <div className="form-field !items-start">
                <label htmlFor="firstName">First Name</label>
                <Field
                  id="firstName"
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  className={`${errors.firstName && touched.firstName} ? 'error' : '' !m-0`}
                />
              </div>
              {errors.firstName && touched.firstName && (
                <div className="error-message">{errors.firstName}</div>
              )}

              <div className="form-field !items-start">
                <label htmlFor="lastName">Last Name</label>
                <Field
                  id="lastName"
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  className={`${errors.lastName && touched.lastName} ? 'error' : '' !m-0`}
                />
              </div>
              {errors.lastName && touched.lastName && (
                <div className="error-message">{errors.lastName}</div>
              )}

              <div className="form-field !items-start">
                <label htmlFor="email">Email</label>
                <Field
                  id="email"
                  placeholder="Email"
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className={`${errors.email && touched.email} ? 'error' : '' !m-0`}
                />
              </div>
              {errors.email && touched.email && (
                <div className="error-message">{errors.email}</div>
              )}

              <div className="form-field !items-start">
                <label htmlFor="tel">Phone Number</label>
                <Field
                  id="tel"
                  placeholder="Contact Number"
                  type="text"
                  name="tel"
                  value={values.tel}
                  onChange={handleChange}
                  className={`${errors.tel && touched.tel} ? 'error' : '' !m-0`}
                />
              </div>
              {errors.tel && touched.tel && (
                <div className="error-message">{errors.tel}</div>
              )}

              <div className="form-field !items-start">
                <label htmlFor="details">Message</label>
                <Field
                  as="textarea"
                  id="details"
                  name="details"
                  rows="5"
                  value={values.details}
                  onChange={handleChange}
                  className={`${errors.details && touched.details} ? 'error' : '' !m-0`}
                />
              </div>
              {errors.details && touched.details && (
                <div className="error-message">{errors.details}</div>
              )}

              <div className="w-full flex justify-end items-center">
                <button
                  type="submit"
                  className="text-[#fbc200] font-bold border-2 border-[#fbc200] !m-0 py-2 px-10 transition-all duration-200 hover:scale-110"
                  disabled={!isVerified}
                >
                  Submit
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
        ref={recaptchaRef}
        onChange={handleChange}
        onExpired={handleExpired}
      />
    </>
  );
}
