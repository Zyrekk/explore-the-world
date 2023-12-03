import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getCountryCode } from "@/utils/getCountryCode";
import axios from "axios";

const CountryInfo = () => {
  const [countryInfo, setCountryInfo] = useState<any>();
  useEffect(() => {
    getCountryCode().then((res) => {
      axios
        .get(`https://restcountries.com/v3.1/alpha/${res.countryCode}`)
        .then((res) => {
          setCountryInfo(res.data[0]);
        });
    });
  }, []);
  if (countryInfo) {
    console.log(countryInfo);
  }
  return (
    <View className="bg-[#150227] flex-grow">
      <Text>CountryInfo</Text>
    </View>
  );
};

export default CountryInfo;
