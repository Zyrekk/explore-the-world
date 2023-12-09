import {Flight} from "@/components/Flights/FlightTile";

export interface ParsedFlight{

    departureTime:string;
        arrivalTime:string,
    flightTime:string,
    departureCode:string,
    arrivalCode:string,
    departureName:string,
    arrivalName:string,
    flightType:string,
    flightSteps:string,
    airline:string

}
export const flightParser=(data:Flight)=>{
    const flight=data.$
    const departureTime=flight.FLSDepartureDateTime.split("T")[1].slice(0,-3)
    const arrivalTime=flight.FLSArrivalDateTime.split("T")[1].slice(0,-3)
    const flightTime=flight.TotalTripTime.slice(2).toLowerCase().replace(/h/, 'h ');

    const response={
        departureTime:departureTime,
        arrivalTime:arrivalTime,
        flightTime:flightTime,
        departureCode:flight.FLSDepartureCode,
        arrivalCode:flight.FLSArrivalCode,
        departureName:flight.FLSDepartureName,
        arrivalName:flight.FLSArrivalName,
        flightType:flight.FLSFlightType==="NonStop"?"Direct":"Connecting",
        flightSteps:flight.FLSFlightLegs,
        airline:data.FlightLegDetails[0].MarketingAirline[0].$.CompanyShortName
    }

    return response
}
