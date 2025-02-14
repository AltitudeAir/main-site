'use client';
import { useEffect, useState } from 'react';
// import Rellax from 'rellax';
import Mission from '@/app/(components)/(modules)/Mission';
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks';
import { RootState } from '@/core/redux/store';
import axiosInst from '@/core/utils/axoisInst';
import { constants } from '@/core/utils/constants';
import { parseHtml } from '@/core/utils/helper';
import crewApi from '@/modules/crew/crewApi';
import Image from 'next/image';

interface BODsType {
  id: number;
  director?: string;
  position?: string;
  image?: string;
  fname?: string;
  lname?: string;
  // Define other properties based on the data structure
}

interface BODMessageType {
  id: number;
  introduction?: string | undefined;
  content?: string | undefined;
  image?: string | undefined;
}

interface CrewsType {
  id: number;
  team: string;
  image?: string;
  fname?: string;
  lname?: string;
  type?: SubType;
  onType?: string;
  totalTime?: string;
  description?: string;
  // Define other properties based on the data structure
}

interface SubType {
  title: string;
}
// export const metadata: Metadata = {
//   title: '...',
//   description: '...',
// };

export default function About() {
  const [BODs, setBODs] = useState<BODsType[]>([]);
  const dispatch = useAppDispatch();
  const [crews, setCrews] = useState<CrewsType[]>([]);
  const [BODMessage, setBODMessage] = useState<BODMessageType>({
    id: 1,
    introduction: '',
    content: '',
    image: '',
  });

  useEffect(() => {
    dispatch(crewApi.endpoints.getAllCrew.initiate());
  }, [dispatch]);

  const crewData = useAppSelector(
    (state: RootState) =>
      crewApi.endpoints.getAllCrew.select()(state)?.data || []
  );

  useEffect(() => {
    axiosInst
      .get('/BOD/')
      .then((result) => {
        const data = result.data.data;
        setBODs(data);
      })
      .catch((err) => {
        console.log(err.response);
      });

    axiosInst
      .get('/BODMessage/')
      .then((result) => {
        const data = result.data.data;
        setBODMessage(data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const mainClass = {
    backgroundImage: 'url(/images/banner/banner-2.webp)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };
  const mainHeading = {
    fontFamily: 'BankGothic-Regular',
    wordSpacing: '5px',
  };

  return (
    <main className="bg-custom-bg">
      <div
        className={`relative h-[80vh] w-full flex items-end justify-center`}
        style={mainClass}
      >
        <h2
          className="text-5xl mb-16 z-10 text-white text-center"
          style={mainHeading}
        >
          ABOUT US
        </h2>
        <div className="absolute bottom-0 left-0 top-0 right-0 bg-gradient-to-t from-custom-blue to-transparent"></div>
      </div>

      <section className="introduction" id="overview">
        <div className="intro_text_wrapper">
          <h2 className="text-2xl font-bold mb-4">INTRODUCTION</h2>
          <div className="text-custom-text text-base flex flex-col gap-4">
            {parseHtml(BODMessage?.introduction ?? '')}
          </div>
        </div>
      </section>

      <section className="director_section" id="message">
        <div className="h2_wrapper">
          <h2>MESSAGE FROM THE EXECUTIVE CHAIRMAN</h2>
        </div>
        <div className="director_message_wrapper">
          <div className="image_wrapper relative ">
            <Image
              width={100}
              height={100}
              //   fill
              quality={75}
              className="rounded-md"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                e.currentTarget.src = '/images/errors/placeholder.webp';
              }}
              src={constants.baseUrl + BODMessage?.image}
              alt="BODs Image"
            />
          </div>
          <div className="text_wrapper text-base flex flex-col gap-2">
            {parseHtml(BODMessage?.content ?? '')}
            <span>{BODs[0]?.director}</span>
            <span>{BODs[0]?.position}</span>
          </div>
        </div>
      </section>

      <section className="three_info_section" id="board_info">
        <div className="crew_info_wrapper">
          <div className="h2_wrapper">
            <h2>BOARD &nbsp; OF &nbsp; DIRECTORS</h2>
          </div>

          <div className="card_container">
            {BODs &&
              BODs.map((member) => {
                return (
                  <div className="crew_card" key={member.id}>
                    <div className="image_overlay_wrapper relative">
                      <Image
                        width={100}
                        height={100}
                        quality={75}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={constants.baseUrl + member?.image}
                        alt="Crew Image"
                        onError={(e) => {
                          e.currentTarget.src =
                            '/images/errors/placeholder.webp';
                        }}
                      />
                      <div className="overlay" />
                      <div className="overlay_container">
                        <h2 className="overlay_name">
                          {member.fname + ' ' + member.lname}
                        </h2>
                        <h3>Board Member</h3>
                      </div>
                    </div>
                    <div className="person_info">
                      <h2 className="name">
                        {member.fname + ' ' + member.lname}
                      </h2>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      <section className="crew_info_section bg-dark" id="crew">
        <div className="crew_info_wrapper">
          <div className="h2_wrapper">
            <h2>OUR &nbsp; CREWS</h2>
          </div>

          <div className="card_container">
            {crewData &&
              crewData?.map((member, index) => {
                if (member.team === 'crew') {
                  return (
                    <div className="crew_card" key={index}>
                      <div className="image_overlay_wrapper relative">
                        <Image
                          src={member.image as string}
                          alt={member.fname ?? ''}
                          width={100}
                          height={100}
                          quality={75}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          onError={(e) => {
                            e.currentTarget.src =
                              '/images/errors/placeholder.webp';
                          }}
                        />
                        <div className="overlay" />
                        <div className="overlay_container">
                          <h2 className="overlay_name">
                            {member.fname + ' ' + member.lname}
                          </h2>
                          <p className="type">
                            <strong>
                              {member.type?.title?.toUpperCase()}Captain
                            </strong>
                            <br />
                          </p>
                          <h3 className="cap-details">
                            <p>
                              <strong>On Type:</strong>&ensp;
                              {member.onType?.split(':')[0]} Hr{' '}
                              {member.onType?.split(':')[1]} Min
                              <br />
                              <strong>Air Time:</strong>&ensp;
                              {member.totalTime?.split(':')[0]} Hr{' '}
                              {member.totalTime?.split(':')[1]} Min
                            </p>
                          </h3>
                        </div>
                      </div>
                      <div className="person_info">
                        <h2 className="name">
                          {member.fname + ' ' + member.lname}
                        </h2>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
          </div>
        </div>
      </section>

      <section className="three_info_section">
        <div className="crew_info_wrapper">
          <div className="h2_wrapper">
            <h2>MANAGEMENT &nbsp; TEAM</h2>
          </div>

          <div className="card_container">
            {crewData?.map((member, index) => {
              if (member.team === 'management') {
                return (
                  <div className="crew_card" key={index}>
                    <div className="image_overlay_wrapper relative">
                      <Image
                        width={100}
                        height={100}
                        quality={75}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={member.image as string}
                        alt="Crew Image"
                        onError={(e) => {
                          e.currentTarget.src =
                            '/images/errors/placeholder.webp';
                        }}
                      />
                      <div className="overlay" />
                      <div className="overlay_container">
                        <h2 className="overlay_name">
                          {member.fname + ' ' + member.lname}
                        </h2>
                        <div className="position">
                          {parseHtml(member.description ?? '')}
                        </div>
                      </div>
                    </div>
                    <div className="person_info">
                      <h2 className="name">
                        {member.fname + ' ' + member.lname}
                      </h2>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </section>

      <section className="three_info_section bg-dark">
        <div className="crew_info_wrapper">
          <div className="h2_wrapper">
            <h2>TECHNICAL &nbsp; TEAM</h2>
          </div>

          <div className="card_container">
            {crewData?.map((member, index) => {
              if (member.team === 'technical') {
                return (
                  <div className="crew_card" key={index}>
                    <div className="image_overlay_wrapper relative">
                      <Image
                        width={100}
                        height={100}
                        quality={75}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={member.image as string}
                        alt="Crew Image"
                        onError={(e) => {
                          e.currentTarget.src =
                            '/images/errors/placeholder.webp';
                        }}
                      />
                      <div className="overlay" />
                      <div className="overlay_container">
                        <h2 className="overlay_name">
                          {member.fname + ' ' + member.lname}
                        </h2>
                        <div className="position">
                          {parseHtml(member.description ?? '')}
                        </div>
                      </div>
                    </div>
                    <div className="person_info">
                      <h2 className="name">
                        {member.fname + ' ' + member.lname}
                      </h2>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </section>

      <section className="three_info_section">
        <div className="crew_info_wrapper">
          <div className="h2_wrapper">
            <h2>QUALITY &nbsp; TEAM</h2>
          </div>

          <div className="card_container">
            {crewData?.map((member, index) => {
              if (member.team === 'quality') {
                return (
                  <div className="crew_card" key={index}>
                    <div className="image_overlay_wrapper relative">
                      <Image
                        width={100}
                        height={100}
                        quality={75}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={member.image as string}
                        alt="Crew Image"
                        onError={(e) => {
                          e.currentTarget.src =
                            '/images/errors/placeholder.webp';
                        }}
                      />
                      <div className="overlay" />
                      <div className="overlay_container">
                        <h2 className="overlay_name">
                          {member.fname + ' ' + member.lname}
                        </h2>
                        <div className="position">
                          {parseHtml(member.description ?? '')}
                        </div>
                      </div>
                    </div>
                    <div className="person_info">
                      <h2 className="name">
                        {member.fname + ' ' + member.lname}
                      </h2>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </section>

      <section className="three_info_section bg-dark">
        <div className="crew_info_wrapper">
          <div className="h2_wrapper">
            <h2>SAFETY &nbsp; TEAM</h2>
          </div>

          <div className="card_container">
            {crewData?.map((member, index) => {
              if (member.team === 'safety') {
                return (
                  <div className="crew_card" key={index}>
                    <div className="image_overlay_wrapper relative">
                      <Image
                        width={100}
                        height={100}
                        quality={75}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={member.image as string}
                        alt="Crew Image"
                        onError={(e) => {
                          e.currentTarget.src =
                            '/images/errors/placeholder.webp';
                        }}
                      />
                      <div className="overlay" />
                      <div className="overlay_container">
                        <h2 className="overlay_name">
                          {member.fname + ' ' + member.lname}
                        </h2>
                        <div className="position">
                          {parseHtml(member.description ?? '')}
                        </div>
                      </div>
                    </div>
                    <div className="person_info">
                      <h2 className="name">
                        {member.fname + ' ' + member.lname}
                      </h2>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </section>

      <section className="three_info_section">
        <div className="crew_info_wrapper">
          <div className="h2_wrapper">
            <h2>
              CARGO &nbsp; SLING &nbsp; AND &nbsp; HUMAN &nbsp; LONGLINE &nbsp;
              RESCUE &nbsp; MISSION
            </h2>
          </div>

          <div className="card_container">
            {crews?.map((member) => {
              if (member.team === 'mission') {
                return (
                  <div className="crew_card" key={member.id}>
                    <div className="image_overlay_wrapper relative">
                      <Image
                        width={100}
                        height={100}
                        quality={75}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={constants.baseUrl + member.image}
                        alt="Crew Image"
                        onError={(e) => {
                          e.currentTarget.src =
                            '/images/errors/placeholder.webp';
                        }}
                      />
                      <div className="overlay" />
                      <div className="overlay_container">
                        <h2 className="overlay_name">
                          {member.fname + ' ' + member.lname}
                        </h2>
                        <div className="position">
                          {parseHtml(member.description ?? '')}
                        </div>
                      </div>
                    </div>
                    <div className="person_info">
                      <h2 className="name">
                        {member.fname + ' ' + member.lname}
                      </h2>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </section>

      <section className="mission_and_vision" id="mission&vision">
        <div className="title_wrapper">
          <h1>MISSION AND VISION</h1>
          <div className="highlight" />
          <div className="bottom-border" />
        </div>

        <div className="content_wrapper">
          <div className="mv_wrapper">
            <div className="heading_container">
              <h2>MISSION</h2>
            </div>
            <div className="mission_para_wrapper w-full">
              <ul>
                <li>Work safely and efficiently</li>
                <li>Seek constant improvement to enhance our performance</li>
                <li>Develop innovative partnerships with our clients</li>
                <li>Prioritize our employees’ contributions and well-being</li>
                <li>Ensure customer satisfaction</li>
              </ul>
            </div>
          </div>

          <div className="mv_wrapper">
            <div className="heading_container">
              <h2>VISION</h2>
            </div>
            <div className="mission_para_wrapper w-full">
              <ul>
                <li>Exceed customer expectations</li>
                <li>Lead with our exceptional safety and standards</li>
              </ul>
            </div>
          </div>

          <div className="mv_wrapper">
            <div className="heading_container">
              <h2>VALUES</h2>
            </div>
            <div className="mission_para_wrapper w-full">
              <ul>
                <li>Excellence</li>
                <li>Safety</li>
                <li>Quality</li>
                <li>Teamwork</li>
                <li>Integrity</li>
              </ul>
            </div>
          </div>

          <div className="mv_wrapper">
            <div className="heading_container">
              <h2>GOAL</h2>
            </div>
            <div className="mission_para_wrapper w-full">
              <ul>
                <li>Safety is our number one goal</li>
                <li>
                  Inventive, punctual, efficient, cost-effective, dependable,
                  and quality services
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="h-auto w-full pb-12" id="statistics">
        <div className="mt-12 text-center font-bankGothic">
          <h2 className="h2_wrapper">MISSION&nbsp;STATISTICS</h2>
        </div>
        <div className="w-1/2 aspect-w-1 aspect-h-1 flex justify-center items-center  relative">
          <Mission />
        </div>
      </section>
    </main>
  );
}
