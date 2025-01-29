import Image from 'next/image';

const Mission = () => {
  const smallCircles = 8;
  const radius = 8;
  const gapOffset = 2.1;
  const moveRightPercent = 1;

  const circleImages = [
    '/images/Helsik.png',
    '/images/chasing.png',
    '/images/charter.png',
    '/images/fliming.png',
    '/images/prilimage.png',
    '/images/mountain.png',
    '/images/Allogo.png',
    '/images/rescue.png',
  ];

  const imageSizes = [
    { width: 6, height: 6 },
    { width: 6, height: 6 },
    { width: 6.5, height: 6.5 },
    { width: 6.5, height: 6.5 },
    { width: 5.5, height: 5.5 },
    { width: 4.5, height: 4.5 },
    { width: 10, height: 10 },
    { width: 7, height: 7 },
  ];

  const texts = [
    '4% Heliski Flight',
    '7% Chasing Flight',
    '35% Charter Flight',
    '2% Filming Flight',
    '8% Pilgrimage Flight',
    '27% Mountain Flight And Breakfast',
    '',
    '17% Rescue Flight',
  ];

  const percentageTexts = ['4%', '27%', '35%', '2%', '8%', '17%', '7%'];

  const circles = Array.from({ length: smallCircles }, (_, i) => {
    const angle = (2 * Math.PI * i) / smallCircles;
    const x = radius + (radius + gapOffset) * Math.cos(angle);
    const y = radius + (radius + gapOffset) * Math.sin(angle);

    if (i === 6) {
      return (
        <div
          key={i}
          className="absolute rounded-full overflow-hidden "
          style={{
            width: `${imageSizes[i].width}vw`,
            height: `${imageSizes[i].height}vw`,
            left: '50%',
            top: '0%',
            transform: 'translate(-40%, -50%)',
          }}
        >
          <Image
            src={circleImages[i]}
            alt={`Circle ${i}`}
            fill
            className="rounded-full object-cover"
          />
        </div>
      );
    }

    if (i === 5) {
      return (
        <div
          key={i}
          className="absolute rounded-full overflow-hidden"
          style={{
            width: `${imageSizes[i].width}vw`,
            height: `${imageSizes[i].height}vw`,
            left: '7%',
            top: '14%',
            transform: 'translate(-40%, -50%)',
          }}
        >
          <Image
            src={circleImages[i]}
            alt={`Circle ${i}`}
            fill
            className="rounded-full object-cover"
          />
        </div>
      );
    }

    return (
      <div
        key={i}
        className="absolute rounded-full overflow-hidden"
        style={{
          width: `${imageSizes[i].width}vw`,
          height: `${imageSizes[i].height}vw`,
          left: `calc(${x}vw + ${moveRightPercent}%)`,
          top: `${y}vw`,
          transform: 'translate(-20%, -20%)',
        }}
      >
        <Image
          src={circleImages[i]}
          alt={`Circle ${i}`}
          fill
          className="rounded-full object-cover"
        />
      </div>
    );
  });

  const textElements = texts.map((text, index) => {
    if (text === '') return null;

    const angle = (2 * Math.PI * index) / smallCircles;
    const x = 50 + 35 * Math.cos(angle);
    const y = 50 + 35 * Math.sin(angle);

    const percentageMatch = percentageTexts.find((percentage) =>
      text.includes(percentage)
    );

    const description = percentageMatch
      ? text.replace(percentageMatch, '').trim()
      : text;

    let marginStyle = {
      left: `${x}%`,
      top: `${y}%`,
      transform: 'translate(98%, -60%)',
      width: '10%',
      marginTop: '0',
      marginLeft: '0',
      marginRight: '0',
      marginBottom: '0',
    };
    if (text.includes('Mountain Flight And Breakfast')) {
      marginStyle = {
        ...marginStyle,
        left: '5%',
        top: '31%',
        width: '18%',
      };
    }
    if (text.includes('Rescue Flight')) {
      marginStyle = {
        ...marginStyle,
        left: '80%',
        top: '32%',
        width: '10%',
      };
    }
    return (
      <div
        key={index}
        className="absolute text-center"
        style={{
          left: marginStyle.left,
          top: marginStyle.top,
          transform: marginStyle.transform,
          width: marginStyle.width,
          marginTop: marginStyle.marginTop,
          marginLeft: marginStyle.marginLeft,
          marginRight: marginStyle.marginRight,
          marginBottom: marginStyle.marginBottom,
          fontFamily: 'Gilroy-ExtraBold',
          fontWeight: '800',
        }}
      >
        {percentageMatch && (
          <p
            className=" text-yellow-400"
            style={{
              fontSize: 'clamp(0.2rem, 2vw, 5rem)',
              marginBottom: '0.2rem',
            }}
          >
            {percentageMatch}
          </p>
        )}
        {description && (
          <p
            className="text-gray-600"
            style={{
              fontSize: 'clamp(-16rem, 0.9vw, 0.8rem)',
              marginTop: '-0.3rem',
              marginBottom: '0.2rem',
            }}
          >
            {description}
          </p>
        )}
      </div>
    );
  });

  return (
    <div
      className="relative"
      style={{ left: '30%', top: '45%', transform: 'translate(-50%, -50%)' }}
    >
      <div
        className="relative w-[50vw] sm:w-[40vw] md:w-[30vw] lg:w-[25vw] h-[50vw] sm:h-[40vw] md:h-[30vw] lg:h-[25vw] bg-white rounded-full"
        style={{
          width: `${radius * 5.3}vw`,
          height: `${radius * 5.3}vw`,
          left: '50%',
          top: '50%',
          transform: 'translate(-35%, -1%)',
        }}
      >
        <div
          className="relative bg-[#f4f7f9] rounded-full"
          style={{
            width: `${radius * 4}vw`,
            height: `${radius * 4}vw`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className="relative bg-[#e8eef3] rounded-full"
            style={{
              width: `${radius * 2.5}vw`,
              height: `${radius * 2.5}vw`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {circles}
            <div
              className="absolute rounded-full overflow-hidden"
              style={{
                width: `${radius * 1.1}vw`,
                height: `${radius * 1.1}vw`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="absolute inset-0">
                <Image
                  src="/images/banner/altitude.png"
                  alt="Inside box"
                  fill
                  objectFit="cover"
                  className="h-full w-full"
                />
                <div className="absolute inset-0 bg-black opacity-70"></div>
              </div>
              <div
                className="absolute"
                style={{
                  left: '65%',
                  top: '75%',
                  transform: 'translate(-50%, -50%)',
                  width: '10vw',
                  height: '10vw',
                }}
              >
                <Image
                  src="/images/helecopter.png"
                  alt="Helicopter"
                  layout="intrinsic"
                  width={70}
                  height={70}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {textElements}
    </div>
  );
};

export default Mission;
