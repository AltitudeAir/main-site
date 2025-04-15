'use client';
import { useAppDispatch } from '@/core/redux/hooks';
import hazardApi from '@/modules/hazard/hazardApi';
import { hazardFormSchema, HazardFormType } from '@/modules/hazard/hazardType';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ZodError } from 'zod';

const Forms = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const validateForm = (values: HazardFormType) => {
    try {
      hazardFormSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.errors);
        return error.formErrors.fieldErrors;
      }
    }
  };

  const onSubmit = (values: HazardFormType) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const responseData = dispatch(
        hazardApi.endpoints.postHazard.initiate(values)
      );
      if (Object.prototype.hasOwnProperty.call(responseData, 'data')) {
        toast.success(
          'Your request has been submitted. Check your email or phone for verification.'
        );
        router.push('/');
      } else if (Object.prototype.hasOwnProperty.call(responseData, 'error')) {
        toast.error('Error submitting form!');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error submitting form!');
    }
    setIsLoading(false);
  };

  const formik = useFormik<HazardFormType>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      tel: '',
      date: new Date(),
      details: '',
    },
    validate: validateForm,
    validateOnChange: true,
    onSubmit,
  });

  // async function formSubmitHandler(values: HazardFormType, resetForm: any) {
  //   const date = `${values.date?.getFullYear()}-${((values.date?.getMonth() ?? 0) + 1).toString().padStart(2, '0')}-${values.date?.getDate().toString().padStart(2, '0')}`;

  //   let obj = {
  //     ...values,
  //     isContact: false,
  //     date: date,
  //   };
  //   let res;
  //   try {
  //     res = await axiosInstance.post('/contactUs', obj);
  //     toast.success(
  //       'Your request has been submitted. Check your email or phone for verification.'
  //     );
  //   } catch (error) {
  //     toast.error('Error submitting form!');
  //     return;
  //   }
  //   resetForm();
  // }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <div className="form-field">
          <label htmlFor="given-name">First Name</label>
          <input
            id="firstName"
            placeholder="First Name"
            type="text"
            {...formik.getFieldProps('firstName')}
          />
        </div>
        {!!formik.errors.firstName && (
          <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
        )}
        <div className="form-field">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            placeholder="Last Name"
            type="text"
            {...formik.getFieldProps('lastName')}
          />
        </div>
        {!!formik.errors.lastName && (
          <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
        )}
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            placeholder="Email"
            type="text"
            {...formik.getFieldProps('email')}
          />
        </div>
        {!!formik.errors.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}

        <div className="form-field">
          <label htmlFor="tel">Contact Number</label>
          <input
            id="tel"
            placeholder="Contact Number"
            type="text"
            {...formik.getFieldProps('tel')}
          />
        </div>
        {!!formik.errors.tel && (
          <div className="text-red-500 text-sm">{formik.errors.tel}</div>
        )}
        <div className="form-field">
          <label htmlFor="date" className="required">
            Date of Occurrence /<br /> Hazard
          </label>
          <input
            type="date"
            value={
              formik.values.date
                ? formik.values.date.toISOString().split('T')[0]
                : ''
            }
            onChange={(e) => {
              const newDate = new Date(e.target.value);
              formik.setFieldValue('date', newDate);
            }}
          />
        </div>
        {!!formik.errors.date && (
          <div className="text-red-500 text-sm">Date required</div>
        )}

        <div className="form-field">
          <label htmlFor="details" className="required">
            Details of Occurrence /<br /> Hazard
          </label>
          <textarea id="details" {...formik.getFieldProps('details')} />
        </div>
        <div className="error-message">
          {/* <ErrorMessage name="details" /> */}
        </div>

        <div className="form-field">
          <div />
          <button className="button-outline-light" type="submit">
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Forms;
