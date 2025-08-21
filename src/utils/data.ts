import type { CurrentWeatherData, WeatherForecastResponse, WeatherInfo } from '@/types'

export const mappedData = (
  data: CurrentWeatherData | WeatherForecastResponse['list'][number],
  city: WeatherForecastResponse['city']
): WeatherInfo => {
  const cityProps = {
    name: city.name,
    timezone: city.timezone,
    sunrise: city.sunrise,
    sunset: city.sunset,
    country: city.country,
  }
  if ('dt_txt' in data) {
    return {
      ...cityProps,
      description: data.weather[0].description,
      dt: data.dt,
      temp: data.main.temp,
      icon: data.weather[0].icon,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      clouds: data.clouds.all,
      windSpeed: data.wind.speed,
      windDeg: data.wind.deg,
      rain: data.rain?.['3h'],
      snow: data.snow?.['3h'],
    }
  } else {
    return {
      ...cityProps,
      description: data.weather[0].description,
      dt: data.dt,
      temp: data.main.temp,
      icon: data.weather[0].icon,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      clouds: data.clouds.all,
      windSpeed: data.wind.speed,
      windDeg: data.wind.deg,
      rain: data.rain?.['1h'],
      snow: data.snow?.['1h'],
    }
  }
}
