import {View, Text} from 'react-native'
import React from 'react'
import {flightParser} from "@/utils/flightParser";
import {Ionicons} from "@expo/vector-icons";

export interface Flight {
    "$": {
        TotalFlightTime: string,
        TotalMiles: string,
        TotalTripTime: string,
        FLSDepartureDateTime: string,
        FLSDepartureTimeOffset: string,
        FLSDepartureCode: string,
        FLSDepartureName: string,
        FLSArrivalDateTime: string,
        FLSArrivalTimeOffset: string,
        FLSArrivalCode: string,
        FLSArrivalName: string,
        FLSFlightType: string,
        FLSFlightLegs: string,
        FLSFlightDays: string,
        FLSDayIndicator: string,
    };
    FlightLegDetails: {
        $: {
            DepartureDateTime: string,
            FLSDepartureTimeOffset: string,
            ArrivalDateTime: string,
            FLSArrivalTimeOffset: string,
            FlightNumber: string,
            JourneyDuration: string,
            SequenceNumber: string,
            LegDistance: string,
            FLSMeals: string,
            FLSInflightServices: string,
            FLSUUID: string,
        };
        DepartureAirport: {
            $: {
                CodeContext: string,
                LocationCode: string,
                FLSLocationName: string,
                Terminal: string,
                FLSDayIndicator: string,
            }
        }[];
        ArrivalAirport: {
            $: {
                CodeContext: string,
                LocationCode: string,
                FLSLocationName: string,
                Terminal: string,
                FLSDayIndicator: string,
            }
        }[];
        MarketingAirline: {
            $: {
                Code: string,
                CodeContext: string,
                CompanyShortName: string,
            }
        }[]
    }[]
}

const FlightTile = ({data}: { data: Flight }) => {
    const flight = flightParser(data)
    return (
        <View className="w-full bg-white rounded-[20px] px-[10px] py-[20px] flex flex-col items-center mt-[15]">
            <Text className="font-bold text-[18px]">{flight.airline}</Text>
            <View className="flex flex-row items-center justify-center mt-[15px]">
                <View className="flex flex-col items-end">
                    <Text className="text-[18px] font-semibold">
                        {flight.departureTime}
                    </Text>
                    <Text className="text-[18px] mt-[5px] font-semibold">
                        {flight.departureCode}
                    </Text>
                </View>
                <View className="px-[20px] flex flex-col items-center">
                    <Text className="text-[13px] font-semibold text-gray-500 mb-[-5px]">
                        {flight.flightTime}
                    </Text>
                    <View className="flex flex-row items-center justify-center">
                        <View className="bg-gray-500 h-[2px] px-[40px] mr-[5px]"/>
                        <Ionicons name="airplane" size={24} color="#6b7280"/>
                    </View>
                    <Text className="text-[13px] font-semibold text-blue-500 mt-[-5px]">
                        {flight.flightType}
                    </Text>

                </View>
                <View className="flex flex-col items-start">
                    <Text className="text-[18px] font-semibold">
                        {flight.arrivalTime}
                    </Text>
                    <Text className="text-[18px] mt-[5px] font-semibold">
                        {flight.arrivalCode}
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default FlightTile;
