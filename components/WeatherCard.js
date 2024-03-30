import React from "react";
import Image from "next/image";

const WeatherCard = ({ data }) => {
  const { name, date, temp, description, icon, weeklydata } = data;

  const getWeeks = () => {
    let weekDays = [];
    for (let i = 0; i < weeklydata.length; i += 8) {
      const days = new Date(weeklydata[i].dt * 1000).toLocaleDateString(
        "en-US",
        { weekday: "long" }
      );
      weekDays.push({
        days,
        temp: weeklydata[i].main.temp,
        icon: weeklydata[i].weather[0].icon,
      });
    }
    return weekDays;
  };

  return (
    <>
      <div className="mx-auto p-4 h-screen flex justify-center">
        <div className="flex flex-wrap max-w-[590px] w-full">
          <div className="w-full  text-white px-2">
            <div className="bg-black relative min-w-0 break-words p-4 rounded-lg overflow-hidden shadow-sm mb-4 w-full dark:bg-gray-600">
              <div className="px-6 py-6 relative">
                <div className="flex mb-4 justify-between items-center">
                  <div>
                    <h5 className="mb-0 font-medium text-xl">{name}</h5>
                    <h6 className="mb-0">{date}</h6>
                    <small>{description}</small>
                  </div>
                  <Image
                    src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                    width={100}
                    height={100}
                    alt="Not avialable"
                  />
                  <div className="text-right">
                    <h3 className="font-bold text-4xl mb-0">
                      <span>{temp?.temp}&deg;</span>
                    </h3>
                  </div>
                </div>
                <div className="block sm:flex justify-between items-center flex-wrap">
                  <div className="w-full sm:w-1/2">
                    <div className="flex mb-2 justify-between items-center">
                      <span>Temp</span>
                      <small className="px-2 inline-block">
                        {temp?.temp}&nbsp;&deg;
                      </small>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <div className="flex mb-2 justify-between items-center">
                      <span>Feels like</span>
                      <small className="px-2 inline-block">
                        {temp?.feels_like}&nbsp;&deg;
                      </small>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <div className="flex mb-2 justify-between items-center">
                      <span>Temp min</span>
                      <small className="px-2 inline-block">
                        {temp?.temp_min}&nbsp;&deg;
                      </small>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <div className="flex mb-2 justify-between items-center">
                      <span>Temp max</span>
                      <small className="px-2 inline-block">
                        {temp?.temp_max}&nbsp;&deg;
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="divider table mx-2 text-center bg-transparent whitespace-nowrap">
                <span className="inline-block px-3 text-2xl">
                  <small>Forecast</small>
                </span>
              </div>
              <div className="px-6 py-6 relative"></div>
              <div className="text-center justify-between items-center flex">
                {weeklydata?.length &&
                  getWeeks(weeklydata).map((data) => {
                    return (
                      <>
                        <div className="text-center mb-0 flex items-center justify-center flex-col">
                          <span className="block my-1">{data.days}</span>
                          <img
                            src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
                            className="block w-8 h-8"
                          />
                          <span className="block my-1">{data.temp}&deg;</span>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(WeatherCard);
