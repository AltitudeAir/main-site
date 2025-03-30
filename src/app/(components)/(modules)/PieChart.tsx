'use client';

import { Card, CardContent } from '@/core/ui/components/Card/Card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/core/ui/components/Chart/Chart';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  FaHelicopter,
  FaMedkit,
  FaMountain,
  FaSkiing,
  FaVideo,
} from 'react-icons/fa';
import { RiFootprintLine } from 'react-icons/ri';
import { Label, Pie, PieChart, Sector } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';

const desktopData = [
  {
    text: 'Mountain Flight And Breakfast',
    desktop: 27,
    fill: '#006699',
    icon: <FaMountain />,
  },
  {
    text: 'Pilgrimage Flight',
    desktop: 8,
    fill: '#FF884D',
    icon: <RiFootprintLine />,
  },
  { text: 'Filming Flight', desktop: 2, fill: '#80002A', icon: <FaVideo /> },
  {
    text: 'Charter Flight',
    desktop: 35,
    fill: '#0088CC',
    icon: <FaHelicopter />,
  },
  { text: 'Rescue Flight', desktop: 17, fill: '#E6BF00', icon: <FaMedkit /> },
  {
    text: 'Chasing Flight',
    desktop: 7,
    fill: '#FF1940',
    icon: <FaHelicopter />,
  },
  { text: 'Heliski Flight', desktop: 4, fill: '#00D5FF', icon: <FaSkiing /> },
];

const chartConfig = {
  visitors: { label: 'Visitors' },
  desktop: { label: 'Desktop' },
  mountain: {
    label: 'Mountain Flight And Breakfast',
    color: 'hsl(var(--chart-1))',
  },
  pilgrimage: { label: 'Pilgrimage Flight', color: 'hsl(var(--chart-2))' },
  filming: { label: 'Filming Flight', color: 'hsl(var(--chart-3))' },
  charter: { label: 'Charter Flight', color: 'hsl(var(--chart-4))' },
  heliski: { label: 'Heliski Flight', color: 'hsl(var(--chart-4))' },
  chasing: { label: 'Chasing Flight', color: 'hsl(var(--chart-5))' },
  rescue: { label: 'Rescue Flight', color: 'hsl(var(--chart-5))' },
} satisfies ChartConfig;

export function Chart() {
  const id = 'pie-interactive';
  const [activeIndex, setActiveIndex] = React.useState<number>(
    desktopData.findIndex(
      (item) => item.text === 'Mountain Flight And Breakfast'
    )
  );

  const [startAngle, setStartAngle] = React.useState(0);
  const [isAnimationActive, setIsAnimationActive] = React.useState(true);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
    }
  }, []);
  const totalDesktop = desktopData.reduce((sum, item) => sum + item.desktop, 0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    let rotation = 0;
    const intervalId = setInterval(() => {
      if (rotation < 360) {
        rotation += 10;
        setStartAngle(rotation);
      } else {
        clearInterval(intervalId);
        setIsAnimationActive(false);
      }
    }, 1);

    return () => clearInterval(intervalId);
  }, []);

  const calculateImageSize = () => {
    if (windowWidth < 480) {
      return { innerRadius: 53, altitude: 252 };
    } else if (windowWidth < 768) {
      return { innerRadius: 85, altitude: 252 };
    } else {
      return { innerRadius: 85, altitude: 252 };
    }
  };

  const { innerRadius, altitude } = calculateImageSize();

  const handlePieEnter = (index: number) => setActiveIndex(index);
  const handlePieLeave = () => setActiveIndex(0);

  return (
    <Card
      data-chart={id}
      className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-0  mt-5"
    >
      <div className="col-span-1 p-4 mt-10">
        {desktopData.map((data, index) => {
          const percentage = ((data.desktop / totalDesktop) * 100).toFixed(1);

          return (
            <div
              key={index}
              className={`cursor-pointer mb-1 ml-5 mr-4 sm:mr-0 md:mr-10 lg:mr-0 md:ml-15 sm:ml-10 lg:ml-32 rounded h-14 overflow-hidden flex items-center ${
                activeIndex === index ? 'font-bold' : ''
              }`}
              onMouseEnter={() => handlePieEnter(index)}
              onMouseLeave={handlePieLeave}
            >
              <div
                className="relative shrink-0 overflow-hidden h-full w-16 sm:w-20 flex items-center justify-center text-white"
                style={{ backgroundColor: data.fill }}
              >
                {data.icon}
              </div>

              <div className="flex justify-between items-center h-full pl-2 sm:pl-4 w-full pr-4 bg-white">
                <h5 className="font-semibold text-sm sm:text-sm">
                  {data.text}
                </h5>
                <span className="text-sm font-medium">{percentage}%</span>
              </div>
            </div>
          );
        })}
      </div>

      <CardContent className="col-span-2 flex flex-col justify-center p-4">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="w-full max-w-[1200px] sm:max-w-[1200px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={desktopData}
              dataKey="desktop"
              nameKey="text"
              innerRadius={innerRadius}
              startAngle={0}
              endAngle={startAngle}
              isAnimationActive={isAnimationActive}
              strokeWidth={5}
              onMouseEnter={(e) => handlePieEnter(e.activeIndex)}
              onMouseLeave={handlePieLeave}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 7} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 40}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    const { cx, cy } = viewBox as any;

                    const activeIcon =
                      activeIndex !== null
                        ? desktopData[activeIndex]?.icon
                        : null;

                    const iconSize =
                      windowWidth < 480 ? 15 : windowWidth < 768 ? 25 : 30;
                    const textSize =
                      windowWidth < 480 ? 6 : windowWidth < 768 ? 12 : 14;

                    return (
                      <>
                        <g>
                          <clipPath id="circle-clip">
                            <circle cx={cx} cy={cy} r={innerRadius} />
                          </clipPath>
                          <image
                            href="/images/banner/altitude.png"
                            x={cx - innerRadius}
                            y={cy - innerRadius}
                            width={altitude}
                            height={altitude - 82}
                            style={{
                              filter: 'brightness(0.3)',
                              clipPath: 'url(#circle-clip)',
                              overflow: 'hidden',
                            }}
                          />
                        </g>

                        {activeIcon && (
                          <foreignObject
                            x={cx - innerRadius / 2}
                            y={cy - innerRadius / 2}
                            width={innerRadius}
                            height={innerRadius}
                          >
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                                textAlign: 'center',
                              }}
                            >
                              <div
                                style={{
                                  fontSize: `${iconSize}px`,
                                  color: '#fff',
                                }}
                              >
                                {activeIcon}
                              </div>

                              <div
                                style={{
                                  fontSize: `${textSize}px`,
                                  fontWeight: 'bold',
                                  color: '#fff',
                                  marginTop: '5px',
                                  fontFamily: 'Gilroy-Light, sans-serif',
                                }}
                              >
                                {desktopData[activeIndex]?.text}
                              </div>
                            </div>
                          </foreignObject>
                        )}
                      </>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
