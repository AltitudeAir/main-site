import { useAppDispatch, useAppSelector } from '@/core/redux/hooks';
import { RootState } from '@/core/redux/store';
import DateSelector from '@/core/ui/components/DateSelector';
import PhoneInputField from '@/core/ui/components/PhoneInput';
import bookingApi from '@/modules/bookings/bookingApi';
import { BookingFormType, bookingSchema } from '@/modules/bookings/bookingType';
import { PackagesDataType } from '@/modules/packages/packagesType';
import { useFormik } from 'formik';
import { useState } from 'react';
import { toFormikValidate } from 'zod-formik-adapter';
import { months } from '../../(components)/BookingMainCard';

const BookingForm = () => {
  const { packageSlug, packageName, packagePrice, departureDate, totalPerson } =
    useAppSelector((state) => state.booking);

  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isOpen, toggleOpen] = useState<boolean>(false);
  const [kDepartureDate, setDepartureDate] = useState<Date>(
    departureDate ?? new Date()
  );

  const dispatch = useAppDispatch();

  const packageData = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getPackage`]?.data as PackagesDataType
  );

  const handleChange = (value: Date) => {
    if (isOpen) setDepartureDate(value);
  };

  const handlePhoneChange = (phone: string) => {
    formik.setFieldValue('phone', phone);
  };

  const onSubmit = async (values: BookingFormType) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await Promise.resolve(
        dispatch(
          bookingApi.endpoints.createBooking.initiate({
            package: packageSlug ?? packageData?.slug,
            departureDate: values.departureDate,
            noOfTravelers: values.noOfTravelers,
            totalPrice: values.totalPrice,
            fullName: values.fullName,
            email: values.email,
            phone: values.phone,
            requirement: values.requirement,
          })
        )
      );
      if (
        response.data?.transactions &&
        response.data?.transactions.length > 0
      ) {
        window.location.href = response.data.transactions[0].payment_url;
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const formik = useFormik<BookingFormType>({
    enableReinitialize: true,
    initialValues: {
      package: packageSlug ?? packageData?.slug,
      departureDate: kDepartureDate,
      noOfTravelers: totalPerson ? parseInt(totalPerson) : 1,
      totalPrice: (
        (packagePrice ?? packageData?.price ?? 0) *
        (totalPerson && packageData.pricing_type === 'per_person'
          ? parseInt(totalPerson)
          : 1)
      ).toString(),
      fullName: '',
      email: '',
      phone: '',
      requirement: '',
    },
    validate: toFormikValidate(bookingSchema),
    onSubmit,
  });

  console.log(formik.errors);

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg">
      <div className="grid grid-cols-3">
        <form
          onSubmit={formik.handleSubmit}
          className="col-span-3 md:col-span-2 px-4 py-5"
        >
          <h1 className="text-2xl font-bold text-custom-blue mb-4">
            Booking Form
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-normal text-custom-blue mb-1">
                Full Name <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter passenger full name"
                className="w-full h-10 px-2 border border-custom-gray-light rounded placeholder:font-light outline-none focus-visible:ring-2"
                {...formik.getFieldProps('fullName')}
                onBlur={formik.handleBlur}
              />
              {!!formik.errors.fullName && (
                <div className="text-red-500 text-sm">
                  {formik.errors.fullName}
                </div>
              )}
            </div>
            {/* <div>
              <label className="block text-sm font-normal text-custom-blue mb-1">
                Last Name <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="w-full h-10 px-2 border border-custom-gray-light rounded placeholder:font-light outline-none focus-visible:ring-2"
                {...formik.getFieldProps('lastName')}
                onBlur={formik.handleBlur}
              />
              {!!formik.errors.lastName && (
                <div className="text-red-500 text-sm">
                  {formik.errors.lastName}
                </div>
              )}
            </div> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-normal text-custom-blue mb-1">
                Trip Date
                <span className="text-rose-600">*</span>
              </label>
              <input
                value={
                  kDepartureDate
                    ? `${kDepartureDate.getDate()} ${months[kDepartureDate.getMonth()]} ${kDepartureDate.getFullYear()}`
                    : 'Month Days Years'
                }
                className="w-full h-10 px-2 border border-custom-gray-light rounded"
                readOnly
                onClick={() => {
                  toggleOpen(!isOpen);
                }}
              />
              <DateSelector
                id="departure-date"
                className="date-selector"
                handleOnChange={handleChange}
                isOpen={isOpen}
                onCalendarClose={() => {
                  if (isOpen) {
                    toggleOpen(!isOpen);
                  }
                }}
                onBlur={formik.handleBlur}
              />
            </div>
            <div>
              <label className="block text-sm font-normal text-custom-blue mb-1">
                No. of Traveler
                <span className="text-rose-600">*</span>
              </label>
              <input
                type="number"
                max={packageData?.max_size ?? 6}
                min={packageData?.min_size ?? 1}
                className="w-full h-10 px-2 border border-custom-gray-light rounded"
                value={
                  packageData?.pricing_type === 'per_person'
                    ? formik.values.noOfTravelers || 1
                    : ''
                }
                placeholder={
                  packageData?.pricing_type !== 'per_person' &&
                  packageData?.min_size &&
                  packageData?.max_size
                    ? `${packageData.min_size} to ${packageData.max_size}`
                    : ''
                }
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  formik.setFieldValue('noOfTravelers', value);

                  formik.setFieldValue(
                    'totalPrice',
                    (
                      (packagePrice ?? packageData.price ?? 0) *
                      (packageData?.pricing_type === 'per_person' ? value : 1)
                    ).toString()
                  );
                }}
                onBlur={formik.handleBlur}
                disabled={packageData?.pricing_type !== 'per_person'}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-normal text-custom-blue mb-1">
                Email Address <span className="text-rose-600">*</span>
              </label>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full h-10 px-2 border border-custom-gray-light rounded placeholder:font-light outline-none focus-visible:ring-2"
                {...formik.getFieldProps('email')}
                onBlur={formik.handleBlur}
              />
              {!!formik.errors.email && (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-normal text-custom-blue mb-1">
                Country Code + Phone Number{' '}
                <span className="text-rose-600">*</span>
              </label>
              <PhoneInputField onChange={handlePhoneChange} />
              {!!formik.errors.phone && (
                <div className="text-red-500 text-sm">
                  {formik.errors.phone}
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-normal text-custom-blue mb-1">
              Pickup Details/Extra Requirements (optional)
            </label>
            <textarea
              className="w-full p-2 border border-custom-gray-light rounded outline-none focus-visible:ring-2"
              rows={4}
              placeholder="Enter pickup details or extra requirements"
              {...formik.getFieldProps('requirement')}
              onBlur={formik.handleBlur}
            ></textarea>
            {!!formik.errors.requirement && (
              <div className="text-red-500 text-sm">
                {formik.errors.requirement}
              </div>
            )}
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 text-custom-primary focus:ring-custom-blue border-gray-300 rounded outline-none focus-visible:ring-2"
              onChange={(event) => setAcceptTerms(event.target.checked)}
            />
            <label
              htmlFor="terms"
              className="ml-2 block text-sm font-normal text-custom-blue"
            >
              I accept terms and conditions
            </label>
          </div>

          <button
            type="submit"
            className={`${acceptTerms ? 'text-custom-primary bg-custom-blue hover:bg-opacity-95 hover:shadow-lg' : 'text-custom-gray bg-custom-blue/50'} w-full py-3 px-6 rounded-md`}
            disabled={!acceptTerms}
          >
            Proceed
          </button>
        </form>
        <aside className="col-span-3 md:col-span-1 bg-custom-blue px-3 py-5">
          <div className="flex flex-col justify-between h-full">
            <div>
              <div>
                <h2 className="text-lg font-medium text-custom-primary mb-2">
                  Review Order Details
                </h2>
                <div className="mb-4">
                  <h3 className="text-white text-sm font-medium mb-2">
                    {packageName}
                  </h3>
                  <div className="px-2 py-3 bg-custom-gray/5 flex flex-col gap-2">
                    <div className="flex items-start justify-between">
                      <p className="shrink-0 text-custom-gray text-xs font-light">
                        Duration:
                      </p>
                      <p className="text-white text-xs font-light text-right">
                        1 Day
                      </p>
                    </div>
                    <div className="flex items-start justify-between">
                      <p className="shrink-0 text-custom-gray text-xs font-light">
                        Trip Start:
                      </p>
                      <p className="text-white text-xs font-light text-right">
                        2024-06-27
                      </p>
                    </div>
                    <div className="flex items-start justify-between">
                      <p className="shrink-0 text-custom-gray text-xs font-light">
                        No. of Traveler:
                      </p>
                      {packageData?.pricing_type === 'per_person' ? (
                        <p className="text-white text-xs font-light text-right">
                          {packageData.min_size} to {packageData.max_size}{' '}
                          Person(s)
                        </p>
                      ) : (
                        packageData?.min_size &&
                        packageData?.max_size && (
                          <p className="text-white text-xs font-light text-right">
                            {packageData.min_size} to {packageData.max_size}{' '}
                            Person(s)
                          </p>
                        )
                      )}
                    </div>
                    {/* <div className="flex items-start justify-between">
                      <p className="shrink-0 text-custom-gray text-xs font-light">
                        Advance Payable:
                      </p>
                      <p className="text-white text-xs font-light text-right">
                        US$2150
                      </p>
                    </div> */}
                  </div>
                </div>
              </div>
              <hr className="my-4 border-custom-gray/10" />
              <div className="mb-4">
                <h2 className="text-lg font-medium text-custom-primary mb-2">
                  Payment Details
                </h2>
                <div className="px-2 py-3 bg-custom-gray/5 flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <p className="shrink-0 text-custom-gray text-xs font-light">
                      Package Price:
                      <br />
                      (US${packagePrice} x{' '}
                      {packageData?.pricing_type === 'fixed'
                        ? `${packageData.min_size} to ${packageData.max_size}`
                        : `${formik.values.noOfTravelers} `}
                      ) Person(s)
                    </p>
                    <p className="text-white text-xs font-light text-right">
                      US${formik.values['totalPrice']}
                    </p>
                  </div>
                  <div className="flex items-start justify-between">
                    <p className="shrink-0 text-custom-gray text-xs font-light">
                      Total Price:
                    </p>
                    <p className="text-white text-xs font-light text-right">
                      US${formik.values['totalPrice']}
                    </p>
                  </div>
                  {/* <div className="flex items-start justify-between">
                    <p className="shrink-0 text-custom-gray text-xs font-light">
                      Payable Now:
                    </p>
                    <p className="text-white text-xs font-light text-right">
                      US$2150
                    </p>
                  </div>
                  <div className="flex items-start justify-between">
                    <p className="text-custom-gray text-xs font-light">
                      The balance of US$2150 is payable upon arrival.
                    </p>
                  </div> */}
                </div>
              </div>
            </div>
            <p className="text-custom-gray font-light text-xs">
              This is a 3D secure and SSL encrypted payment. Your card details
              are safe!
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BookingForm;
