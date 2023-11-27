import axios from "axios";
import { PlaceDetailsResponse } from "@/app/(auth)/home/placeDetails";

export const fetchPlaceDetails = async (placeId: string): Promise<PlaceDetailsResponse> => {
    const options = "rating,icon,website,photos,type,opening_hours,name,formatted_address,formatted_phone_number";

    try {
        const response = await axios.get<PlaceDetailsResponse>(
            `https://maps.googleapis.com/maps/api/place/details/json?fields=${options}&place_id=${placeId}&key=${process.env.EXPO_PUBLIC_APP_KEY}`
        );

        return response.data;
    } catch (error) {
        // Handle error, you might want to log or throw an exception
        console.error("Error fetching place details:", error);
        throw error;
    }
};
