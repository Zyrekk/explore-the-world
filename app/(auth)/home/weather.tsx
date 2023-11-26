import {View} from 'react-native'
import React from 'react'
import CurrentWeather from "@/components/Weather/CurrentWeather";
import Forecast from "@/components/Weather/Forecast";


const Weather = () => {
    return (
        <View className="bg-[#160227] h-full flex-1 items-center">
            <View className="w-full px-[20] mt-[70] items-center">
                <CurrentWeather/>
                <Forecast/>
            </View>
        </View>
    );
}

export default Weather;
