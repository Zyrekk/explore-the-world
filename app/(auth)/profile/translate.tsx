import {View, Text, SafeAreaView, TextInput, Pressable, ScrollView} from 'react-native'
import React, {useEffect, useState} from 'react'
import {Entypo, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import CustomSelect from "@/components/CustomSelect";
import axios from "axios";
import {setTranslateData} from "@/utils/setTranslateData";
import {getTranslateData} from "@/utils/getTranslateData";

const Translate = () => {
    const [lang1, setLang1] = useState<{ short: string, long: string }>({short: "EN", long: "English"})
    const [lang2, setLang2] = useState<{ short: string, long: string }>({short: "PL", long: "Polish"})
    const [input, setInput] = useState<string>("")
    const [output, setOutput] = useState<string>("")

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `${process.env.EXPO_PUBLIC_APP_DEEPL_KEY}`,
    };

    const body = {
        text: [input],
        target_lang: lang2.short,
        source_lang: lang1.short
    }

    const swapLanguages = () => {
        const temp=lang2
        const temp2=output
        if(output){
            setTranslateData(JSON.stringify(
                {
                    lang1: {
                        short: lang2.short,
                        long: lang2.long
                    },
                    lang2: {
                        short: lang1.short,
                        long: lang1.long
                    },

                    input: output,
                    output: input,
                }))
            setLang2({short: lang1.short, long: lang1.long})
            setLang1({short: temp.short, long: temp.long})
            setOutput(input)
            setInput(temp2)
        }
        else{
            setTranslateData(JSON.stringify(
                {
                    lang1: {
                        short: lang2.short,
                        long: lang2.long
                    },
                    lang2: {
                        short: lang1.short,
                        long: lang1.long
                    },
                }))
            setLang2({short: lang1.short, long: lang1.long})
            setLang1({short: temp.short, long: temp.long})
        }
    }


    const translate = async () => {
        axios.post("https://api-free.deepl.com/v2/translate", body, {headers})
            .then(response => {
                setOutput(response.data.translations[0].text)
                setTranslateData(JSON.stringify(
                    {
                        lang1: {
                            short: lang1.short,
                            long: lang1.long
                        },
                        lang2: {
                            short: lang2.short,
                            long: lang2.long
                        },
                        input: input,
                        output: response.data.translations[0].text,
                    }
                ));
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const clear = () => {
        setInput("")
        setOutput("")
        setTranslateData(JSON.stringify(
            {
                lang1: {
                    short: lang1.short,
                    long: lang1.long
                },
                lang2: {
                    short: lang2.short,
                    long: lang2.long
                },
                input: "",
                output: "",
            }
        ));
    }

    useEffect(() => {
        getTranslateData().then(data => {
            if(data){
                setInput(data.input)
                setOutput(data.output)
                setLang1(data.lang1)
                setLang2(data.lang2)
            }
        })
    }, []);

    return (
        <View className="flex-1 bg-[#160227]">
            <SafeAreaView className="px-[10px]">
                <ScrollView>
                    <View className="border-[2px] border-white mt-[30px] mx-[20px] rounded-[18px] py-[10px]">
                        <CustomSelect initLang={lang1} setLang={setLang1}/>
                        <TextInput onChangeText={(text) => {
                            setInput(text)
                        }} value={input} multiline={true}
                                   className="text-white min-h-[200px] max-h-[200px] text-[18px] px-[10px] py-[10px]"
                                   placeholderTextColor="white" placeholder="Type here..."/>
                    </View>

                    <View style={{gap:40}} className="flex items-center flex-row justify-center mt-[15px]">
                        <Pressable className="flex items-center justify-center" onPress={swapLanguages}>
                            <View className="rounded-full border-[2px] border-white p-2">
                                <Ionicons name="swap-vertical" size={24} color="white"/>
                            </View>
                            <Text className="text-white text-[16px] mt-[5px]">Swap</Text>
                        </Pressable>
                        <Pressable className="flex items-center justify-center" onPress={clear}>
                            <View className="rounded-full border-[2px] border-white p-2">
                                <Entypo name="cross" size={24} color="white" />
                            </View>
                            <Text className="text-white text-[16px] mt-[5px]">Clear</Text>
                        </Pressable>
                    </View>

                    <View className="border-[2px] border-white mt-[15px] mx-[20px] rounded-[18px] mb-[20px] py-[10px]">
                        <CustomSelect initLang={lang2} setLang={setLang2}/>
                        <Text className="text-white min-h-[200px] max-h-[200px] text-[18px] px-[10px] py-[10px]">
                            {output}
                        </Text>
                    </View>

                    <Pressable
                        onPress={() => {
                            translate()
                        }}
                        style={{gap: 5}}
                        className="flex w-[90%] justify-center self-center bg-black px-[30] py-[15] rounded-[30px] flex-row items-center"
                    >
                        <MaterialCommunityIcons name="translate" size={24} color="white"/>
                        <Text className="text-white text-[16px]">Translate</Text>
                    </Pressable>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

export default Translate;
