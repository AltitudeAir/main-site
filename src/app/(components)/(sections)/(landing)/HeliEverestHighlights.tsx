import { Activity, SecuritySafe } from 'iconsax-react';

export type IconProps = React.SVGProps<SVGSVGElement> & {
  fill?: string;
};

export const Helicopter = ({ fill = '#000000', ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    {...props}
  >
    <g fill={fill}>
      <path
        fillRule="evenodd"
        d="m43.926 20.624l-1.806-4.45l1.834-5.876l-1.909-.596l-1.74 5.575l-10.328.869c-2.595 0-4.911.132-6.977.371V14a1 1 0 1 0-2 0v2.795C13.498 18.019 9.744 20.82 8 23.87c-1.153 2.017-1.352 4.028-1.269 5.517c.042.745.155 1.368.259 1.809a8.167 8.167 0 0 0 .203.715l.005.014l.002.006l.001.002l.799-.294l-.798.295a1 1 0 0 0 .29.415L8 31.751c-.507.599-.504.602-.5.605l.007.006l.015.012a.816.816 0 0 0 .083.059a1.078 1.078 0 0 0 .253.119c.094.032.202.058.331.082c.259.05.68.104 1.395.157c1.433.106 4.134.209 9.243.209c2.652 0 4.788-.428 6.49-1.263a8.614 8.614 0 0 0 3.792-3.577c1.54-2.72 1.849-6.323 1.887-10.093l9.413-.791l1.664 4.1l1.853-.752ZM9 27v-.367V27Zm.204-1h10.31c.063-.14.135-.335.215-.59c.224-.727.443-1.744.636-2.848c.229-1.312.409-2.675.518-3.72c-6.811 1.193-9.834 3.726-11.147 6.021c-.217.38-.392.761-.532 1.137Z"
        clipRule="evenodd"
      ></path>
      <path d="M5 10a1 1 0 1 0 0 2h33.005a1 1 0 1 0 0-2H5Zm-.625 24.22a1 1 0 0 1 1.406.155c.22.276.783.6 1.758.88c.924.265 2.037.44 3.135.554a38.511 38.511 0 0 0 4.083.192h.082l.01-.001H30.5a1 1 0 0 1 0 2H14.847l-.073.001l-.271.001a40.498 40.498 0 0 1-4.034-.204c-1.152-.119-2.396-.31-3.481-.62c-1.034-.297-2.133-.758-2.769-1.553a1 1 0 0 1 .156-1.406Z"></path>
    </g>
  </svg>
);

export const DateTimeMirrored = ({ fill = '#000000', ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 2048 2048"
    {...props}
  >
    <path
      fill={fill}
      d="M1792 993q60 41 107 93t81 114t50 131t18 141q0 119-45 224t-124 183t-183 123t-224 46q-91 0-176-27t-156-78t-126-122t-85-157H128V128h256V0h128v128h896V0h128v128h256v865zM256 256v256h1408V256h-128v128h-128V256H512v128H384V256H256zm643 1280q-3-31-3-64q0-86 24-167t73-153h-97v-128h128v86q41-51 91-90t108-67t121-42t128-15q100 0 192 33V640H256v896h643zm573 384q93 0 174-35t142-96t96-142t36-175q0-93-35-174t-96-142t-142-96t-175-36q-93 0-174 35t-142 96t-96 142t-36 175q0 93 35 174t96 142t142 96t175 36zm64-512h192v128h-320v-384h128v256zM384 1024h128v128H384v-128zm256 0h128v128H640v-128zm0-256h128v128H640V768zm0 512h128v128H640v-128zm384-384H896V768h128v128zm256 0h-128V768h128v128zM384 768h128v128H384V768z"
    ></path>
  </svg>
);

const HIGHLIGHTS = [
  {
    title: 'EXPERIENCE IN THE INDUSTRY',
    description: '9 YEARS',
    icon: <Activity size="48" color="#fbc200" />,
  },
  {
    title: 'SAFETY RATE',
    description: '100%',
    icon: <SecuritySafe size="48" color="#fbc200" />,
  },
  {
    title: 'TOTAL FLYING TIME',
    description: '11,000 HRS',
    icon: <DateTimeMirrored height="48" width="48" fill="#fbc200" />,
  },
  {
    title: 'SUCCESSFUL FLIGHTS',
    description: '32,000',
    icon: <Helicopter height="48" width="48" fill="#fbc200" />,
  },
];

const HeliEverestHighlights = () => {
  return (
    <div className="h-[800px] w-full">
      <div className="bg-[url(/images/banner/banner22.png)] text-custom-blue font-[QuickSand-Light] relative inset-0 h-full w-full bg-center bg-cover -z-10">
        <div
          className="absolute inset-0 flex items-center justify-center -z-10"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 45%, rgba(255,255,255,0.6) 55%, rgba(255,255,255,0.4) 80%, rgba(255,255,255,0.2) 95%, transparent 100%)',
            transform: 'translate(-10%, -20%) rotate(-12deg)',
            transformOrigin: 'center',
            width: '150%',
            height: '150%',
          }}
        ></div>
        <div className="flex flex-col gap-12 container mx-auto items-center h-full justify-center">
          <p className="text-lg font-bold">
            Altitude Air, a leading helicopter company in Nepal with outstanding
            safety and reliability, remains dedicated to providing exceptional
            service while adhering to the highest industry standards.
          </p>
          <div className="flex flex-wrap gap-12 items-center justify-center">
            {HIGHLIGHTS.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-4">
                <div>{item.icon}</div>
                <p className="font-semibold text-5xl">{item.description}</p>
                <p className="font-extrabold text-xl">{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Your content goes here */}
        {/* <div className="relative z-10 p-8 text-white">
          <h1 className="text-4xl font-bold">Your Content</h1>
          <p>This content appears over the blurred background</p>
        </div> */}
      </div>
    </div>
  );
};

export default HeliEverestHighlights;
