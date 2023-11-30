import React from 'react';
import {Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {OpeningHours as OpenHours} from "@/components/Favorites/FavDetails";

const getOpenStatus = (open_now: OpenHours["open_now"], periods: OpenHours["periods"]) => {
    if (open_now) {
        return {status: 'Open Now', color: '#32e361'};
    } else {
        const currentDay = new Date().getDay();
        const nextOpenDay = periods.find(period => period.open.day > currentDay) || periods[0];
        const openTime = nextOpenDay.open.time;
        return {status: `Closed until ${openTime.slice(0,2)}:${openTime.slice(2,4)}`, color: '#ED6A5E'};

    }
};

export const OpeningHours = ({hours}: { hours: OpenHours }) => {
    const {status, color} = getOpenStatus(hours.open_now, hours.periods);

    return (
        <View style={{gap: 10}} className="flex flex-row items-start mt-[20]">
            <FontAwesome name="clock-o" size={24} color={color}/>
            <Text style={{color, fontSize: 18}}>{status}</Text>
        </View>
    );
};
