import {View, Text, Image} from 'react-native'
import React, {useEffect, useState} from 'react'
import {Feather, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import WeatherDetail from "@/components/Weather/WeatherDetail";
import {getWeatherCoords} from "@/utils/getWeatherCoords";
import axios from "axios/index";

export interface WeatherData {
        coord: {
            lon: number;
            lat: number;
        };
        weather: {
            id: number;
            main: string;
            description: string;
            icon: string;
        }[];
        base: string;
        main: {
            temp: number;
            feels_like: number;
            temp_min: number;
            temp_max: number;
            pressure: number;
            humidity: number;
        };
        visibility: number;
        wind: {
            speed: number;
            deg: number;
        };
        clouds: {
            all: number;
        };
        dt: number;
        sys: {
            type: number;
            id: number;
            country: string;
            sunrise: number;
            sunset: number;
        };
        timezone: number;
        id: number;
        name: string;
        cod: number;
}

interface PlaceProps{
    city:string;
    country:string;
}
const CurrentWeather = () => {
    const [weather, setWeather] = useState<WeatherData|null>(null)
    const [place,setPlace]=useState<PlaceProps|null>(null)
    useEffect(() => {
        getWeatherCoords().then((res) => {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${res.coords.latitude}&lon=${res.coords.longitude}&units=metric&appid=${process.env.EXPO_PUBLIC_APP_WEATHER_KEY}`).then(res => {
                setWeather(res.data)
            })
            setPlace({
                city:res.city,
                country:res.country,
            })
        })
    }, []);
    const wind=weather && weather.wind.speed.toFixed(0)
    const humidity=weather && weather.main.humidity
    const sunrise=weather && new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})
    const weatherType=weather && weather.weather[0].description[0].toUpperCase() + weather.weather[0].description.slice(1)
    const temp=weather && weather.main.temp.toFixed(0)
    return (
        <>
            {weather &&
                <>
                    <View className="flex flex-row">
                        <Text className="text-white text-[25px] mb-[30] font-semibold">{place && place.city},</Text>
                        <Text className="text-[#a1a1aa] text-[25px] mb-[30] font-light"> {place && place.country}</Text>
                    </View>
                    <Image className="w-[190] h-[110]"
                           source={{uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}}/>
                    <Text className="text-white text-[40px] mt-[30]">{temp}°C</Text>
                    <Text className="text-[#a1a1aa] text-[25px] mt-[30]">{weatherType}</Text>
                    <View style={{justifyContent:"space-between"}} className="flex w-full flex-row mt-[90]">
                        <WeatherDetail icon={<MaterialCommunityIcons name="weather-windy" size={24} color="#a1a1aa" />} text={`${wind} km/h`}/>
                        <WeatherDetail icon={<Ionicons name="water-outline" size={24} color="#a1a1aa" />} text={`${humidity}%`}/>
                        <WeatherDetail icon={<Feather name="sunrise" size={24} color="#a1a1aa" />} text={`${sunrise}`}/>
                    </View>
                </>
            }
        </>
    );
}

export default CurrentWeather;
