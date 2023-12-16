import axios from "axios";

export const fetchFlights = async (dep:string,arr:string,time:string) => {
    const options = {
        method: 'GET',
        url: `https://timetable-lookup.p.rapidapi.com/TimeTable/${dep}/${arr}/${time}/`,
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
