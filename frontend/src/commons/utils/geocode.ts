import * as Location from "expo-location";

export const geocode = async (address: string) => {
    return await Location.geocodeAsync(address)
};

export const reverseGeocode = async (lat: number, lon: number) => {
    return await Location.reverseGeocodeAsync({
        longitude: lon,
        latitude: lat,
    })
};
