import {View, Text, Pressable, TextInput, ScrollView} from 'react-native'
import React, {useState} from 'react'
import {FontAwesome5} from "@expo/vector-icons";

interface Props{
    initLang:{
        short:string,
        long:string
    }
    setLang:(lang:{short:string,long:string})=>void
}

const CustomSelect = ({initLang,setLang}:Props) => {
    const languagesArray = [
        { short: "BG", long: "Bulgarian" },
        { short: "CS", long: "Czech" },
        { short: "DA", long: "Danish" },
        { short: "DE", long: "German" },
        { short: "EL", long: "Greek" },
        { short: "EN", long: "English" },
        { short: "ES", long: "Spanish" },
        { short: "ET", long: "Estonian" },
        { short: "FI", long: "Finnish" },
        { short: "FR", long: "French" },
        { short: "HU", long: "Hungarian" },
        { short: "ID", long: "Indonesian" },
        { short: "IT", long: "Italian" },
        { short: "JA", long: "Japanese" },
        { short: "KO", long: "Korean" },
        { short: "LT", long: "Lithuanian" },
        { short: "LV", long: "Latvian" },
        { short: "NB", long: "Norwegian" },
        { short: "NL", long: "Dutch" },
        { short: "PL", long: "Polish" },
        { short: "PT", long: "Portuguese" },
        { short: "RO", long: "Romanian" },
        { short: "RU", long: "Russian" },
        { short: "SK", long: "Slovak" },
        { short: "SL", long: "Slovenian" },
        { short: "SV", long: "Swedish" },
        { short: "TR", long: "Turkish" },
        { short: "UK", long: "Ukrainian" },
        { short: "ZH", long: "Chinese" }
    ];


    const [value, setValue] = useState<{short:string,long:string}>(initLang);
    const [show, setShow] = useState(false);

    return (
        <View className="relative z-[100]">
            <Pressable onPress={()=>{
                setShow((prevState)=>!prevState)
            }} className="flex flex-row justify-between px-[10px] items-center border-b-[2px] pb-[10px] border-b-white">
                <Text className="text-white text-[20px]">{value.long}</Text>
                <View style={{transform: [{ rotate: show ? "180deg" : "0deg" }]}}><FontAwesome5 name="arrow-down" size={24} color="white" /></View>
            </Pressable>
            {show && <ScrollView className="bg-[#160227] w-full max-h-[211px] z-[1000] border-[1px] border-white  rounded-b-[18px] py-[10px] absolute top-[100%] left-0">
                {languagesArray.map((language) =>(
                    <Pressable key={language.short} onPress={() => {
                        setValue(language);
                        setLang(language);
                        setShow(false);
                    }}>
                        <Text className="text-white text-[18px] px-[10px] py-[10px]">{language.long}</Text>
                    </Pressable>
                ))}
            </ScrollView>}
        </View>
    );
}

export default CustomSelect;
