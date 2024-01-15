import {View, Text, ScrollView, Pressable, TextInput} from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import FlightTile, {Flight} from "@/components/Flights/FlightTile";

const parseString = require('react-native-xml2js').parseString;
import DateTimePicker from '@react-native-community/datetimepicker';
import airports from "@/constants/airports.json"
import axios from "axios";
import {fetchFlights} from "@/utils/fetchFlights";
import {flightParser, ParsedFlight} from "@/utils/flightParser";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import AirportSelect, {AirportInterface} from "@/components/Flights/AirportSelect";
import Loader from "@/components/Loader";
import {setAirportData} from "@/utils/setAirportData";
import {getAirportData} from "@/utils/getAirportData";


const Flights = () => {
    const [departureInfo, setDepartureInfo] = useState<AirportInterface | null>()
    const [arrivalInfo, setArrivalInfo] = useState<AirportInterface | null>()
    const [date, setDate] = useState<Date>(new Date())
    const [isClickedDate, setIsClickedDate] = useState<boolean>(false)
    const displayDate = `${date.getDate().toString().length < 2 ? `0${date.getDate()}` : date.getDate()} ${(date.getMonth() + 1).toString().length < 2 ? `0${date.getMonth() + 1}` : date.getMonth() + 1} ${date.getFullYear()}`
    const fetchDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().length < 2 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}${date.getDate().toString().length < 2 ? `0${date.getDate()}` : date.getDate()}`
    const [click, setClick] = useState<number>(0)
    const [loading, setLoading] = useState(false)

    const [flights, setFlights] = useState<null | Flight[]>()

    const clearData=()=>{

        setDepartureInfo(null)
        setArrivalInfo(null)
        setDate(new Date())
        setFlights(null)
        setAirportData(JSON.stringify(
            {
                departureInfo:null,
                arrivalInfo:null,
                date:new Date(),
                flights:null
            }))
    }

    useEffect(() => {
            setLoading(true)
        if (departureInfo && arrivalInfo && fetchDate) {
            fetchFlights(departureInfo?.iata, arrivalInfo?.iata, fetchDate).then((fl) => {
                if (fl) {
                    parseString(fl, (err: any, res: any) => {
                        const uniqueid: string[] = [];
                        const uniqueFlights: Flight[] = [];
                        if (res.OTA_AirDetailsRS !== undefined && res.OTA_AirDetailsRS.FlightDetails !== undefined) {
                            res.OTA_AirDetailsRS.FlightDetails.forEach((el: Flight) => {
                                if (!uniqueid.includes(el.FlightLegDetails[0].$.FLSUUID)) {
                                    uniqueid.push(el.FlightLegDetails[0].$.FLSUUID)
                                    uniqueFlights.push(el)
                                }
                            })
                            setFlights(uniqueFlights)
                            setAirportData(JSON.stringify(
                                {
                                    departureInfo:departureInfo,
                                    arrivalInfo:arrivalInfo,
                                    date:date,
                                    flights:uniqueFlights
                                }
                            ))
                        } else {
                            alert("No flights found")
                        }
                    });
                } else {
                    alert("No flights found")
                }
            })
        }
        setLoading(false)
    }, [click]);

    useEffect(() => {
        getAirportData().then((data)=>{
            if(data){
                setDepartureInfo(data.departureInfo)
                setArrivalInfo(data.arrivalInfo)
                setDate(new Date(data.date))
                setFlights(data.flights)
            }
        })
    }, []);


    return (
        <View style={{gap: 15}} className="flex flex-col flex-1 bg-[#160227] px-[30] pt-[20px] pb-[50px]">
            <AirportSelect title={"Departure"} setData={setDepartureInfo} z={1000000} data={departureInfo?departureInfo:undefined}/>
            <AirportSelect title={"Arrival"} setData={setArrivalInfo} z={1000} data={arrivalInfo?arrivalInfo:undefined}/>
            <Pressable onPress={() => {
                setIsClickedDate(!isClickedDate)
            }} style={{gap: 5}} className=" bg-white min-h-[60] py-[5] px-[5] rounded-[10px]">
                <Text className="text-black text-[16px]">Date:</Text>
                <Text className="text-black text-[16px]">{displayDate}</Text>
            </Pressable>
            {isClickedDate &&
                <>
                    <RNDateTimePicker className="w-full" minimumDate={new Date()} display={"spinner"} mode={"date"}
                                      value={date}
                                      onChange={(event, date) => {
                                          if (date) {
                                              setDate(date)
                                          }
                                      }}/>
                    <Pressable onPress={() => {
                        setIsClickedDate(false)
                    }}
                               className="flex-1 items-center justify-center bg-black min-h-[60] max-h-[60] py-[5] px-[5] rounded-[10px]">
                        <Text className="text-white text-[20px] font-semibold">Confirm date</Text>
                    </Pressable>
                </>
            }
            {!isClickedDate && date && departureInfo && arrivalInfo && !flights &&
                <Pressable
                    onPress={() => setClick(click + 1)}
                    className="items-center justify-center bg-black h-[60] py-[5] px-[5] rounded-[10px]">
                    <Text className="text-white text-[20px] font-semibold">SEARCH</Text>
                </Pressable>
            }
            {!isClickedDate && date && departureInfo && arrivalInfo && flights &&
                <Pressable
                    onPress={clearData}
                    className="items-center justify-center bg-black h-[60] py-[5] px-[5] rounded-[10px]">
                    <Text className="text-white text-[20px] font-semibold">CLEAR DATA</Text>
                </Pressable>
            }


            {loading ?
                <Loader text={"Fetching flights"}/> :
                <ScrollView style={{gap: 15}} className=" w-full flex-col">
                    {flights && <Text style={{paddingTop: 30}}
                                      className="text-white text-[24px] text-center pb-[10px] font-bold">SEARCH
                        RESULTS</Text>}
                    {flights &&
                        flights.map((flight, index) =>
                            <FlightTile key={index} data={flight}/>)
                    }
                </ScrollView>}
        </View>
    );
}

export default Flights;
