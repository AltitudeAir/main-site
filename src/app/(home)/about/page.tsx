// import Rellax from 'rellax';
import ImageWithFallback from '@/app/(components)/(elements)/ImageWithFallback';
import { Chart } from '@/app/(components)/(modules)/PieChart';
import { fetchData } from '@/core/api/api_client';
import { apiPaths } from '@/core/api/apiConstants';
import {
  ArrayResponseType,
  PaginatedResponseType,
} from '@/core/types/responseTypes';
import { parseHtml } from '@/core/utils/helper';
import { BODMessageType, BODsType } from '@/modules/bod/bodType';
import { CrewsType } from '@/modules/crew/crewType';

export default async function About() {
  const { data: bodMessageData, error: bodMessageDataError } = await fetchData<
    PaginatedResponseType<BODMessageType>
  >(apiPaths.getBodMessageUrl);

  const { data: bodData, error: bodDataError } = await fetchData<
    PaginatedResponseType<BODsType>
  >(apiPaths.getBodUrl);

  const { data: crewData, error: crewDataError } = await fetchData<
    ArrayResponseType<CrewsType>['data']
  >(apiPaths.crewallUrl);

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
          {!bodMessageDataError &&
            bodMessageData?.results?.map((item) => (
              <div
                key={item.id}
                className="text-custom-text text-base flex flex-col gap-4"
              >
                {parseHtml(item.introduction as string)}
              </div>
            ))}
        </div>
      </section>

      <section className="director_section" id="message">
        <div className="h2_wrapper">
          <h2>MESSAGE FROM THE EXECUTIVE CHAIRMAN</h2>
        </div>
        {!bodMessageDataError &&
          bodMessageData?.results?.map((item, index) => (
            <div key={index} className="director_message_wrapper">
              <div className="image_wrapper relative ">
                <ImageWithFallback
                  width={100}
                  height={100}
                  //   fill
                  quality={75}
                  className="rounded-md"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  src={item.image as string}
                  alt="BODs Image"
                />
              </div>

              <div className="text_wrapper text-base flex flex-col gap-2">
                {parseHtml(item?.content ?? '')}
              </div>
            </div>
          ))}
      </section>

      <section className="three_info_section" id="board_info">
        <div className="crew_info_wrapper">
          <div className="h2_wrapper">
            <h2>BOARD &nbsp; OF &nbsp; DIRECTORS</h2>
          </div>

          <div className="card_container">
            {!bodDataError &&
              bodData?.results?.map((item) => {
                return (
                  <div className="crew_card" key={item?.id}>
                    <div className="image_overlay_wrapper relative">
                      <ImageWithFallback
                        width={100}
                        height={100}
                        quality={75}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={item.image as string}
                        alt="Crew Image"
                      />
                      <div className="overlay" />
                      <div className="overlay_container">
                        <h2 className="overlay_name">
                          {item.fname + ' ' + item.lname}
                        </h2>
                        <h3>Board Member</h3>
                      </div>
                    </div>
                    <div className="person_info">
                      <h2 className="name">{item.fname + ' ' + item.lname}</h2>
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
            {!crewDataError &&
              crewData?.map((item, index) => {
                if (item.team === 'crew') {
                  return (
                    <div className="crew_card" key={index}>
                      <div className="image_overlay_wrapper relative">
                        <ImageWithFallback
                          src={item.image as string}
                          alt={item.fname ?? ''}
                          width={100}
                          height={100}
                          quality={75}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="overlay" />
                        <div className="overlay_container">
                          <h2 className="overlay_name">
                            {item.fname + ' ' + item.lname}
                          </h2>
                          <p className="type">
                            <strong>
                              {item.type?.title?.toUpperCase()}Captain
                            </strong>
                            <br />
                          </p>
                          <h3 className="cap-details">
                            <p>
                              <strong>On Type:</strong>&ensp;
                              {item.onType?.split(':')[0]} Hr{' '}
                              {item.onType?.split(':')[1]} Min
                              <br />
                              <strong>Air Time:</strong>&ensp;
                              {item.totalTime?.split(':')[0]} Hr{' '}
                              {item.totalTime?.split(':')[1]} Min
                            </p>
                          </h3>
                        </div>
                      </div>
                      <div className="person_info">
                        <h2 className="name">
                          {item.fname + ' ' + item.lname}
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
            {!crewDataError &&
              crewData?.map((item, index) => {
                if (item.team === 'management') {
                  return (
                    <div className="crew_card" key={index}>
                      <div className="image_overlay_wrapper relative">
                        <ImageWithFallback
                          width={100}
                          height={100}
                          quality={75}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          src={item.image as string}
                          alt="Crew Image"
                        />
                        <div className="overlay" />
                        <div className="overlay_container">
                          <h2 className="overlay_name">
                            {item.fname + ' ' + item.lname}
                          </h2>
                          <div className="position">
                            {parseHtml(item.description ?? '')}
                          </div>
                        </div>
                      </div>
                      <div className="person_info">
                        <h2 className="name">
                          {item.fname + ' ' + item.lname}
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
            {!crewDataError &&
              crewData?.map((member, index) => {
                if (member.team === 'technical') {
                  return (
                    <div className="crew_card" key={index}>
                      <div className="image_overlay_wrapper relative">
                        <ImageWithFallback
                          width={100}
                          height={100}
                          quality={75}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          src={member.image as string}
                          alt="Crew Image"
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
            {!crewDataError &&
              crewData?.map((member, index) => {
                if (member.team === 'quality') {
                  return (
                    <div className="crew_card" key={index}>
                      <div className="image_overlay_wrapper relative">
                        <ImageWithFallback
                          width={100}
                          height={100}
                          quality={75}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          src={member.image as string}
                          alt="Crew Image"
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
            {!crewDataError &&
              crewData?.map((member, index) => {
                if (member.team === 'safety') {
                  return (
                    <div className="crew_card" key={index}>
                      <div className="image_overlay_wrapper relative">
                        <ImageWithFallback
                          width={100}
                          height={100}
                          quality={75}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          src={member.image as string}
                          alt="Crew Image"
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
            {!crewDataError &&
              crewData?.map((member) => {
                if (member.team === 'mission') {
                  return (
                    <div className="crew_card" key={member.id}>
                      <div className="image_overlay_wrapper relative">
                        <ImageWithFallback
                          width={100}
                          height={100}
                          quality={75}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          src={member.image as string}
                          alt="Crew Image"
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
          <h2 className="h2_wrapper">WHAT WE ARE&nbsp;SPECIALIZE AT</h2>
        </div>
        <div className="">
          <Chart />
        </div>
      </section>
    </main>
  );
}
