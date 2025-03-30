/* eslint-disable react/display-name */
/* eslint-disable @next/next/no-img-element */
// import mapboxgl from '!mapbox-gl';
import axiosInstance from '@/core/utils/axoisInst';
import { dateFromSqlDateTime } from '@/core/utils/helper';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import mapboxgl from 'mapbox-gl';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
// import { useNotificationContext } from '../../contexts/NotifyContext';
// import axiosInstance from '../../util/axiosInst';
// import { dateFromSqlDateTime } from '../../util/helper';

interface FillStateType {
  peopleCount: boolean;
  travelDate: boolean;
  destination: boolean;
  budget: boolean;
  personalInfo: boolean;
}

export default function StepForm({ hide }: any) {
  const [filledState, setFilledState] = useState<FillStateType>({
    peopleCount: false,
    travelDate: false,
    destination: false,
    budget: false,
    personalInfo: false,
  });

  const [pickedStep, setPickedStep] = useState(0);

  const [formState, setFormState] = useState({
    peopelCount: {
      traveller_count: 1,
    },
    travelDate: {
      departure_date: new Date().toISOString().split('T')[0],
      // arrival_date: new Date().toISOString().split("T")[0]
    },
    destination: {
      service: '',
      pickup: [null, null],
      destination: [null, null],
    },
    budget: {
      max_budget: 1500000,
      min_budget: 0,
    },
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      tel: '',
      details: '',
    },
  });

  // Individual internal state
  const [count, setCount] = useState(1);
  const [dateState, setDateState] = useState(1);
  const [destinations, setDestinations] = useState([]);
  const [clickedService, setClickedService] = useState(null);

  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(1500000);
  const [maxMinVal, setMaxMinVal] = useState(0);
  const [minMaxVal, setMinMaxVal] = useState(1500000);

  useEffect(() => {
    downloadSubDest();
  }, []);

  function downloadSubDest() {
    axiosInstance.get('/service/').then((res: any) => {
      setDestinations(res.data.data);
    });
  }

  function removeCompleted(index: number) {
    let obj: FillStateType = { ...filledState };
    let count = 0;
    for (const key in obj) {
      if (count >= index) {
        (obj as any)[key] = false;
      }
      count++;
    }
    setFilledState(obj);
  }

  const [pickDestPos, setPickDestPos] = useState({
    pickup: [null, null],
    destination: [null, null],
  });
  const [pickupChosenBy, setPickupChosenBy] = useState(null);

  return (
    <div className="step_form_container">
      <div
        className="cross_container"
        style={{ justifyContent: 'flex-end', paddingRight: '25px' }}
      ></div>
      <StepsContainer
        pickedStep={pickedStep}
        setPickedStep={setPickedStep}
        filledState={filledState}
        setFilledState={setFilledState}
        removeCompleted={removeCompleted}
      />

      {pickedStep === 0 ? (
        <PeopleCount
          formIniState={formState.peopelCount}
          setFormState={setFormState}
          setPickedStep={setPickedStep}
          count={count}
          setCount={setCount}
          setFilledState={setFilledState}
        />
      ) : null}

      {pickedStep === 1 ? (
        <TravelDate
          formIniState={formState.travelDate}
          setFormState={setFormState}
          setPickedStep={setPickedStep}
          dateState={dateState}
          setDateState={setDateState}
          setFilledState={setFilledState}
        />
      ) : null}

      {pickedStep === 2 ? (
        <Destination
          formIniState={formState.travelDate}
          setFormState={setFormState}
          setPickedStep={setPickedStep}
          setFilledState={setFilledState}
          destinations={destinations}
          clickedService={clickedService}
          setClickedService={setClickedService}
          pickDestPos={pickDestPos}
          setPickDestPos={setPickDestPos}
          pickupChosenBy={pickupChosenBy}
          setPickupChosenBy={setPickupChosenBy}
        />
      ) : null}

      {pickedStep === 3 ? (
        <BudgetRange
          formIniState={formState.budget}
          setFormState={setFormState}
          setFilledState={setFilledState}
          setPickedStep={setPickedStep}
          minVal={minVal}
          setMinVal={setMinVal}
          maxVal={maxVal}
          setMaxVal={setMaxVal}
          minMaxVal={minMaxVal}
          setMinMaxVal={setMinMaxVal}
          maxMinVal={maxMinVal}
          setMaxMinVal={setMaxMinVal}
        />
      ) : null}

      {pickedStep === 4 ? (
        <PersonalInfo
          formIniState={formState.personalInfo}
          setFormState={setFormState}
          setFilledState={setFilledState}
          setPickedStep={setPickedStep}
          formState={formState}
        />
      ) : null}

      {pickedStep === 5 ? <EndScreen hide={hide} /> : null}
    </div>
  );
}

function StepsContainer({
  pickedStep,
  setPickedStep,
  filledState,
  setFilledState,
  removeCompleted,
}: {
  pickedStep: number;
  setPickedStep: Dispatch<SetStateAction<number>>;
  filledState: any;
  setFilledState: Dispatch<SetStateAction<FillStateType>>;
  removeCompleted: (index: any) => void;
}) {
  const pickLowerStep = (step: any) => {
    if (step >= pickedStep) {
      return;
    }
    removeCompleted(step);
    setPickedStep(step);
  };

  return (
    <ul className="steps_container_ul">
      <li
        className={`steps_container_li 
        ${filledState.peopelCount ? 'li_after_filled' : 'li_after_not_filled'}
        ${pickedStep === 0 ? 'li_picked' : ''}
        `}
        onClick={() => {
          pickLowerStep(0);
          setFilledState((prevState) => {
            return {
              ...prevState,
              peopelCount: false,
            };
          });
        }}
      >
        <img src="/icons/form/group.svg" alt="Form Step 1" />
      </li>

      <li
        className={`steps_container_li 
        ${filledState.travelDate ? 'li_after_filled' : 'li_after_not_filled'}
        ${pickedStep === 1 ? 'li_picked' : ''}
        `}
        onClick={() => {
          pickLowerStep(1);
          setFilledState((prevState) => {
            return {
              ...prevState,
              travelDate: false,
            };
          });
        }}
      >
        <img src="/icons/form/calendar.svg" alt="Form Step 1" />
      </li>

      <li
        className={`steps_container_li 
        ${filledState.destination ? 'li_after_filled' : 'li_after_not_filled'}
        ${pickedStep === 2 ? 'li_picked' : ''}
        `}
        onClick={() => {
          pickLowerStep(2);
        }}
      >
        <img src="/icons/form/placeholder.svg" alt="Form Step 1" />
      </li>

      <li
        className={`steps_container_li 
        ${filledState.budget ? 'li_after_filled' : 'li_after_not_filled'}
        ${pickedStep === 3 ? 'li_picked' : ''}
        `}
        onClick={() => {
          pickLowerStep(3);
        }}
      >
        <img src="/icons/form/money.svg" alt="Form Step 1" />
      </li>

      <li
        className={`steps_container_li 
        ${filledState.personalInfo ? 'li_after_filled' : 'li_after_not_filled'}
        ${pickedStep === 4 ? 'li_picked' : ''}
        `}
        onClick={() => {
          pickLowerStep(4);
        }}
      >
        <img src="/icons/form/user.svg" alt="Form Step 1" />
      </li>
    </ul>
  );
}

function PeopleCount({
  formIniState,
  setFormState,
  setPickedStep,
  count,
  setCount,
  setFilledState,
}: any) {
  function setFormValues(values: any) {
    if (count === 1) {
      values.traveller_count = 1;
    }
    if (count === 2 && values.traveller_count === 1) {
      values.traveller_count = 2;
    }
    setFormState((prevState: any) => {
      return {
        ...prevState,
        peopelCount: values,
      };
    });
    setPickedStep(1);
    setFilledState((prevState: any) => {
      return {
        ...prevState,
        peopelCount: true,
      };
    });
  }

  return (
    <div className="people_count_container">
      <h2>Number of people travelling</h2>
      <div className="option_container_one mt-4">
        <div
          className={`single ${
            count === 1 ? 'option_container_one_picked' : ''
          }`}
          onClick={() => {
            setCount(1);
          }}
        >
          <img src="/icons/form/user.svg" alt="Form Step 1" />
          <p>Single</p>
        </div>
        <div
          className={`group ${
            count === 2 ? 'option_container_one_picked' : ''
          }`}
          onClick={() => {
            setCount(2);
          }}
        >
          <img src="/icons/form/group.svg" alt="Form Step 1" />
          <p>Group</p>
        </div>
      </div>
      <div className="form_container">
        <Formik
          initialValues={formIniState}
          onSubmit={(values) => {
            values.traveller_count = Number(values.traveller_count);
            setFormValues(values);
          }}
          validationSchema={Yup.object({
            traveller_count: Yup.number()
              .max(6, 'Must be 6 at max')
              .min(1, 'Group should have atleast 2 members')
              .required('Required'),
          })}
        >
          <Form>
            {count === 2 ? (
              <>
                <label htmlFor="">Traveller count:</label>
                <Field name="traveller_count" as="select">
                  <option value="2">2 Person</option>
                  <option value="3">3 Person</option>
                  <option value="4">4 Person</option>
                  <option value="5">5 Person</option>
                  <option value="6">5+ Person</option>
                </Field>
              </>
            ) : (
              <div className="input_wrapper">
                <Field name="traveller_count" type="text" />
              </div>
            )}
            <br />
            <button className="action-button single_button" type="submit">
              NEXT
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

function TravelDate({
  formIniState,
  setFormState,
  setPickedStep,
  setFilledState,
  dateState,
  setDateState,
}: any) {
  // const [arrivalMin, setArrivalMin] = useState(new Date().toISOString().split("T")[0]);
  const [departureVal, setDepartureVal] = useState(formIniState.departure_date);
  // const [arrivalVal, setArrivalVal] = useState(formIniState.arrival_date);

  function formSubmitHandler(values: any) {
    if (dateState === 1) {
      setFormState((prevState: any) => {
        return {
          ...prevState,
          travelDate: { departure_date: departureVal },
        };
      });
    } else {
      setFormState((prevState: any) => {
        return {
          ...prevState,
          travelDate: {
            departure_date: null,
            // arrival_date: null
          },
        };
      });
    }
    setPickedStep(2);
    setFilledState((prevState: any) => {
      return {
        ...prevState,
        travelDate: true,
      };
    });
  }

  return (
    <div className="travel_date_container">
      <h2>Travel Date</h2>
      <div className="option_container_one">
        <div
          className={`single ${
            dateState === 1 ? 'option_container_one_picked' : ''
          }`}
          onClick={() => {
            setDateState(1);
          }}
        >
          <img src="/icons/form/calendar.svg" alt="Form Step 1" />
          <p>Exact Date</p>
        </div>
        <div
          className={`group ${
            dateState === -1 ? 'option_container_one_picked' : ''
          }`}
          onClick={() => {
            setDateState(-1);
          }}
        >
          <img src="/icons/form/calendar.svg" alt="Form Step 1" />
          <p>Decide Later</p>
        </div>
      </div>

      <div className="date_form_container">
        <Formik
          initialValues={formIniState}
          onSubmit={(values) => {
            formSubmitHandler(values);
          }}
          validationSchema={Yup.object({
            departure_date: Yup.date()
              .min(
                new Date().toISOString().split('T')[0],
                'Date should be at least as of today'
              )
              .required('Required')
              .nullable(),
            // arrival_date: Yup.date()
            //     .min(new Date().toISOString().split("T")[0], 'Date should be at least as of today')
            //     .required("Required")
            //     .nullable(),
          })}
        >
          <Form>
            {dateState === 1 ? (
              <>
                <div className="parent_wrapper">
                  <div className="date_field_wrapper">
                    <label htmlFor="">Departure Date:</label>
                    <Field
                      name="departure_date"
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e: any) => {
                        setDepartureVal(e.target.value);
                      }}
                      value={departureVal}
                    ></Field>
                    <p>
                      <ErrorMessage name="departure_date" />
                    </p>
                  </div>

                  {/* <div className="date_field_wrapper">
                                    <label htmlFor="">Arrival Date:</label>
                                    <Field
                                        name="arrival_date"
                                        type="date"
                                        min={arrivalMin}
                                        onChange={(e) => { setArrivalVal(e.target.value) }}
                                        value={arrivalVal}
                                    ></Field>
                                    <p><ErrorMessage name="arrival_date" /></p>
                                </div> */}
                </div>
              </>
            ) : null}
            <br />
            <button
              className="action-button single_button"
              type="submit"
              onClick={dateState === -1 ? formSubmitHandler : () => {}}
            >
              NEXT
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

function Destination({
  setFormState,
  setPickedStep,
  setFilledState,
  destinations,
  clickedService,
  setClickedService,
  pickDestPos,
  setPickDestPos,
  pickupChosenBy,
  setPickupChosenBy,
}: any) {
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [currentlyClicked, setCurrentlyClicked] = useState(-1);
  const currentlyRef = useRef(-1);

  mapboxgl.accessToken =
    'pk.eyJ1IjoiaWN5aG90c2hvdG8iLCJhIjoiY2tmeHQwc3E5MjRxajJxbzhmbDN1bjJ5aiJ9.mNKmhIjRyKxFkJYrm4dMqg';
  const mapContainer = useRef(null);
  const map = useRef<any>(null);
  const lng = 85.3343;
  const lat = 27.7293;
  const zoom = 8;

  let pickupMarker = useRef<any>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) {
      return;
    } // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/icyhotshoto/ckto9qg2x123s18kkno3md7h4',
      center: [lng, lat],
      zoom: zoom,
    });
    if (map.current != null) {
      (map.current as any).addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserHeading: true,
        })
      );
    }

    pickupMarker.current = new mapboxgl.Marker({ color: '#00db00', scale: 3 })
      .setLngLat(pickDestPos.pickup)
      .addTo(map.current);

    const destinationMarker = new mapboxgl.Marker({
      color: '#ff002b',
    })
      .setLngLat(pickDestPos.destination)
      .addTo(map.current);

    (map.current as any).on('click', (e: any) => {
      if (currentlyRef.current === 2) {
        (pickupMarker.current as any).setLngLat([e.lngLat.lng, e.lngLat.lat]);
        setPickDestPos((prev: any) => {
          return {
            ...prev,
            pickup: [e.lngLat.lng, e.lngLat.lat],
          };
        });
        setPickupChosenBy(2);
      }
      if (currentlyRef.current === 3) {
        destinationMarker.setLngLat([e.lngLat.lng, e.lngLat.lat]);
        setPickDestPos((prev: any) => {
          return {
            ...prev,
            destination: [e.lngLat.lng, e.lngLat.lat],
          };
        });
      }
      setCurrentlyClicked(-1);
      currentlyRef.current = -1;
    });
  }, [pickDestPos, setPickDestPos, setPickupChosenBy]);

  function setCurrentLocation() {
    setCurrentlyClicked(1);
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (e) => {
        setLoading(false);
        setCurrentlyClicked(-1);
        currentlyRef.current = -1;
        setPickupChosenBy(1);
        (pickupMarker.current as any).setLngLat([
          e.coords.longitude,
          e.coords.latitude,
        ]);
        setPickDestPos((prevState: any) => {
          return {
            ...prevState,
            pickup: [e.coords.longitude, e.coords.latitude],
          };
        });
      },
      () => {
        alert('Location permission denied!! Pick Location Manually.');
        setLoading(false);
        setCurrentlyClicked(-1);
        currentlyRef.current = -1;
        setPickupChosenBy(1);
      }
    );
  }

  function formSubmitHandler() {
    if (
      !clickedService ||
      !pickDestPos.pickup[0] ||
      !pickDestPos.destination[0]
    ) {
      setError(1);
      return;
    }
    setFormState((prevState: any) => {
      return {
        ...prevState,
        destination: {
          service: clickedService,
          pickup: pickDestPos.pickup,
          destination: pickDestPos.destination,
        },
      };
    });
    setPickedStep(3);
    setFilledState((prevState: any) => {
      return {
        ...prevState,
        destination: true,
      };
    });
  }

  function serviceClickedHandler(key: any) {
    setClickedService(key);
    setError(null);
  }

  return (
    <div className="destination_container">
      <h2>Where are you headed?</h2>
      <p>Select Services</p>

      <div className="destinations_wrapper">
        <div className="option_container_one">
          {destinations.map((item: any) => {
            return (
              <div
                className={`service-item ${
                  clickedService === item.id
                    ? 'option_container_one_picked'
                    : ''
                }`}
                key={item.id}
                onClick={() => {
                  serviceClickedHandler(item.id);
                }}
              >
                <p>{item.title}</p>
              </div>
            );
          })}
        </div>

        <p>Select Pickup & Destination</p>
        <div className="dest_map_container">
          <div className="step_map-wrapper">
            <div className="w-96 h-52 overflow-hidden" ref={mapContainer}></div>
          </div>
          <div className="map_controls">
            <p>Choose Pickup Location:</p>
            <div className="current_pos">
              <div
                className={`${currentlyClicked === 1 ? 'active_pos_util' : ''} 
                            ${
                              pickupChosenBy === 1 &&
                              pickDestPos.pickup[0] &&
                              currentlyClicked !== 1
                                ? 'pos_confirmed'
                                : ''
                            }`}
                onClick={setCurrentLocation}
              >
                Current Location
              </div>
              <div
                className={`${currentlyClicked === 2 ? 'active_pos_util' : ''} 
                            ${
                              pickupChosenBy === 2 &&
                              pickDestPos.pickup[0] &&
                              currentlyClicked !== 2
                                ? 'pos_confirmed'
                                : ''
                            }`}
                onClick={() => {
                  setCurrentlyClicked(2);
                  currentlyRef.current = 2;
                }}
              >
                Choose Manually
              </div>
            </div>
            {loading && <p className="location_loading">Location Loading...</p>}
            <p>Choose Destination:</p>
            <div className="current_pos">
              <div
                onClick={() => {
                  setCurrentlyClicked(3);
                  currentlyRef.current = 3;
                }}
                className={`${currentlyClicked === 3 ? 'active_pos_util' : ''} 
                        ${
                          pickDestPos.destination[0] && currentlyClicked !== 3
                            ? 'pos_confirmed'
                            : ''
                        }`}
              >
                Choose Location
              </div>
            </div>
          </div>
        </div>
      </div>
      {error ? (
        <p className="error_para">
          *Pick a service and pickup & drop locations
        </p>
      ) : null}
      <button
        className="action-button single_button"
        onClick={formSubmitHandler}
      >
        NEXT
      </button>
    </div>
  );
}

function BudgetRange({
  formIniState,
  setFormState,
  setPickedStep,
  setFilledState,
  minVal,
  setMinVal,
  maxVal,
  setMaxVal,
  maxMinVal,
  setMaxMinVal,
  minMaxVal,
  setMinMaxVal,
}: any) {
  function formSubmitHandler() {
    if (
      Number(maxVal) < Number(minVal) ||
      Number(maxVal) < 0 ||
      Number(minVal) < 0
    ) {
      alert('Invalid values entered');
      return;
    }
    setFormState((prevState: any) => {
      return {
        ...prevState,
        budget: {
          max_budget: Number(maxVal),
          min_budget: Number(minVal),
        },
      };
    });

    setPickedStep(4);
    setFilledState((prevState: any) => {
      return {
        ...prevState,
        budget: true,
      };
    });
  }

  return (
    <div className="budget_step_section">
      <h2>What about your budget?</h2>
      <p>Your Budget Range:</p>
      <div className="input_wrapper">
        <Formik
          initialValues={formIniState}
          onSubmit={() => {
            formSubmitHandler();
          }}
          validationSchema={Yup.object({
            max_budget: Yup.number()
              .min(0, 'The value cannot be less than zero.')
              .max(1500000, 'Max budget cannot exceed 15 lakh.')
              .required('*Required Value'),
            min_budget: Yup.number()
              .min(0, 'The value cannot be less than zero.')
              .max(1500000, 'Min budget cannot exceed 15 lakh.')
              .required('*Required Value'),
          })}
        >
          <Form>
            <div className="parent_wrapper">
              <div className="budget_field_wrapper">
                <label htmlFor="">Minimum Budget:</label>
                <Field
                  name="min_budget"
                  type="number"
                  min={0}
                  max={minMaxVal}
                  onChange={(e: any) => {
                    setMaxMinVal(e.target.value);
                    setMinVal(e.target.value);
                  }}
                  value={minVal}
                ></Field>
                <p>
                  <ErrorMessage name="min_budget" />
                </p>
              </div>

              <div className="budget_field_wrapper">
                <label htmlFor="">Maximum Budget:</label>
                <Field
                  name="max_budget"
                  type="number"
                  min={maxMinVal}
                  max={1500000}
                  onChange={(e: any) => {
                    setMinMaxVal(e.target.value);
                    setMaxVal(e.target.value);
                  }}
                  value={maxVal}
                ></Field>
                <p>
                  <ErrorMessage name="max_budget" />
                </p>
              </div>
            </div>
            <br />
            <button className="action-button single_button" type="submit">
              NEXT
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

function PersonalInfo({
  formIniState,
  setFormState,
  setPickedStep,
  setFilledState,
  formState,
}: any) {
  // const notificationContext = useNotificationContext();
  const [formSubmitted, setFormSubmitted] = useState(false);

  async function formSubmitHandler(values: any) {
    if (formSubmitted) {
      return;
    }
    setFormSubmitted(true);
    setFormState((prevState: any) => {
      return {
        ...prevState,
        personalInfo: values,
      };
    });

    const finalObj = {
      count: formState.peopelCount.traveller_count,
      travelDate: dateFromSqlDateTime(
        new Date(formState.travelDate.departure_date).toISOString()
      ),
      service: formState.destination.service,
      currentLatitude: formState.destination.pickup[1],
      currentLongitude: formState.destination.pickup[0],
      destinationLatitude: formState.destination.destination[0],
      destinationLongitude: formState.destination.destination[1],
      minbudget: formState.budget.min_budget,
      maxbudget: formState.budget.max_budget,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.tel,
      details: values.details,
    };
    let result;
    try {
      result = await axiosInstance.post('/enquiry/', finalObj, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // notificationContext.showNotification('Form Submitted.', 2000, 'Success');
    } catch (error: any) {
      // notificationContext.showNotification('Error submitting form.', 2000);
      setFormSubmitted(false);
      return;
    }

    setFormSubmitted(false);
    setFilledState((prevState: any) => {
      return {
        ...prevState,
        personalInfo: true,
      };
    });
    setPickedStep(5);
  }

  return (
    <div className="budget_step_section">
      <h2>Your Personal Info</h2>
      <Formik
        initialValues={formIniState}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(32, 'Must be less than or equal to 32 characters')
            .required('Required'),
          lastName: Yup.string()
            .max(32, 'Must be less than or equal to 32 characters')
            .required('Required'),
          email: Yup.string().email('Not a valid email').required('Required'),
          tel: Yup.string()
            .min(10, 'Number must be at least 10 digits')
            .required('Required'),
          details: Yup.string().max(5000).required('Required'),
        })}
        onSubmit={async (values) => {
          formSubmitHandler(values);
        }}
      >
        <Form>
          <div className="parent_wrapper">
            <div className="budget_field_wrapper">
              <label htmlFor="">First Name:</label>
              <Field name="firstName" type="text"></Field>
              <p>
                <ErrorMessage name="firstName" />
              </p>
            </div>
            <div className="budget_field_wrapper">
              <label htmlFor="">Last Name:</label>
              <Field name="lastName" type="text"></Field>
              <p>
                <ErrorMessage name="lastName" />
              </p>
            </div>
          </div>
          <div className="parent_wrapper">
            <div className="budget_field_wrapper">
              <label htmlFor="">Email:</label>
              <Field name="email" type="email"></Field>
              <p>
                <ErrorMessage name="email" />
              </p>
            </div>
            <div className="budget_field_wrapper">
              <label htmlFor="">Contact No. :</label>
              <Field name="tel" type="text"></Field>
              <p>
                <ErrorMessage name="tel" />
              </p>
            </div>
          </div>
          <div className="parent_wrapper">
            <div className="budget_field_wrapper">
              <label htmlFor="">Additional Details:</label>
              <Field name="details" as="textarea" rows="5" cols="56"></Field>
              <p>
                <ErrorMessage name="details" />
              </p>
            </div>
          </div>
          <button
            className="action-button final_btn"
            type="submit"
            disabled={formSubmitted}
          >
            SUBMIT
          </button>
        </Form>
      </Formik>
    </div>
  );
}

function EndScreen({ hide }: any) {
  return (
    <div className="end_screen_wrapper">
      <img src="./icons/form/checked.svg" alt="" />
      <h2>Form successfully submitted</h2>
      <button className="button-outline-light" onClick={hide}>
        Close Form
      </button>
    </div>
  );
}
