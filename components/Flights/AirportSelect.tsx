import {View, Text, ScrollView, Pressable, TextInput} from 'react-native'
import React, {useRef, useState} from 'react'
import airportList from "@/constants/airports.json"
import countryEmoji from "country-emoji";

export interface AirportInterface{
    icao: string;
    iata: string;
    name: string;
    city: string;
    state: string;
    country: string;
    elevation: number;
    lat: number;
    lon: number;
    tz: string;
}

interface Props{
    title:string;
    setData:(data:AirportInterface)=>void;
    z:number;
}
const AirportSelect = ({setData,title,z}:Props) => {
    const inputRef=useRef<TextInput>(null)
    const [input,setInput]=useState<string>("")
    const airports:AirportInterface[]=airportList
    // const [value, setValue] = useState<AirportInterface|null>(null);
    const [show, setShow] = useState(false);
    const searchAirport=(query:string) =>{
        query = query.toLowerCase();
        const filtered=airportList.filter((airport:AirportInterface)=> {
            return airport.city.toLowerCase().includes(query) || airport.iata.toLowerCase().includes(query);
        });
        return filtered
    }
    return (
        <View style={{zIndex:z}} className="relative bg-white h-[60] py-[5] rounded-[10px]">
            <Pressable onPress={() => {
                if (inputRef.current) {
                    inputRef.current.focus()
                }
            }} style={{gap: 5}} className="">
                <Text className="px-[5] text-black text-[16px]">{title}:</Text>
                <TextInput className="px-[5]" ref={inputRef} value={input} onChangeText={(text)=>{
                    setInput(text)
                    if(text.length>1) {
                        setShow(true)
                    }
                }}/>
                {show && input.length>2 &&
                    <ScrollView className="bg-[#160227] w-full max-h-[230px] border-[1px] border-white rounded-b-[18px] py-[10px] absolute top-[100%] left-0">
                        {searchAirport(input).map((airport,index) =>(
                            <Pressable className="mt-[5]" key={index} onPress={() => {
                                setData(airport);
                                setInput(`${airport.name} (${airport.iata})`)
                                setShow(false);
                            }}>
                                <Text className="text-white text-[18px] px-[10px] py-[10px]">{countryEmoji.flag(
                                    airport.country
                                ) || ""} {airport.name} ({airport.iata})</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                }
            </Pressable>
        </View>
    );
}

export default AirportSelect;
