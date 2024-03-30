export const fetchWeather = async (coords) => {
  try {
    const data = await fetch(
      `${process.env.BASE_URL}/weather?lat=${coords.lat}&lon=${coords.lng}&appid=${process.env.API_KEY}&units=metric`
    );
    const res = await data.json();
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const fetchForcast = async (coords) => {
  try {
    const data = await fetch(
      `${process.env.BASE_URL}/forecast?lat=${coords.lat}&lon=${coords.lng}&appid=${process.env.API_KEY}&units=metric`
    );
    const res = await data.json();
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const fetchWeatherByCity = async (city) => {
  try {
    const data = await fetch(
      `${process.env.BASE_URL}/weather?appid=${process.env.API_KEY}&units=metric&q=${city}`
    );
    const res = await data.json();
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const fetchForcastByCity = async (city) => {
  try {
    const data = await fetch(
      `${process.env.BASE_URL}/forecast?appid=${process.env.API_KEY}&units=metric&q=${city}`
    );
    const res = await data.json();
    return res;
  } catch (error) {
    console.error(error);
  }
};
