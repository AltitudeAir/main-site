import Image from 'next/image';

const aboutUsData = [
  {
    image: '/icons/support.svg',
    title: 'Our Experience Team',
    description: `The Altitude Air Team is guided by legendary veterans of Nepal’s
              Tourism industry. Our team comprises highly experienced pilots and
              crew, specializing in high altitude flights and rescue operations
              over the treacherous Himalayan terrain.`,
  },
  {
    image: '/icons/24-hours.svg',
    title: 'We Are Here',
    description: `Our reliable support system ensures we can be reached at all
              times, providing rapid responses during emergent situations. We
              value you and respect your time.`,
  },
  {
    image: '/icons/helicopter.svg',
    title: 'Newest Helicopters',
    description: `Altitude Air’s first class fleet of Airbuses combat the Nepali
              region with ease, venturing through remote landscapes for rescue
              missions and emergent medical services.`,
  },
];

export default function Highlights() {
  // useEffect(() => {
  //   animateOnScroll(
  //     '.highlights .svg_text_container',
  //     '.highlights .animation-observer-helper',
  //     'animate__zoomIn'
  //   );
  // }, []);
  return (
    <section className="bg-[#314666] relative w-full">
      <div className="mx-auto container px-4  gap-6 py-8 flex flex-col lg:flex-row items-center justify-center">
        <div className="border-[1rem] border-[#fbc200] max-w-80  py-14  mr-[10vw] flex items-center">
          <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl mx-auto px-8  font-gilroy text-white">
            WHY ALTITUDE AIR?
          </h2>
        </div>

        <div className="flex gap-6 justify-center flex-wrap lg:flex-nowrap items-start w-full ">
          {aboutUsData.map((item, index) => (
            <div
              key={index}
              className="text-[#c1d5e6] max-w-80 flex flex-col gap-2"
            >
              <div className="invert w-9">
                <Image
                  src={item.image}
                  alt="Support svg icon"
                  width={100}
                  height={100}
                />
              </div>
              <h4 className="text-white">{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
