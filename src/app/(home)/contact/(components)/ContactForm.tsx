'use client';
import { useAppDispatch } from '@/core/redux/hooks';
import contactApi from '@/modules/contact/contactApi';
import {
  contactFormSchema,
  ContactFormType,
} from '@/modules/contact/contactType';

import { useFormik } from 'formik';
import { useState } from 'react';
import { ZodError } from 'zod';

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const onSubmit = async (values: ContactFormType) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      await Promise.resolve(
        dispatch(contactApi.endpoints.postContactUs.initiate(values))
      );
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const validateForm = (values: ContactFormType) => {
    try {
      contactFormSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        return error.formErrors.fieldErrors;
      }
    }
  };

  const formik = useFormik<ContactFormType>({
    enableReinitialize: false,
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      date: new Date(Date.now()),
      tel: '',
    },
    validate: validateForm,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="py-7">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Your First Name"
            // {...formik.getFieldProps('firstName')}
            value={formik.values.firstName}
            onChange={(e) => formik.setFieldValue('firstName', e.target.value)}
            className="w-full h-12 px-2 border bg-white/80 rounded placeholder:font-light outline-none focus-visible:ring-2"
          />
          {!!formik.errors.firstName && (
            <div className="text-red-500 text-sm">
              {formik.errors.firstName}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Your Last Name"
            {...formik.getFieldProps('lastName')}
            className="w-full h-12 px-2 border bg-white/80 rounded placeholder:font-light outline-none focus-visible:ring-2"
          />
          {!!formik.errors.lastName && (
            <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
          )}
        </div>
      </div>
      <div className="mb-8 flex flex-col gap-1">
        <input
          type="text"
          placeholder="Your Phone Number"
          {...formik.getFieldProps('tel')}
          className="w-full h-12 px-2 border bg-white/80 rounded placeholder:font-light outline-none focus-visible:ring-2"
        />
        {!!formik.errors.tel && (
          <div className="text-red-500 text-sm">{formik.errors.tel}</div>
        )}
      </div>
      <div className="mb-8 flex flex-col gap-1">
        <input
          type="email"
          placeholder="email@example.com"
          {...formik.getFieldProps('email')}
          className="w-full h-12 px-2 border bg-white/80 rounded placeholder:font-light outline-none focus-visible:ring-2"
        />
        {!!formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <input
            type="text"
            placeholder="Your phone number"
            {...formik.getFieldProps('lastName')}
            className="w-full h-16 px-2 border border-custom-gray-light rounded placeholder:font-light outline-none focus-visible:ring-2"
          />
          {!!formik.errors.lastName && (
            <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Subject"
            {...formik.getFieldProps('lastName')}
            className="w-full h-16 px-2 border border-custom-gray-light rounded placeholder:font-light outline-none focus-visible:ring-2"
          />
          {!!formik.errors.lastName && (
            <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
          )}
        </div>
      </div> */}
      <div className="mb-14 flex flex-col gap-1">
        <textarea
          className="w-full p-2 py-8 text-white border bg-white/80  rounded outline-none focus-visible:ring-2"
          rows={5}
          placeholder="Type your message here"
          {...formik.getFieldProps('details')}
        ></textarea>
        {!!formik.errors.details && (
          <div className="text-red-500 text-sm">{formik.errors.details}</div>
        )}
      </div>
      <button
        type="submit"
        className={`text-white font-bold bg-custom-blue hover:bg-opacity-95 hover:shadow-lg h-16 px-10 rounded`}
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
