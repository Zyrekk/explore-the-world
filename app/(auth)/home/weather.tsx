import {View, Text} from 'react-native'
import React, {useEffect} from 'react'
import {getWeatherCoords} from "@/utils/getWeatherCoords";
import axios from "axios";

const Weather = () => {
    useEffect(() => {
        getWeatherCoords().then((res)=>{
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${res.latitude}&lon=${res.longitude}&units=metric&appid=${process.env.EXPO_PUBLIC_APP_WEATHER_KEY}`).then(res => {
                console.log("weather",res.data)
            })
        })
    }, []);
    return (
        <View>
            <Text>Weather</Text>
        </View>
    );
}

export default Weather;
