import {View, Text, ScrollView} from 'react-native'
import React, {useEffect, useState} from 'react'
import {AntDesign} from "@expo/vector-icons";
import {getWeatherCoords} from "@/utils/getWeatherCoords";
import axios from "axios";
import ForecastItem from "@/components/Weather/ForecastItem";

interface WeatherData {
    cod: string;
    message: number;
    cnt: number;
    list: WeatherEntry[];
    city: City;
}

export interface WeatherEntry {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
    };
    weather: Weather[];
    clouds: {
        all: number;
    };
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    visibility: number;
    pop: number;
    rain?: {
        "3h": number;
    };
    sys: {
        pod: string;
    };
    dt_txt: string;
}

interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface City {
    id: number;
    name: string;
    coord: {
        lat: number;
        lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}

const Forecast = () => {
    const [forecast,setForecast]=useState<WeatherData|null>(null)
    useEffect(() => {
        getWeatherCoords().then((res) => {
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${res.coords.latitude}&lon=${res.coords.longitude}&units=metric&appid=${process.env.EXPO_PUBLIC_APP_WEATHER_KEY}`).then(res => {
                setForecast(res.data)
            })
        })
    }, []);
    const weatherByDay=forecast?.list.filter((item)=>item.dt_txt.split(' ')[1]==='12:00:00')
    return (
        <View className="mt-[30] w-full">
            <View style={{gap:10}} className="flex flex-row items-start">
                <AntDesign name="calendar" size={18} color="#a1a1aa" />
                <Text className="text-[#a1a1aa] text-[16px]">Daily forecast</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{gap:10}} className="flex mt-[20]">
                {weatherByDay?.map((item,index)=><ForecastItem key={index} item={item}/>)}
            </ScrollView>
        </View>
    );
}

export default Forecast;
