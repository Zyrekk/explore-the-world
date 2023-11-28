import {View, Text, Image} from 'react-native'
import React from 'react'
import {WeatherEntry} from "@/components/Weather/Forecast";
import {getDateDayName} from "@/utils/getDateDayName";

interface ForecastItemProps{
    item:WeatherEntry
}
const ForecastItem = ({item}:ForecastItemProps) => {
    return (
        <View style={{paddingRight:20}}>
            <View className="bg-[#B4B4B4AA] flex items-center rounded-[15px] w-[95] h-[120]">
                <Image className="w-[70] h-[50]"
                       source={{uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}}/>
                <Text className="text-white text-[14px] mt-[10]">{getDateDayName(item.dt_txt.split(" ")[0])}</Text>
                <Text className="text-white text-[18px] mt-[10]">{item.main.temp.toFixed(0)}°C</Text>

            </View>
        </View>
    );
}

export default ForecastItem;
