import React from 'react';
import { Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface Schedule {
    open: {
        day: number;
        time: string;
    };
    close: {
        day: number;
        time: string;
    };
}

interface OpeningHours {
    periods?: Schedule[];
}

const getOpenStatus = (openingHours?: OpeningHours): { status: string; color: string } => {
    if (!openingHours || !openingHours.periods) {
        return { status: 'Closed', color: '#ED6A5E' };
    }

    const todaySchedule = openingHours.periods.find(
        (schedule) => schedule.open.day === new Date().getDay()
    );

    if (todaySchedule && todaySchedule.open) {
        const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });
        const closingTime = todaySchedule.close.time;

        if (currentTime > closingTime) {
            const nextOpeningDay = openingHours.periods.find(
                (schedule) => schedule.open.day > new Date().getDay()
            );

            if (nextOpeningDay) {
                return {
                    status: `Closed until ${nextOpeningDay.open.time.slice(0, 2)}:${nextOpeningDay.open.time.slice(2)}`,
                    color: '#ED6A5E',
                };
            }

            return { status: 'Closed', color: '#ED6A5E' };
        }

        return { status: `Open until ${closingTime.slice(0, 2)}:${closingTime.slice(2)}`, color: '#32e361' };
    }

    return { status: 'Closed', color: '#ED6A5E' };
};

interface OpeningHoursProps {
    openingHours?: OpeningHours;
}

export const OpeningHours = ({ openingHours }:OpeningHoursProps) => {
    const { status, color } = getOpenStatus(openingHours);

    return (
        <View style={{ gap: 10 }} className="flex flex-row items-start mt-[20]">
            <FontAwesome name="clock-o" size={24} color={color} />
            <Text style={{ color, fontSize: 18, marginLeft: 10 }}>{status}</Text>
        </View>
    );
};
