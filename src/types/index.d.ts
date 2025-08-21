import type { mapIcons } from '@/data/icons'

export type GeoData = {
  name: string
  lat: number
  lon: number
  country: string
  state?: string
  local_names?: {
    [key: string]: string
    ascii?: string
    feature_name?: string
  }
}

export type Icons = keyof typeof mapIcons
export type Weather = (typeof mapIcons)[Icons]

type Main = {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
  sea_level: number
  grnd_level: number
}

type WeatherType = {
  id: number
  main: string
  description: string
  icon: Icons
}

type Wind = {
  speed: number
  deg: number
  gust: number
}

export type CurrentWeatherData = {
  coord: {
    lon: number
    lat: number
  }
  weather: WeatherType[]
  base: string
  main: Main
  visibility: number
  wind: Wind
  rain?: {
    '1h': number
  }
  snow?: {
    '1h': number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

export type WeatherForecastResponse = {
  cod: string
  message: string
  cnt: number
  list: Array<{
    dt: number
    main: Main
    weather: WeatherType[]
    clouds: {
      all: number
    }
    wind: Wind
    visibility?: number
    pop: number
    rain?: {
      '3h'?: number
    }
    snow?: {
      '3h'?: number
    }
    sys: {
      pod: 'n' | 'd'
    }
    dt_txt: string
  }>
  city: {
    id: number
    name: string
    coord: {
      lat: number
      lon: number
    }
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
  }
}

export type UnitsParam = 'metric' | 'imperial' | 'standard'

export type WeatherInfo = {
  description: string
  name: string
  country: string
  dt: number
  timezone: number
  temp: number
  icon: Icons
  feelsLike: number
  humidity: number
  pressure: number
  clouds: number
  windSpeed: number
  windDeg: number
  sunrise: number
  sunset: number
  rain?: number
  snow?: number
}