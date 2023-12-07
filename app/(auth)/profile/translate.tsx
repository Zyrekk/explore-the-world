import {View, Text, SafeAreaView, TextInput, Pressable, ScrollView} from 'react-native'
import React, {useState} from 'react'
import {Entypo, FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";
import CustomSelect from "@/components/CustomSelect";
import axios from "axios";

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

    const translate = async () => {
        axios.post("https://api-free.deepl.com/v2/translate", body, {headers})
            .then(response => {
                    setOutput(response.data.translations[0].text)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <View className="flex-1 bg-[#160227]">
            <SafeAreaView className="px-[10px]">
                <ScrollView>
                    <Text className="text-white text-center text-[32px] mt-[30px]">Translate</Text>

                    <View className="border-[2px] border-white mt-[60px] mx-[20px] rounded-[18px] py-[10px]">
                        <CustomSelect initLang={lang1} setLang={setLang1}/>
                        <TextInput onChangeText={(text) => {
                            setInput(text)
                        }} value={input} multiline={true}
                                   className="text-white min-h-[200px] max-h-[200px] text-[18px] px-[10px] py-[10px]"
                                   placeholderTextColor="white" placeholder="Type here..."/>
                    </View>

                    <View className="border-[2px] border-white mt-[30px] mx-[20px] rounded-[18px] mb-[20px] py-[10px]">
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
