import axios from "axios";

export const fetchFlights = async (a:string,b:string) => {
    const options = {
        method: 'GET',
        url: `https://timetable-lookup.p.rapidapi.com/TimeTable/${a}/${b}/20231217/`,
        headers: {
            'X-RapidAPI-Key': process.env.EXPO_PUBLIC_APP_FLIGHTS_KEY,
            'X-RapidAPI-Host': 'timetable-lookup.p.rapidapi.com',
        },
    };

    try {
        const response = await axios.request(options);
        return response.data
        // Handle the response data as needed
    } catch (error) {
        return  null
    }
};
