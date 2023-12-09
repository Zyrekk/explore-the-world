import {View, Text, ScrollView} from 'react-native'
import React, {useEffect, useState} from 'react'
import FlightTile, {Flight} from "@/components/Flights/FlightTile";
const parseString = require('react-native-xml2js').parseString;
import airports from "@/constants/airports.json"
import axios from "axios";
import {fetchFlights} from "@/utils/fetchFlights";
import {flightParser, ParsedFlight} from "@/utils/flightParser";


const Flights = () => {
    const xmlString=`<?xml version="1.0" encoding="UTF-8"?>
<OTA_AirDetailsRS
 PrimaryLangID="eng"
 Version="1.0"
 TransactionIdentifier=""
 FLSNote="This XML adds attributes not in the OTA XML spec.  All such attributes start with FLS"
 FLSDevice = "ota-xml-expanded"
 xmlns="http://www.opentravel.org/OTA/2003/05">
    <Success></Success>
    <FLSResponseFields
   FLSOriginCode="WAW"
   FLSOriginName="Warsaw"
   FLSDestinationCode="YXU"
   FLSDestinationName="London"
   FLSStartDate="2023-12-17"
   FLSEndDate="2023-12-17"

   FLSResultCount="38"
   FLSRoutesFound="38"
   FLSBranchCount="10794"
   FLSTargetCount="44339"
   FLSRecordCount="12494420"
 />
    <FlightDetails TotalFlightTime="PT13H35M"
   TotalMiles="4975"
   TotalTripTime="PT22H16M"
   FLSDepartureDateTime="2023-12-17T06:05:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T06:05:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T07:40:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="9168"
\tJourneyDuration="PT1H35M"
        SequenceNumber="1"
  LegDistance="484"
\tFLSMeals="R"
\tFLSInflightServices=" "
\tFLSUUID="WAWMUC20231217AC9168"
\t\tFLSUUIDActualFlight="WAWMUC20231217LH1617"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="MUC" FLSLocationName="Munich International" Terminal="2" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="1617" />
            <Equipment AirEquipType="319" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T09:20:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T12:45:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="3938"
\tJourneyDuration="PT9H25M"
        SequenceNumber="2"
  LegDistance="4045"
\tFLSMeals="B"
\tFLSInflightServices=" "
\tFLSUUID="MUCEWR20231217AC3938"
\t\tFLSUUIDActualFlight="MUCEWR20231217UA31"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="MUC" FLSLocationName="Munich International" Terminal="2" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="EWR" FLSLocationName="Newark Liberty International Airport" Terminal="B" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" FlightNumber="31" />
            <Equipment AirEquipType="764" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T16:40:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T18:24:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8545"
\tJourneyDuration="PT1H44M"
        SequenceNumber="3"
  LegDistance="357"
\tFLSMeals=""
\tFLSInflightServices="  3/  9/ 12/ 18"
\tFLSUUID="LGAYYZ20231217AC8545"
\t
  FLSDOTDisclosure="Owned By:AIR CANADA EXPRESS - JAZZ"
 >
            <DepartureAirport CodeContext="IATA" LocationCode="LGA" FLSLocationName="LaGuardia Airport" Terminal="B" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="E75" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8265"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217AC8265"
\t
  FLSDOTDisclosure="Owned By:AIR CANADA EXPRESS - JAZZ"
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT13H35M"
   TotalMiles="4975"
   TotalTripTime="PT22H16M"
   FLSDepartureDateTime="2023-12-17T06:05:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T06:05:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T07:40:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="9094"
\tJourneyDuration="PT1H35M"
        SequenceNumber="1"
  LegDistance="484"
\tFLSMeals="R"
\tFLSInflightServices=" "
\tFLSUUID="WAWMUC20231217UA9094"
\t\tFLSUUIDActualFlight="WAWMUC20231217LH1617"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="MUC" FLSLocationName="Munich International" Terminal="2" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="1617" />
            <Equipment AirEquipType="319" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T09:20:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T12:45:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="31"
\tJourneyDuration="PT9H25M"
        SequenceNumber="2"
  LegDistance="4045"
\tFLSMeals="B"
\tFLSInflightServices=" "
\tFLSUUID="MUCEWR20231217UA31"
\t
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="MUC" FLSLocationName="Munich International" Terminal="2" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="EWR" FLSLocationName="Newark Liberty International Airport" Terminal="B" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <Equipment AirEquipType="764" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T16:40:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T18:24:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8233"
\tJourneyDuration="PT1H44M"
        SequenceNumber="3"
  LegDistance="357"
\tFLSMeals=""
\tFLSInflightServices="  3/  9/ 12/ 18"
\tFLSUUID="LGAYYZ20231217UA8233"
\t\tFLSUUIDActualFlight="LGAYYZ20231217AC8545"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="LGA" FLSLocationName="LaGuardia Airport" Terminal="B" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="8545" />
            <Equipment AirEquipType="E75" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8184"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217UA8184"
\t\tFLSUUIDActualFlight="YYZYXU20231217AC8265"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="8265" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT13H37M"
   TotalMiles="4966"
   TotalTripTime="PT22H16M"
   FLSDepartureDateTime="2023-12-17T06:05:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T06:05:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T07:40:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="9168"
\tJourneyDuration="PT1H35M"
        SequenceNumber="1"
  LegDistance="484"
\tFLSMeals="R"
\tFLSInflightServices=" "
\tFLSUUID="WAWMUC20231217AC9168"
\t\tFLSUUIDActualFlight="WAWMUC20231217LH1617"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="MUC" FLSLocationName="Munich International" Terminal="2" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="1617" />
            <Equipment AirEquipType="319" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T09:20:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T12:45:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="3938"
\tJourneyDuration="PT9H25M"
        SequenceNumber="2"
  LegDistance="4045"
\tFLSMeals="B"
\tFLSInflightServices=" "
\tFLSUUID="MUCEWR20231217AC3938"
\t\tFLSUUIDActualFlight="MUCEWR20231217UA31"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="MUC" FLSLocationName="Munich International" Terminal="2" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="EWR" FLSLocationName="Newark Liberty International Airport" Terminal="B" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" FlightNumber="31" />
            <Equipment AirEquipType="764" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T16:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T18:16:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8881"
\tJourneyDuration="PT1H46M"
        SequenceNumber="3"
  LegDistance="348"
\tFLSMeals=""
\tFLSInflightServices="  3/  9/ 12/ 18"
\tFLSUUID="EWRYYZ20231217AC8881"
\t
  FLSDOTDisclosure="Owned By:AIR CANADA EXPRESS - JAZZ"
 >
            <DepartureAirport CodeContext="IATA" LocationCode="EWR" FLSLocationName="Newark Liberty International Airport" Terminal="A" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="E75" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8265"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217AC8265"
\t
  FLSDOTDisclosure="Owned By:AIR CANADA EXPRESS - JAZZ"
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT13H37M"
   TotalMiles="4966"
   TotalTripTime="PT22H16M"
   FLSDepartureDateTime="2023-12-17T06:05:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T06:05:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T07:40:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="9094"
\tJourneyDuration="PT1H35M"
        SequenceNumber="1"
  LegDistance="484"
\tFLSMeals="R"
\tFLSInflightServices=" "
\tFLSUUID="WAWMUC20231217UA9094"
\t\tFLSUUIDActualFlight="WAWMUC20231217LH1617"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="MUC" FLSLocationName="Munich International" Terminal="2" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="1617" />
            <Equipment AirEquipType="319" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T09:20:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T12:45:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="31"
\tJourneyDuration="PT9H25M"
        SequenceNumber="2"
  LegDistance="4045"
\tFLSMeals="B"
\tFLSInflightServices=" "
\tFLSUUID="MUCEWR20231217UA31"
\t
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="MUC" FLSLocationName="Munich International" Terminal="2" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="EWR" FLSLocationName="Newark Liberty International Airport" Terminal="B" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <Equipment AirEquipType="764" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T16:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T18:16:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8432"
\tJourneyDuration="PT1H46M"
        SequenceNumber="3"
  LegDistance="348"
\tFLSMeals=""
\tFLSInflightServices="  3/  9/ 12/ 18"
\tFLSUUID="EWRYYZ20231217UA8432"
\t\tFLSUUIDActualFlight="EWRYYZ20231217AC8881"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="EWR" FLSLocationName="Newark Liberty International Airport" Terminal="A" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="8881" />
            <Equipment AirEquipType="E75" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8184"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217UA8184"
\t\tFLSUUIDActualFlight="YYZYXU20231217AC8265"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="8265" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT13H46M"
   TotalMiles="4966"
   TotalTripTime="PT22H16M"
   FLSDepartureDateTime="2023-12-17T06:05:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T06:05:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T07:40:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="9168"
\tJourneyDuration="PT1H35M"
        SequenceNumber="1"
  LegDistance="484"
\tFLSMeals="R"
\tFLSInflightServices=" "
\tFLSUUID="WAWMUC20231217AC9168"
\t\tFLSUUIDActualFlight="WAWMUC20231217LH1617"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="MUC" FLSLocationName="Munich International" Terminal="2" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="1617" />
            <Equipment AirEquipType="319" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T09:20:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T12:45:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="3938"
\tJourneyDuration="PT9H25M"
        SequenceNumber="2"
  LegDistance="4045"
\tFLSMeals="B"
\tFLSInflightServices=" "
\tFLSUUID="MUCEWR20231217AC3938"
\t\tFLSUUIDActualFlight="MUCEWR20231217UA31"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="MUC" FLSLocationName="Munich International" Terminal="2" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="EWR" FLSLocationName="Newark Liberty International Airport" Terminal="B" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" FlightNumber="31" />
            <Equipment AirEquipType="764" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T16:00:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T17:55:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="3491"
\tJourneyDuration="PT1H55M"
        SequenceNumber="3"
  LegDistance="348"
\tFLSMeals="N"
\tFLSInflightServices=" "
\tFLSUUID="EWRYYZ20231217AC3491"
\t\tFLSUUIDActualFlight="EWRYYZ20231217UA3557"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="EWR" FLSLocationName="Newark Liberty International Airport" Terminal="C" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" FlightNumber="3557" />
            <Equipment AirEquipType="E7W" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8265"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217AC8265"
\t
  FLSDOTDisclosure="Owned By:AIR CANADA EXPRESS - JAZZ"
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT13H46M"
   TotalMiles="4966"
   TotalTripTime="PT22H16M"
   FLSDepartureDateTime="2023-12-17T06:05:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T06:05:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T07:40:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="9094"
\tJourneyDuration="PT1H35M"
        SequenceNumber="1"
  LegDistance="484"
\tFLSMeals="R"
\tFLSInflightServices=" "
\tFLSUUID="WAWMUC20231217UA9094"
\t\tFLSUUIDActualFlight="WAWMUC20231217LH1617"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="MUC" FLSLocationName="Munich International" Terminal="2" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="1617" />
            <Equipment AirEquipType="319" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T09:20:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T12:45:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="31"
\tJourneyDuration="PT9H25M"
        SequenceNumber="2"
  LegDistance="4045"
\tFLSMeals="B"
\tFLSInflightServices=" "
\tFLSUUID="MUCEWR20231217UA31"
\t
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="MUC" FLSLocationName="Munich International" Terminal="2" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="EWR" FLSLocationName="Newark Liberty International Airport" Terminal="B" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <Equipment AirEquipType="764" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T16:00:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T17:55:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="3557"
\tJourneyDuration="PT1H55M"
        SequenceNumber="3"
  LegDistance="348"
\tFLSMeals="N"
\tFLSInflightServices=" "
\tFLSUUID="EWRYYZ20231217UA3557"
\t
  FLSDOTDisclosure="Owned By:REPUBLIC AIRWAYS DBA UNITED EXPRESS"
 >
            <DepartureAirport CodeContext="IATA" LocationCode="EWR" FLSLocationName="Newark Liberty International Airport" Terminal="C" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <Equipment AirEquipType="E7W" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8184"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217UA8184"
\t\tFLSUUIDActualFlight="YYZYXU20231217AC8265"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="8265" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT13H44M"
   TotalMiles="5531"
   TotalTripTime="PT22H16M"
   FLSDepartureDateTime="2023-12-17T06:05:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T06:05:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T07:40:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="9168"
\tJourneyDuration="PT1H35M"
        SequenceNumber="1"
  LegDistance="484"
\tFLSMeals="R"
\tFLSInflightServices=" "
\tFLSUUID="WAWMUC20231217AC9168"
\t\tFLSUUIDActualFlight="WAWMUC20231217LH1617"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="MUC" FLSLocationName="Munich International" Terminal="2" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="1617" />
            <Equipment AirEquipType="319" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T11:25:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T14:10:00"
        FLSArrivalTimeOffset="-0600"
\t
\tFlightNumber="3945"
\tJourneyDuration="PT9H45M"
        SequenceNumber="2"
  LegDistance="4522"
\tFLSMeals="L"
\tFLSInflightServices=" "
\tFLSUUID="MUCORD20231217AC3945"
\t\tFLSUUIDActualFlight="MUCORD20231217UA952"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="MUC" FLSLocationName="Munich International" Terminal="2" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="ORD" FLSLocationName="O'Hare International Airport" Terminal="5" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" FlightNumber="952" />
            <Equipment AirEquipType="781" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T16:35:00"
   \tFLSDepartureTimeOffset="-0600"
\tArrivalDateTime="2023-12-17T19:08:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="506"
\tJourneyDuration="PT1H33M"
        SequenceNumber="3"
  LegDistance="436"
\tFLSMeals=""
\tFLSInflightServices="  3/  9/ 12/ 18"
\tFLSUUID="ORDYYZ20231217AC506"
\t
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="ORD" FLSLocationName="O'Hare International Airport" Terminal="2" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="223" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8265"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217AC8265"
\t
  FLSDOTDisclosure="Owned By:AIR CANADA EXPRESS - JAZZ"
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT13H44M"
   TotalMiles="5531"
   TotalTripTime="PT22H16M"
   FLSDepartureDateTime="2023-12-17T06:05:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T06:05:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T07:40:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="9094"
\tJourneyDuration="PT1H35M"
        SequenceNumber="1"
  LegDistance="484"
\tFLSMeals="R"
\tFLSInflightServices=" "
\tFLSUUID="WAWMUC20231217UA9094"
\t\tFLSUUIDActualFlight="WAWMUC20231217LH1617"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="MUC" FLSLocationName="Munich International" Terminal="2" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="1617" />
            <Equipment AirEquipType="319" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T11:25:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T14:10:00"
        FLSArrivalTimeOffset="-0600"
\t
\tFlightNumber="952"
\tJourneyDuration="PT9H45M"
        SequenceNumber="2"
  LegDistance="4522"
\tFLSMeals="L"
\tFLSInflightServices=" "
\tFLSUUID="MUCORD20231217UA952"
\t
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="MUC" FLSLocationName="Munich International" Terminal="2" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="ORD" FLSLocationName="O'Hare International Airport" Terminal="5" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <Equipment AirEquipType="781" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T16:35:00"
   \tFLSDepartureTimeOffset="-0600"
\tArrivalDateTime="2023-12-17T19:08:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8308"
\tJourneyDuration="PT1H33M"
        SequenceNumber="3"
  LegDistance="436"
\tFLSMeals=""
\tFLSInflightServices="  3/  9/ 12/ 18"
\tFLSUUID="ORDYYZ20231217UA8308"
\t\tFLSUUIDActualFlight="ORDYYZ20231217AC506"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="ORD" FLSLocationName="O'Hare International Airport" Terminal="2" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="506" />
            <Equipment AirEquipType="223" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8184"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217UA8184"
\t\tFLSUUIDActualFlight="YYZYXU20231217AC8265"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="8265" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT14H05M"
   TotalMiles="5531"
   TotalTripTime="PT22H16M"
   FLSDepartureDateTime="2023-12-17T06:05:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T06:05:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T07:40:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="9168"
\tJourneyDuration="PT1H35M"
        SequenceNumber="1"
  LegDistance="484"
\tFLSMeals="R"
\tFLSInflightServices=" "
\tFLSUUID="WAWMUC20231217AC9168"
\t\tFLSUUIDActualFlight="WAWMUC20231217LH1617"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="MUC" FLSLocationName="Munich International" Terminal="2" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="1617" />
            <Equipment AirEquipType="319" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T11:25:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T14:10:00"
        FLSArrivalTimeOffset="-0600"
\t
\tFlightNumber="3945"
\tJourneyDuration="PT9H45M"
        SequenceNumber="2"
  LegDistance="4522"
\tFLSMeals="L"
\tFLSInflightServices=" "
\tFLSUUID="MUCORD20231217AC3945"
\t\tFLSUUIDActualFlight="MUCORD20231217UA952"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="MUC" FLSLocationName="Munich International" Terminal="2" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="ORD" FLSLocationName="O'Hare International Airport" Terminal="5" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" FlightNumber="952" />
            <Equipment AirEquipType="781" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T16:31:00"
   \tFLSDepartureTimeOffset="-0600"
\tArrivalDateTime="2023-12-17T19:25:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="5014"
\tJourneyDuration="PT1H54M"
        SequenceNumber="3"
  LegDistance="436"
\tFLSMeals="N"
\tFLSInflightServices=" "
\tFLSUUID="ORDYYZ20231217AC5014"
\t\tFLSUUIDActualFlight="ORDYYZ20231217UA5462"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="ORD" FLSLocationName="O'Hare International Airport" Terminal="2" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" FlightNumber="5462" />
            <Equipment AirEquipType="E7W" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8265"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217AC8265"
\t
  FLSDOTDisclosure="Owned By:AIR CANADA EXPRESS - JAZZ"
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT14H05M"
   TotalMiles="5531"
   TotalTripTime="PT22H16M"
   FLSDepartureDateTime="2023-12-17T06:05:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T06:05:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T07:40:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="9094"
\tJourneyDuration="PT1H35M"
        SequenceNumber="1"
  LegDistance="484"
\tFLSMeals="R"
\tFLSInflightServices=" "
\tFLSUUID="WAWMUC20231217UA9094"
\t\tFLSUUIDActualFlight="WAWMUC20231217LH1617"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="MUC" FLSLocationName="Munich International" Terminal="2" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="1617" />
            <Equipment AirEquipType="319" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T11:25:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T14:10:00"
        FLSArrivalTimeOffset="-0600"
\t
\tFlightNumber="952"
\tJourneyDuration="PT9H45M"
        SequenceNumber="2"
  LegDistance="4522"
\tFLSMeals="L"
\tFLSInflightServices=" "
\tFLSUUID="MUCORD20231217UA952"
\t
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="MUC" FLSLocationName="Munich International" Terminal="2" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="ORD" FLSLocationName="O'Hare International Airport" Terminal="5" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <Equipment AirEquipType="781" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T16:31:00"
   \tFLSDepartureTimeOffset="-0600"
\tArrivalDateTime="2023-12-17T19:25:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="5462"
\tJourneyDuration="PT1H54M"
        SequenceNumber="3"
  LegDistance="436"
\tFLSMeals="N"
\tFLSInflightServices=" "
\tFLSUUID="ORDYYZ20231217UA5462"
\t
  FLSDOTDisclosure="Owned By:SKYWEST DBA UNITED EXPRESS"
 >
            <DepartureAirport CodeContext="IATA" LocationCode="ORD" FLSLocationName="O'Hare International Airport" Terminal="2" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <Equipment AirEquipType="E7W" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8184"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217UA8184"
\t\tFLSUUIDActualFlight="YYZYXU20231217AC8265"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="8265" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT13H10M"
   TotalMiles="4853"
   TotalTripTime="PT21H26M"
   FLSDepartureDateTime="2023-12-17T06:55:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T06:55:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T08:50:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="9424"
\tJourneyDuration="PT1H55M"
        SequenceNumber="1"
  LegDistance="557"
\tFLSMeals="R"
\tFLSInflightServices=" "
\tFLSUUID="WAWFRA20231217UA9424"
\t\tFLSUUIDActualFlight="WAWFRA20231217LH1353"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="1353" />
            <Equipment AirEquipType="32A" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T11:00:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T13:40:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8841"
\tJourneyDuration="PT8H40M"
        SequenceNumber="2"
  LegDistance="3850"
\tFLSMeals="RM"
\tFLSInflightServices=" "
\tFLSUUID="FRAJFK20231217UA8841"
\t\tFLSUUIDActualFlight="FRAJFK20231217LH400"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="JFK" FLSLocationName="John F. Kennedy International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="400" />
            <Equipment AirEquipType="74H" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T16:40:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T18:24:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8233"
\tJourneyDuration="PT1H44M"
        SequenceNumber="3"
  LegDistance="357"
\tFLSMeals=""
\tFLSInflightServices="  3/  9/ 12/ 18"
\tFLSUUID="LGAYYZ20231217UA8233"
\t\tFLSUUIDActualFlight="LGAYYZ20231217AC8545"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="LGA" FLSLocationName="LaGuardia Airport" Terminal="B" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="8545" />
            <Equipment AirEquipType="E75" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8184"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217UA8184"
\t\tFLSUUIDActualFlight="YYZYXU20231217AC8265"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="8265" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT13H05M"
   TotalMiles="4863"
   TotalTripTime="PT21H26M"
   FLSDepartureDateTime="2023-12-17T06:55:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T06:55:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T08:50:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="9424"
\tJourneyDuration="PT1H55M"
        SequenceNumber="1"
  LegDistance="557"
\tFLSMeals="R"
\tFLSInflightServices=" "
\tFLSUUID="WAWFRA20231217UA9424"
\t\tFLSUUIDActualFlight="WAWFRA20231217LH1353"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="1353" />
            <Equipment AirEquipType="32A" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T11:00:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T13:40:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8841"
\tJourneyDuration="PT8H40M"
        SequenceNumber="2"
  LegDistance="3850"
\tFLSMeals="RM"
\tFLSInflightServices=" "
\tFLSUUID="FRAJFK20231217UA8841"
\t\tFLSUUIDActualFlight="FRAJFK20231217LH400"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="JFK" FLSLocationName="John F. Kennedy International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="400" />
            <Equipment AirEquipType="74H" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T15:55:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T17:34:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="6631"
\tJourneyDuration="PT1H39M"
        SequenceNumber="3"
  LegDistance="367"
\tFLSMeals=""
\tFLSInflightServices="  3/  9/ 12/ 18"
\tFLSUUID="JFKYYZ20231217UA6631"
\t\tFLSUUIDActualFlight="JFKYYZ20231217AC8555"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="JFK" FLSLocationName="John F. Kennedy International Airport" Terminal="7" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="8555" />
            <Equipment AirEquipType="E75" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8184"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217UA8184"
\t\tFLSUUIDActualFlight="YYZYXU20231217AC8265"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="8265" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT13H13M"
   TotalMiles="4754"
   TotalTripTime="PT21H26M"
   FLSDepartureDateTime="2023-12-17T06:55:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T06:55:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T08:50:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="9409"
\tJourneyDuration="PT1H55M"
        SequenceNumber="1"
  LegDistance="557"
\tFLSMeals="R"
\tFLSInflightServices=" "
\tFLSUUID="WAWFRA20231217AC9409"
\t\tFLSUUIDActualFlight="WAWFRA20231217LH1353"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="1353" />
            <Equipment AirEquipType="32A" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T10:55:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T13:25:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="9451"
\tJourneyDuration="PT8H30M"
        SequenceNumber="2"
  LegDistance="3663"
\tFLSMeals="RM"
\tFLSInflightServices=" "
\tFLSUUID="FRABOS20231217AC9451"
\t\tFLSUUIDActualFlight="FRABOS20231217LH422"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="BOS" FLSLocationName="Edward L. Logan International Airport" Terminal="E" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="422" />
            <Equipment AirEquipType="343" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T16:55:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T18:52:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8689"
\tJourneyDuration="PT1H57M"
        SequenceNumber="3"
  LegDistance="445"
\tFLSMeals=""
\tFLSInflightServices="  3/  9/ 12/ 18"
\tFLSUUID="BOSYYZ20231217AC8689"
\t
  FLSDOTDisclosure="Owned By:AIR CANADA EXPRESS - JAZZ"
 >
            <DepartureAirport CodeContext="IATA" LocationCode="BOS" FLSLocationName="Edward L. Logan International Airport" Terminal="B" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="CR9" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8265"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217AC8265"
\t
  FLSDOTDisclosure="Owned By:AIR CANADA EXPRESS - JAZZ"
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT13H13M"
   TotalMiles="4754"
   TotalTripTime="PT21H26M"
   FLSDepartureDateTime="2023-12-17T06:55:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T06:55:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T08:50:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="9424"
\tJourneyDuration="PT1H55M"
        SequenceNumber="1"
  LegDistance="557"
\tFLSMeals="R"
\tFLSInflightServices=" "
\tFLSUUID="WAWFRA20231217UA9424"
\t\tFLSUUIDActualFlight="WAWFRA20231217LH1353"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="1353" />
            <Equipment AirEquipType="32A" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T10:55:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T13:25:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8853"
\tJourneyDuration="PT8H30M"
        SequenceNumber="2"
  LegDistance="3663"
\tFLSMeals="RM"
\tFLSInflightServices=" "
\tFLSUUID="FRABOS20231217UA8853"
\t\tFLSUUIDActualFlight="FRABOS20231217LH422"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="BOS" FLSLocationName="Edward L. Logan International Airport" Terminal="E" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="422" />
            <Equipment AirEquipType="343" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T16:55:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T18:52:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8471"
\tJourneyDuration="PT1H57M"
        SequenceNumber="3"
  LegDistance="445"
\tFLSMeals=""
\tFLSInflightServices="  3/  9/ 12/ 18"
\tFLSUUID="BOSYYZ20231217UA8471"
\t\tFLSUUIDActualFlight="BOSYYZ20231217AC8689"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="BOS" FLSLocationName="Edward L. Logan International Airport" Terminal="B" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="8689" />
            <Equipment AirEquipType="CR9" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8184"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217UA8184"
\t\tFLSUUIDActualFlight="YYZYXU20231217AC8265"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="8265" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT13H49M"
   TotalMiles="5418"
   TotalTripTime="PT21H26M"
   FLSDepartureDateTime="2023-12-17T06:55:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T06:55:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T08:50:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="9409"
\tJourneyDuration="PT1H55M"
        SequenceNumber="1"
  LegDistance="557"
\tFLSMeals="R"
\tFLSInflightServices=" "
\tFLSUUID="WAWFRA20231217AC9409"
\t\tFLSUUIDActualFlight="WAWFRA20231217LH1353"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="1353" />
            <Equipment AirEquipType="32A" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T10:45:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T13:15:00"
        FLSArrivalTimeOffset="-0600"
\t
\tFlightNumber="9457"
\tJourneyDuration="PT9H30M"
        SequenceNumber="2"
  LegDistance="4336"
\tFLSMeals="RM"
\tFLSInflightServices=" "
\tFLSUUID="FRAORD20231217AC9457"
\t\tFLSUUIDActualFlight="FRAORD20231217LH430"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="ORD" FLSLocationName="O'Hare International Airport" Terminal="5" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="430" />
            <Equipment AirEquipType="346" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T16:35:00"
   \tFLSDepartureTimeOffset="-0600"
\tArrivalDateTime="2023-12-17T19:08:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="506"
\tJourneyDuration="PT1H33M"
        SequenceNumber="3"
  LegDistance="436"
\tFLSMeals=""
\tFLSInflightServices="  3/  9/ 12/ 18"
\tFLSUUID="ORDYYZ20231217AC506"
\t
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="ORD" FLSLocationName="O'Hare International Airport" Terminal="2" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="223" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8265"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217AC8265"
\t
  FLSDOTDisclosure="Owned By:AIR CANADA EXPRESS - JAZZ"
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT13H49M"
   TotalMiles="5418"
   TotalTripTime="PT21H26M"
   FLSDepartureDateTime="2023-12-17T06:55:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T06:55:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T08:50:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="9424"
\tJourneyDuration="PT1H55M"
        SequenceNumber="1"
  LegDistance="557"
\tFLSMeals="R"
\tFLSInflightServices=" "
\tFLSUUID="WAWFRA20231217UA9424"
\t\tFLSUUIDActualFlight="WAWFRA20231217LH1353"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="1353" />
            <Equipment AirEquipType="32A" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T10:45:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T13:15:00"
        FLSArrivalTimeOffset="-0600"
\t
\tFlightNumber="8836"
\tJourneyDuration="PT9H30M"
        SequenceNumber="2"
  LegDistance="4336"
\tFLSMeals="RM"
\tFLSInflightServices=" "
\tFLSUUID="FRAORD20231217UA8836"
\t\tFLSUUIDActualFlight="FRAORD20231217LH430"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="ORD" FLSLocationName="O'Hare International Airport" Terminal="5" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="430" />
            <Equipment AirEquipType="346" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T16:35:00"
   \tFLSDepartureTimeOffset="-0600"
\tArrivalDateTime="2023-12-17T19:08:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8308"
\tJourneyDuration="PT1H33M"
        SequenceNumber="3"
  LegDistance="436"
\tFLSMeals=""
\tFLSInflightServices="  3/  9/ 12/ 18"
\tFLSUUID="ORDYYZ20231217UA8308"
\t\tFLSUUIDActualFlight="ORDYYZ20231217AC506"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="ORD" FLSLocationName="O'Hare International Airport" Terminal="2" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="506" />
            <Equipment AirEquipType="223" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8184"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217UA8184"
\t\tFLSUUIDActualFlight="YYZYXU20231217AC8265"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="8265" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT14H10M"
   TotalMiles="5418"
   TotalTripTime="PT21H26M"
   FLSDepartureDateTime="2023-12-17T06:55:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T06:55:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T08:50:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="9409"
\tJourneyDuration="PT1H55M"
        SequenceNumber="1"
  LegDistance="557"
\tFLSMeals="R"
\tFLSInflightServices=" "
\tFLSUUID="WAWFRA20231217AC9409"
\t\tFLSUUIDActualFlight="WAWFRA20231217LH1353"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="1353" />
            <Equipment AirEquipType="32A" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T10:45:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T13:15:00"
        FLSArrivalTimeOffset="-0600"
\t
\tFlightNumber="9457"
\tJourneyDuration="PT9H30M"
        SequenceNumber="2"
  LegDistance="4336"
\tFLSMeals="RM"
\tFLSInflightServices=" "
\tFLSUUID="FRAORD20231217AC9457"
\t\tFLSUUIDActualFlight="FRAORD20231217LH430"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="ORD" FLSLocationName="O'Hare International Airport" Terminal="5" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="430" />
            <Equipment AirEquipType="346" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T16:31:00"
   \tFLSDepartureTimeOffset="-0600"
\tArrivalDateTime="2023-12-17T19:25:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="5014"
\tJourneyDuration="PT1H54M"
        SequenceNumber="3"
  LegDistance="436"
\tFLSMeals="N"
\tFLSInflightServices=" "
\tFLSUUID="ORDYYZ20231217AC5014"
\t\tFLSUUIDActualFlight="ORDYYZ20231217UA5462"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="ORD" FLSLocationName="O'Hare International Airport" Terminal="2" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" FlightNumber="5462" />
            <Equipment AirEquipType="E7W" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8265"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217AC8265"
\t
  FLSDOTDisclosure="Owned By:AIR CANADA EXPRESS - JAZZ"
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT14H10M"
   TotalMiles="5418"
   TotalTripTime="PT21H26M"
   FLSDepartureDateTime="2023-12-17T06:55:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T06:55:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T08:50:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="9424"
\tJourneyDuration="PT1H55M"
        SequenceNumber="1"
  LegDistance="557"
\tFLSMeals="R"
\tFLSInflightServices=" "
\tFLSUUID="WAWFRA20231217UA9424"
\t\tFLSUUIDActualFlight="WAWFRA20231217LH1353"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="1353" />
            <Equipment AirEquipType="32A" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T10:45:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T13:15:00"
        FLSArrivalTimeOffset="-0600"
\t
\tFlightNumber="8836"
\tJourneyDuration="PT9H30M"
        SequenceNumber="2"
  LegDistance="4336"
\tFLSMeals="RM"
\tFLSInflightServices=" "
\tFLSUUID="FRAORD20231217UA8836"
\t\tFLSUUIDActualFlight="FRAORD20231217LH430"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="ORD" FLSLocationName="O'Hare International Airport" Terminal="5" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="430" />
            <Equipment AirEquipType="346" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T16:31:00"
   \tFLSDepartureTimeOffset="-0600"
\tArrivalDateTime="2023-12-17T19:25:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="5462"
\tJourneyDuration="PT1H54M"
        SequenceNumber="3"
  LegDistance="436"
\tFLSMeals="N"
\tFLSInflightServices=" "
\tFLSUUID="ORDYYZ20231217UA5462"
\t
  FLSDOTDisclosure="Owned By:SKYWEST DBA UNITED EXPRESS"
 >
            <DepartureAirport CodeContext="IATA" LocationCode="ORD" FLSLocationName="O'Hare International Airport" Terminal="2" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <Equipment AirEquipType="E7W" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8184"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217UA8184"
\t\tFLSUUIDActualFlight="YYZYXU20231217AC8265"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="8265" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT13H33M"
   TotalMiles="5014"
   TotalTripTime="PT21H26M"
   FLSDepartureDateTime="2023-12-17T06:55:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T06:55:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T08:50:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="9424"
\tJourneyDuration="PT1H55M"
        SequenceNumber="1"
  LegDistance="557"
\tFLSMeals="R"
\tFLSInflightServices=" "
\tFLSUUID="WAWFRA20231217UA9424"
\t\tFLSUUIDActualFlight="WAWFRA20231217LH1353"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="1353" />
            <Equipment AirEquipType="32A" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T11:00:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T14:30:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="9196"
\tJourneyDuration="PT9H30M"
        SequenceNumber="2"
  LegDistance="4154"
\tFLSMeals="RM"
\tFLSInflightServices=" "
\tFLSUUID="FRADTW20231217UA9196"
\t\tFLSUUIDActualFlight="FRADTW20231217LH442"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="DTW" FLSLocationName="Metropolitan Wayne County Airport" Terminal="N" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="442" />
            <Equipment AirEquipType="343" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T16:40:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T17:57:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8053"
\tJourneyDuration="PT1H17M"
        SequenceNumber="3"
  LegDistance="214"
\tFLSMeals=""
\tFLSInflightServices="  3/  9/ 12/ 18"
\tFLSUUID="DTWYYZ20231217UA8053"
\t\tFLSUUIDActualFlight="DTWYYZ20231217AC8776"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="DTW" FLSLocationName="Metropolitan Wayne County Airport" Terminal="N" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="8776" />
            <Equipment AirEquipType="CR9" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8184"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217UA8184"
\t\tFLSUUIDActualFlight="YYZYXU20231217AC8265"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="8265" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT15H33M"
   TotalMiles="5996"
   TotalTripTime="PT21H26M"
   FLSDepartureDateTime="2023-12-17T06:55:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T06:55:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T08:50:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="9424"
\tJourneyDuration="PT1H55M"
        SequenceNumber="1"
  LegDistance="557"
\tFLSMeals="R"
\tFLSInflightServices=" "
\tFLSUUID="WAWFRA20231217UA9424"
\t\tFLSUUIDActualFlight="WAWFRA20231217LH1353"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="1353" />
            <Equipment AirEquipType="32A" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T10:35:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T15:05:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8831"
\tJourneyDuration="PT10H30M"
        SequenceNumber="2"
  LegDistance="4609"
\tFLSMeals="RM"
\tFLSInflightServices=" "
\tFLSUUID="FRAATL20231217UA8831"
\t\tFLSUUIDActualFlight="FRAATL20231217LH444"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="ATL" FLSLocationName="Hartsfield-Jackson International Airpor" Terminal="I" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="444" />
            <Equipment AirEquipType="343" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T17:25:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T19:42:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8109"
\tJourneyDuration="PT2H17M"
        SequenceNumber="3"
  LegDistance="741"
\tFLSMeals="F"
\tFLSInflightServices="  3/  9/ 12/ 18"
\tFLSUUID="ATLYYZ20231217UA8109"
\t\tFLSUUIDActualFlight="ATLYYZ20231217AC1308"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="ATL" FLSLocationName="Hartsfield-Jackson International Airpor" Terminal="I" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="1308" />
            <Equipment AirEquipType="223" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8184"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217UA8184"
\t\tFLSUUIDActualFlight="YYZYXU20231217AC8265"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="8265" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT14H56M"
   TotalMiles="5886"
   TotalTripTime="PT21H26M"
   FLSDepartureDateTime="2023-12-17T06:55:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T06:55:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T08:50:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="9424"
\tJourneyDuration="PT1H55M"
        SequenceNumber="1"
  LegDistance="557"
\tFLSMeals="R"
\tFLSInflightServices=" "
\tFLSUUID="WAWFRA20231217UA9424"
\t\tFLSUUIDActualFlight="WAWFRA20231217LH1353"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="1353" />
            <Equipment AirEquipType="32A" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T10:45:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T13:55:00"
        FLSArrivalTimeOffset="-0600"
\t
\tFlightNumber="9066"
\tJourneyDuration="PT10H10M"
        SequenceNumber="2"
  LegDistance="4586"
\tFLSMeals="RM"
\tFLSInflightServices=" "
\tFLSUUID="FRASTL20231217UA9066"
\t\tFLSUUIDActualFlight="FRASTL20231217LH448"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="STL" FLSLocationName="Lambert-Saint Louis International Airpo" Terminal="2" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="448" />
            <Equipment AirEquipType="333" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T17:00:00"
   \tFLSDepartureTimeOffset="-0600"
\tArrivalDateTime="2023-12-17T20:00:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8196"
\tJourneyDuration="PT2H00M"
        SequenceNumber="3"
  LegDistance="654"
\tFLSMeals="F"
\tFLSInflightServices="  3/  9/ 12/ 18"
\tFLSUUID="STLYYZ20231217UA8196"
\t\tFLSUUIDActualFlight="STLYYZ20231217AC8970"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="STL" FLSLocationName="Lambert-Saint Louis International Airpo" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="8970" />
            <Equipment AirEquipType="CR9" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8184"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217UA8184"
\t\tFLSUUIDActualFlight="YYZYXU20231217AC8265"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="8265" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT12H41M"
   TotalMiles="4603"
   TotalTripTime="PT21H26M"
   FLSDepartureDateTime="2023-12-17T06:55:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T06:55:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T08:50:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="1353"
\tJourneyDuration="PT1H55M"
        SequenceNumber="1"
  LegDistance="557"
\tFLSMeals="R"
\tFLSInflightServices=" "
\tFLSUUID="WAWFRA20231217LH1353"
\t
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" />
            <Equipment AirEquipType="32A" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T12:00:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T12:45:00"
        FLSArrivalTimeOffset="+0000"
\t
\tFlightNumber="906"
\tJourneyDuration="PT1H45M"
        SequenceNumber="2"
  LegDistance="407"
\tFLSMeals="RG"
\tFLSInflightServices=" "
\tFLSUUID="FRALHR20231217LH906"
\t
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="LHR" FLSLocationName="Heathrow Airport" Terminal="2" FLSDayIndicator="" />
            <MarketingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" />
            <Equipment AirEquipType="32N" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T15:00:00"
   \tFLSDepartureTimeOffset="+0000"
\tArrivalDateTime="2023-12-17T18:10:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="6584"
\tJourneyDuration="PT8H10M"
        SequenceNumber="3"
  LegDistance="3550"
\tFLSMeals="MS"
\tFLSInflightServices="  3/  9/ 12/ 18/ 20"
\tFLSUUID="LHRYYZ20231217LH6584"
\t\tFLSUUIDActualFlight="LHRYYZ20231217AC857"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="LHR" FLSLocationName="Heathrow Airport" Terminal="2" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="857" />
            <Equipment AirEquipType="77W" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="6508"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217LH6508"
\t\tFLSUUIDActualFlight="YYZYXU20231217AC8265"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="8265" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT13H27M"
   TotalMiles="4857"
   TotalTripTime="PT21H26M"
   FLSDepartureDateTime="2023-12-17T06:55:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T06:55:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T08:50:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="9409"
\tJourneyDuration="PT1H55M"
        SequenceNumber="1"
  LegDistance="557"
\tFLSMeals="R"
\tFLSInflightServices=" "
\tFLSUUID="WAWFRA20231217AC9409"
\t\tFLSUUIDActualFlight="WAWFRA20231217LH1353"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="1353" />
            <Equipment AirEquipType="32A" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T11:05:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T14:00:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="5685"
\tJourneyDuration="PT8H55M"
        SequenceNumber="2"
  LegDistance="3863"
\tFLSMeals="L"
\tFLSInflightServices=" "
\tFLSUUID="FRAEWR20231217AC5685"
\t\tFLSUUIDActualFlight="FRAEWR20231217UA961"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="EWR" FLSLocationName="Newark Liberty International Airport" Terminal="C" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" FlightNumber="961" />
            <Equipment AirEquipType="781" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T16:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T18:16:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8881"
\tJourneyDuration="PT1H46M"
        SequenceNumber="3"
  LegDistance="348"
\tFLSMeals=""
\tFLSInflightServices="  3/  9/ 12/ 18"
\tFLSUUID="EWRYYZ20231217AC8881"
\t
  FLSDOTDisclosure="Owned By:AIR CANADA EXPRESS - JAZZ"
 >
            <DepartureAirport CodeContext="IATA" LocationCode="EWR" FLSLocationName="Newark Liberty International Airport" Terminal="A" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="E75" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8265"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217AC8265"
\t
  FLSDOTDisclosure="Owned By:AIR CANADA EXPRESS - JAZZ"
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT13H27M"
   TotalMiles="4857"
   TotalTripTime="PT21H26M"
   FLSDepartureDateTime="2023-12-17T06:55:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T06:55:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T08:50:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="9424"
\tJourneyDuration="PT1H55M"
        SequenceNumber="1"
  LegDistance="557"
\tFLSMeals="R"
\tFLSInflightServices=" "
\tFLSUUID="WAWFRA20231217UA9424"
\t\tFLSUUIDActualFlight="WAWFRA20231217LH1353"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="1353" />
            <Equipment AirEquipType="32A" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T11:05:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T14:00:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="961"
\tJourneyDuration="PT8H55M"
        SequenceNumber="2"
  LegDistance="3863"
\tFLSMeals="L"
\tFLSInflightServices=" "
\tFLSUUID="FRAEWR20231217UA961"
\t
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="EWR" FLSLocationName="Newark Liberty International Airport" Terminal="C" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <Equipment AirEquipType="781" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T16:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T18:16:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8432"
\tJourneyDuration="PT1H46M"
        SequenceNumber="3"
  LegDistance="348"
\tFLSMeals=""
\tFLSInflightServices="  3/  9/ 12/ 18"
\tFLSUUID="EWRYYZ20231217UA8432"
\t\tFLSUUIDActualFlight="EWRYYZ20231217AC8881"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="EWR" FLSLocationName="Newark Liberty International Airport" Terminal="A" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="8881" />
            <Equipment AirEquipType="E75" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8184"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217UA8184"
\t\tFLSUUIDActualFlight="YYZYXU20231217AC8265"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="8265" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT13H36M"
   TotalMiles="4857"
   TotalTripTime="PT21H26M"
   FLSDepartureDateTime="2023-12-17T06:55:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T06:55:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T08:50:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="9409"
\tJourneyDuration="PT1H55M"
        SequenceNumber="1"
  LegDistance="557"
\tFLSMeals="R"
\tFLSInflightServices=" "
\tFLSUUID="WAWFRA20231217AC9409"
\t\tFLSUUIDActualFlight="WAWFRA20231217LH1353"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="1353" />
            <Equipment AirEquipType="32A" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T11:05:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T14:00:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="5685"
\tJourneyDuration="PT8H55M"
        SequenceNumber="2"
  LegDistance="3863"
\tFLSMeals="L"
\tFLSInflightServices=" "
\tFLSUUID="FRAEWR20231217AC5685"
\t\tFLSUUIDActualFlight="FRAEWR20231217UA961"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="EWR" FLSLocationName="Newark Liberty International Airport" Terminal="C" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" FlightNumber="961" />
            <Equipment AirEquipType="781" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T16:00:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T17:55:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="3491"
\tJourneyDuration="PT1H55M"
        SequenceNumber="3"
  LegDistance="348"
\tFLSMeals="N"
\tFLSInflightServices=" "
\tFLSUUID="EWRYYZ20231217AC3491"
\t\tFLSUUIDActualFlight="EWRYYZ20231217UA3557"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="EWR" FLSLocationName="Newark Liberty International Airport" Terminal="C" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" FlightNumber="3557" />
            <Equipment AirEquipType="E7W" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8265"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217AC8265"
\t
  FLSDOTDisclosure="Owned By:AIR CANADA EXPRESS - JAZZ"
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT13H36M"
   TotalMiles="4857"
   TotalTripTime="PT21H26M"
   FLSDepartureDateTime="2023-12-17T06:55:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T06:55:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T08:50:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="9424"
\tJourneyDuration="PT1H55M"
        SequenceNumber="1"
  LegDistance="557"
\tFLSMeals="R"
\tFLSInflightServices=" "
\tFLSUUID="WAWFRA20231217UA9424"
\t\tFLSUUIDActualFlight="WAWFRA20231217LH1353"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="1353" />
            <Equipment AirEquipType="32A" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T11:05:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T14:00:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="961"
\tJourneyDuration="PT8H55M"
        SequenceNumber="2"
  LegDistance="3863"
\tFLSMeals="L"
\tFLSInflightServices=" "
\tFLSUUID="FRAEWR20231217UA961"
\t
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="EWR" FLSLocationName="Newark Liberty International Airport" Terminal="C" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <Equipment AirEquipType="781" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T16:00:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T17:55:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="3557"
\tJourneyDuration="PT1H55M"
        SequenceNumber="3"
  LegDistance="348"
\tFLSMeals="N"
\tFLSInflightServices=" "
\tFLSUUID="EWRYYZ20231217UA3557"
\t
  FLSDOTDisclosure="Owned By:REPUBLIC AIRWAYS DBA UNITED EXPRESS"
 >
            <DepartureAirport CodeContext="IATA" LocationCode="EWR" FLSLocationName="Newark Liberty International Airport" Terminal="C" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <Equipment AirEquipType="E7W" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8184"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217UA8184"
\t\tFLSUUIDActualFlight="YYZYXU20231217AC8265"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="8265" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT13H38M"
   TotalMiles="5066"
   TotalTripTime="PT21H26M"
   FLSDepartureDateTime="2023-12-17T06:55:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T06:55:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T08:50:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="9409"
\tJourneyDuration="PT1H55M"
        SequenceNumber="1"
  LegDistance="557"
\tFLSMeals="R"
\tFLSInflightServices=" "
\tFLSUUID="WAWFRA20231217AC9409"
\t\tFLSUUIDActualFlight="WAWFRA20231217LH1353"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="1353" />
            <Equipment AirEquipType="32A" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T11:30:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T14:40:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="3757"
\tJourneyDuration="PT9H10M"
        SequenceNumber="2"
  LegDistance="4074"
\tFLSMeals="L"
\tFLSInflightServices=" "
\tFLSUUID="FRAIAD20231217AC3757"
\t\tFLSUUIDActualFlight="FRAIAD20231217UA988"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="IAD" FLSLocationName="Dulles International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" FlightNumber="988" />
            <Equipment AirEquipType="77W" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T17:15:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T18:57:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="3934"
\tJourneyDuration="PT1H42M"
        SequenceNumber="3"
  LegDistance="346"
\tFLSMeals="N"
\tFLSInflightServices=" "
\tFLSUUID="IADYYZ20231217AC3934"
\t\tFLSUUIDActualFlight="IADYYZ20231217UA6169"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="IAD" FLSLocationName="Dulles International Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" FlightNumber="6169" />
            <Equipment AirEquipType="E7W" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8265"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217AC8265"
\t
  FLSDOTDisclosure="Owned By:AIR CANADA EXPRESS - JAZZ"
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT13H38M"
   TotalMiles="5066"
   TotalTripTime="PT21H26M"
   FLSDepartureDateTime="2023-12-17T06:55:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T06:55:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T08:50:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="9424"
\tJourneyDuration="PT1H55M"
        SequenceNumber="1"
  LegDistance="557"
\tFLSMeals="R"
\tFLSInflightServices=" "
\tFLSUUID="WAWFRA20231217UA9424"
\t\tFLSUUIDActualFlight="WAWFRA20231217LH1353"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" FlightNumber="1353" />
            <Equipment AirEquipType="32A" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T11:30:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T14:40:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="988"
\tJourneyDuration="PT9H10M"
        SequenceNumber="2"
  LegDistance="4074"
\tFLSMeals="L"
\tFLSInflightServices=" "
\tFLSUUID="FRAIAD20231217UA988"
\t
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="IAD" FLSLocationName="Dulles International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <Equipment AirEquipType="77W" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T17:15:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T18:57:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="6169"
\tJourneyDuration="PT1H42M"
        SequenceNumber="3"
  LegDistance="346"
\tFLSMeals="N"
\tFLSInflightServices=" "
\tFLSUUID="IADYYZ20231217UA6169"
\t
  FLSDOTDisclosure="Owned By:MESA AIRLINES DBA UNITED EXPRESS"
 >
            <DepartureAirport CodeContext="IATA" LocationCode="IAD" FLSLocationName="Dulles International Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <Equipment AirEquipType="E7W" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8184"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217UA8184"
\t\tFLSUUIDActualFlight="YYZYXU20231217AC8265"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="8265" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT12H51M"
   TotalMiles="4708"
   TotalTripTime="PT21H01M"
   FLSDepartureDateTime="2023-12-17T07:20:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T07:20:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T09:05:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="5721"
\tJourneyDuration="PT1H45M"
        SequenceNumber="1"
  LegDistance="484"
\tFLSMeals="RF"
\tFLSInflightServices="  9"
\tFLSUUID="WAWMUC20231217LH5721"
\t\tFLSUUIDActualFlight="WAWMUC20231217LO351"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="MUC" FLSLocationName="Munich International" Terminal="2" FLSDayIndicator="" />
            <MarketingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" />
            <OperatingAirline Code="LO" CodeContext="IATA" CompanyShortName="LOT Polish Airlines" FlightNumber="351" />
            <Equipment AirEquipType="E75" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T11:55:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T13:00:00"
        FLSArrivalTimeOffset="+0000"
\t
\tFlightNumber="2474"
\tJourneyDuration="PT2H05M"
        SequenceNumber="2"
  LegDistance="585"
\tFLSMeals="RG"
\tFLSInflightServices=" "
\tFLSUUID="MUCLHR20231217LH2474"
\t
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="MUC" FLSLocationName="Munich International" Terminal="2" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="LHR" FLSLocationName="Heathrow Airport" Terminal="2" FLSDayIndicator="" />
            <MarketingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" />
            <Equipment AirEquipType="32N" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T15:00:00"
   \tFLSDepartureTimeOffset="+0000"
\tArrivalDateTime="2023-12-17T18:10:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="6584"
\tJourneyDuration="PT8H10M"
        SequenceNumber="3"
  LegDistance="3550"
\tFLSMeals="MS"
\tFLSInflightServices="  3/  9/ 12/ 18/ 20"
\tFLSUUID="LHRYYZ20231217LH6584"
\t\tFLSUUIDActualFlight="LHRYYZ20231217AC857"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="LHR" FLSLocationName="Heathrow Airport" Terminal="2" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="857" />
            <Equipment AirEquipType="77W" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="6508"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217LH6508"
\t\tFLSUUIDActualFlight="YYZYXU20231217AC8265"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="8265" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT14H13M"
   TotalMiles="4915"
   TotalTripTime="PT20H56M"
   FLSDepartureDateTime="2023-12-17T07:25:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T07:25:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T10:00:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="6749"
\tJourneyDuration="PT2H35M"
        SequenceNumber="1"
  LegDistance="835"
\tFLSMeals="RF"
\tFLSInflightServices="  9"
\tFLSUUID="WAWCDG20231217AC6749"
\t\tFLSUUIDActualFlight="WAWCDG20231217LO331"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="CDG" FLSLocationName="Charles de Gaulle Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="LO" CodeContext="IATA" CompanyShortName="LOT Polish Airlines" FlightNumber="331" />
            <Equipment AirEquipType="E90" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T12:55:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T15:45:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="5665"
\tJourneyDuration="PT8H50M"
        SequenceNumber="2"
  LegDistance="3643"
\tFLSMeals="L"
\tFLSInflightServices=" "
\tFLSUUID="CDGEWR20231217AC5665"
\t\tFLSUUIDActualFlight="CDGEWR20231217UA55"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="CDG" FLSLocationName="Charles de Gaulle Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="EWR" FLSLocationName="Newark Liberty International Airport" Terminal="C" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" FlightNumber="55" />
            <Equipment AirEquipType="763" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T18:00:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T19:57:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="3259"
\tJourneyDuration="PT1H57M"
        SequenceNumber="3"
  LegDistance="348"
\tFLSMeals="N"
\tFLSInflightServices=" "
\tFLSUUID="EWRYYZ20231217AC3259"
\t\tFLSUUIDActualFlight="EWRYYZ20231217UA3504"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="EWR" FLSLocationName="Newark Liberty International Airport" Terminal="C" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" FlightNumber="3504" />
            <Equipment AirEquipType="E7W" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8265"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217AC8265"
\t
  FLSDOTDisclosure="Owned By:AIR CANADA EXPRESS - JAZZ"
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT13H48M"
   TotalMiles="5125"
   TotalTripTime="PT20H56M"
   FLSDepartureDateTime="2023-12-17T07:25:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T07:25:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T10:00:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="6749"
\tJourneyDuration="PT2H35M"
        SequenceNumber="1"
  LegDistance="835"
\tFLSMeals="RF"
\tFLSInflightServices="  9"
\tFLSUUID="WAWCDG20231217AC6749"
\t\tFLSUUIDActualFlight="WAWCDG20231217LO331"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="CDG" FLSLocationName="Charles de Gaulle Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="LO" CodeContext="IATA" CompanyShortName="LOT Polish Airlines" FlightNumber="331" />
            <Equipment AirEquipType="E90" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T11:55:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T14:35:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="3222"
\tJourneyDuration="PT8H40M"
        SequenceNumber="2"
  LegDistance="3855"
\tFLSMeals="L"
\tFLSInflightServices=" "
\tFLSUUID="CDGIAD20231217AC3222"
\t\tFLSUUIDActualFlight="CDGIAD20231217UA914"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="CDG" FLSLocationName="Charles de Gaulle Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="IAD" FLSLocationName="Dulles International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" FlightNumber="914" />
            <Equipment AirEquipType="777" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T17:15:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T18:57:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="3934"
\tJourneyDuration="PT1H42M"
        SequenceNumber="3"
  LegDistance="346"
\tFLSMeals="N"
\tFLSInflightServices=" "
\tFLSUUID="IADYYZ20231217AC3934"
\t\tFLSUUIDActualFlight="IADYYZ20231217UA6169"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="IAD" FLSLocationName="Dulles International Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" FlightNumber="6169" />
            <Equipment AirEquipType="E7W" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8265"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217AC8265"
\t
  FLSDOTDisclosure="Owned By:AIR CANADA EXPRESS - JAZZ"
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT14H34M"
   TotalMiles="5506"
   TotalTripTime="PT20H56M"
   FLSDepartureDateTime="2023-12-17T07:25:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T07:25:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T10:00:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="6749"
\tJourneyDuration="PT2H35M"
        SequenceNumber="1"
  LegDistance="835"
\tFLSMeals="RF"
\tFLSInflightServices="  9"
\tFLSUUID="WAWCDG20231217AC6749"
\t\tFLSUUIDActualFlight="WAWCDG20231217LO331"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="CDG" FLSLocationName="Charles de Gaulle Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="LO" CodeContext="IATA" CompanyShortName="LOT Polish Airlines" FlightNumber="331" />
            <Equipment AirEquipType="E90" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T11:40:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T14:15:00"
        FLSArrivalTimeOffset="-0600"
\t
\tFlightNumber="3297"
\tJourneyDuration="PT9H35M"
        SequenceNumber="2"
  LegDistance="4146"
\tFLSMeals="L"
\tFLSInflightServices=" "
\tFLSUUID="CDGORD20231217AC3297"
\t\tFLSUUIDActualFlight="CDGORD20231217UA986"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="CDG" FLSLocationName="Charles de Gaulle Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="ORD" FLSLocationName="O'Hare International Airport" Terminal="5" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" FlightNumber="986" />
            <Equipment AirEquipType="763" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T16:35:00"
   \tFLSDepartureTimeOffset="-0600"
\tArrivalDateTime="2023-12-17T19:08:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="506"
\tJourneyDuration="PT1H33M"
        SequenceNumber="3"
  LegDistance="436"
\tFLSMeals=""
\tFLSInflightServices="  3/  9/ 12/ 18"
\tFLSUUID="ORDYYZ20231217AC506"
\t
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="ORD" FLSLocationName="O'Hare International Airport" Terminal="2" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="223" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8265"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217AC8265"
\t
  FLSDOTDisclosure="Owned By:AIR CANADA EXPRESS - JAZZ"
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT14H55M"
   TotalMiles="5506"
   TotalTripTime="PT20H56M"
   FLSDepartureDateTime="2023-12-17T07:25:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T07:25:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T10:00:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="6749"
\tJourneyDuration="PT2H35M"
        SequenceNumber="1"
  LegDistance="835"
\tFLSMeals="RF"
\tFLSInflightServices="  9"
\tFLSUUID="WAWCDG20231217AC6749"
\t\tFLSUUIDActualFlight="WAWCDG20231217LO331"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="CDG" FLSLocationName="Charles de Gaulle Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="LO" CodeContext="IATA" CompanyShortName="LOT Polish Airlines" FlightNumber="331" />
            <Equipment AirEquipType="E90" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T11:40:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T14:15:00"
        FLSArrivalTimeOffset="-0600"
\t
\tFlightNumber="3297"
\tJourneyDuration="PT9H35M"
        SequenceNumber="2"
  LegDistance="4146"
\tFLSMeals="L"
\tFLSInflightServices=" "
\tFLSUUID="CDGORD20231217AC3297"
\t\tFLSUUIDActualFlight="CDGORD20231217UA986"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="CDG" FLSLocationName="Charles de Gaulle Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="ORD" FLSLocationName="O'Hare International Airport" Terminal="5" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" FlightNumber="986" />
            <Equipment AirEquipType="763" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T16:31:00"
   \tFLSDepartureTimeOffset="-0600"
\tArrivalDateTime="2023-12-17T19:25:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="5014"
\tJourneyDuration="PT1H54M"
        SequenceNumber="3"
  LegDistance="436"
\tFLSMeals="N"
\tFLSInflightServices=" "
\tFLSUUID="ORDYYZ20231217AC5014"
\t\tFLSUUIDActualFlight="ORDYYZ20231217UA5462"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="ORD" FLSLocationName="O'Hare International Airport" Terminal="2" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" FlightNumber="5462" />
            <Equipment AirEquipType="E7W" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8265"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217AC8265"
\t
  FLSDOTDisclosure="Owned By:AIR CANADA EXPRESS - JAZZ"
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT12H47M"
   TotalMiles="4562"
   TotalTripTime="PT20H46M"
   FLSDepartureDateTime="2023-12-17T07:35:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T07:35:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T09:35:00"
        FLSArrivalTimeOffset="+0000"
\t
\tFlightNumber="6744"
\tJourneyDuration="PT3H00M"
        SequenceNumber="1"
  LegDistance="914"
\tFLSMeals="RF"
\tFLSInflightServices="  9"
\tFLSUUID="WAWLHR20231217AC6744"
\t\tFLSUUIDActualFlight="WAWLHR20231217LO281"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="LHR" FLSLocationName="Heathrow Airport" Terminal="2" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="LO" CodeContext="IATA" CompanyShortName="LOT Polish Airlines" FlightNumber="281" />
            <Equipment AirEquipType="7M8" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T13:25:00"
   \tFLSDepartureTimeOffset="+0000"
\tArrivalDateTime="2023-12-17T15:45:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="865"
\tJourneyDuration="PT7H20M"
        SequenceNumber="2"
  LegDistance="3244"
\tFLSMeals="MS"
\tFLSInflightServices="  3/  9/ 12/ 18/ 20"
\tFLSUUID="LHRYUL20231217AC865"
\t
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="LHR" FLSLocationName="Heathrow Airport" Terminal="2" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YUL" FLSLocationName="Pierre Elliott Trudeau International Ai" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="789" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T18:10:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T19:46:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="423"
\tJourneyDuration="PT1H36M"
        SequenceNumber="3"
  LegDistance="315"
\tFLSMeals=""
\tFLSInflightServices="  3/  9/ 12/ 18"
\tFLSUUID="YULYYZ20231217AC423"
\t
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YUL" FLSLocationName="Pierre Elliott Trudeau International Ai" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="320" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8265"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217AC8265"
\t
  FLSDOTDisclosure="Owned By:AIR CANADA EXPRESS - JAZZ"
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT12H47M"
   TotalMiles="4562"
   TotalTripTime="PT20H46M"
   FLSDepartureDateTime="2023-12-17T07:35:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T07:35:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T09:35:00"
        FLSArrivalTimeOffset="+0000"
\t
\tFlightNumber="6744"
\tJourneyDuration="PT3H00M"
        SequenceNumber="1"
  LegDistance="914"
\tFLSMeals="RF"
\tFLSInflightServices="  9"
\tFLSUUID="WAWLHR20231217AC6744"
\t\tFLSUUIDActualFlight="WAWLHR20231217LO281"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="LHR" FLSLocationName="Heathrow Airport" Terminal="2" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="LO" CodeContext="IATA" CompanyShortName="LOT Polish Airlines" FlightNumber="281" />
            <Equipment AirEquipType="7M8" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T13:25:00"
   \tFLSDepartureTimeOffset="+0000"
\tArrivalDateTime="2023-12-17T15:45:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="865"
\tJourneyDuration="PT7H20M"
        SequenceNumber="2"
  LegDistance="3244"
\tFLSMeals="MS"
\tFLSInflightServices="  3/  9/ 12/ 18/ 20"
\tFLSUUID="LHRYUL20231217AC865"
\t
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="LHR" FLSLocationName="Heathrow Airport" Terminal="2" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YUL" FLSLocationName="Pierre Elliott Trudeau International Ai" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="789" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T17:00:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T18:36:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="895"
\tJourneyDuration="PT1H36M"
        SequenceNumber="3"
  LegDistance="315"
\tFLSMeals=""
\tFLSInflightServices="  3/  9/ 12/ 20"
\tFLSUUID="YULYYZ20231217AC895"
\t
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YUL" FLSLocationName="Pierre Elliott Trudeau International Ai" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="333" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8265"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217AC8265"
\t
  FLSDOTDisclosure="Owned By:AIR CANADA EXPRESS - JAZZ"
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT14H23M"
   TotalMiles="4811"
   TotalTripTime="PT20H46M"
   FLSDepartureDateTime="2023-12-17T07:35:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T07:35:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T09:35:00"
        FLSArrivalTimeOffset="+0000"
\t
\tFlightNumber="6744"
\tJourneyDuration="PT3H00M"
        SequenceNumber="1"
  LegDistance="914"
\tFLSMeals="RF"
\tFLSInflightServices="  9"
\tFLSUUID="WAWLHR20231217AC6744"
\t\tFLSUUIDActualFlight="WAWLHR20231217LO281"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="LHR" FLSLocationName="Heathrow Airport" Terminal="2" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="LO" CodeContext="IATA" CompanyShortName="LOT Polish Airlines" FlightNumber="281" />
            <Equipment AirEquipType="7M8" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T12:00:00"
   \tFLSDepartureTimeOffset="+0000"
\tArrivalDateTime="2023-12-17T15:35:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="5157"
\tJourneyDuration="PT8H35M"
        SequenceNumber="2"
  LegDistance="3460"
\tFLSMeals="L"
\tFLSInflightServices=" "
\tFLSUUID="LHREWR20231217AC5157"
\t\tFLSUUIDActualFlight="LHREWR20231217UA17"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="LHR" FLSLocationName="Heathrow Airport" Terminal="2" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="EWR" FLSLocationName="Newark Liberty International Airport" Terminal="B" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" FlightNumber="17" />
            <Equipment AirEquipType="763" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T18:00:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T19:57:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="3259"
\tJourneyDuration="PT1H57M"
        SequenceNumber="3"
  LegDistance="348"
\tFLSMeals="N"
\tFLSInflightServices=" "
\tFLSUUID="EWRYYZ20231217AC3259"
\t\tFLSUUIDActualFlight="EWRYYZ20231217UA3504"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="EWR" FLSLocationName="Newark Liberty International Airport" Terminal="C" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" FlightNumber="3504" />
            <Equipment AirEquipType="E7W" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8265"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217AC8265"
\t
  FLSDOTDisclosure="Owned By:AIR CANADA EXPRESS - JAZZ"
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT14H13M"
   TotalMiles="5020"
   TotalTripTime="PT20H46M"
   FLSDepartureDateTime="2023-12-17T07:35:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T07:35:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T09:35:00"
        FLSArrivalTimeOffset="+0000"
\t
\tFlightNumber="6744"
\tJourneyDuration="PT3H00M"
        SequenceNumber="1"
  LegDistance="914"
\tFLSMeals="RF"
\tFLSInflightServices="  9"
\tFLSUUID="WAWLHR20231217AC6744"
\t\tFLSUUIDActualFlight="WAWLHR20231217LO281"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="LHR" FLSLocationName="Heathrow Airport" Terminal="2" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="LO" CodeContext="IATA" CompanyShortName="LOT Polish Airlines" FlightNumber="281" />
            <Equipment AirEquipType="7M8" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T12:05:00"
   \tFLSDepartureTimeOffset="+0000"
\tArrivalDateTime="2023-12-17T15:45:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="5345"
\tJourneyDuration="PT8H40M"
        SequenceNumber="2"
  LegDistance="3671"
\tFLSMeals="L"
\tFLSInflightServices=" "
\tFLSUUID="LHRIAD20231217AC5345"
\t\tFLSUUIDActualFlight="LHRIAD20231217UA919"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="LHR" FLSLocationName="Heathrow Airport" Terminal="2" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="IAD" FLSLocationName="Dulles International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" FlightNumber="919" />
            <Equipment AirEquipType="777" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T17:15:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T18:57:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="3934"
\tJourneyDuration="PT1H42M"
        SequenceNumber="3"
  LegDistance="346"
\tFLSMeals="N"
\tFLSInflightServices=" "
\tFLSUUID="IADYYZ20231217AC3934"
\t\tFLSUUIDActualFlight="IADYYZ20231217UA6169"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="IAD" FLSLocationName="Dulles International Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <OperatingAirline Code="UA" CodeContext="IATA" CompanyShortName="United Airlines" FlightNumber="6169" />
            <Equipment AirEquipType="E7W" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="8265"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217AC8265"
\t
  FLSDOTDisclosure="Owned By:AIR CANADA EXPRESS - JAZZ"
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
    <FlightDetails TotalFlightTime="PT12H46M"
   TotalMiles="4603"
   TotalTripTime="PT20H36M"
   FLSDepartureDateTime="2023-12-17T07:45:00"
   FLSDepartureTimeOffset="+0100"
   FLSDepartureCode="WAW"
   FLSDepartureName="Warsaw"
   FLSArrivalDateTime="2023-12-17T22:21:00"
   FLSArrivalTimeOffset="-0500"
   FLSArrivalCode="YXU"
   FLSArrivalName="London"
   FLSFlightType="Connect"
   FLSFlightLegs="4"
   FLSFlightDays="......7"
   FLSDayIndicator=""
   
  >
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T07:45:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T09:45:00"
        FLSArrivalTimeOffset="+0100"
\t
\tFlightNumber="5715"
\tJourneyDuration="PT2H00M"
        SequenceNumber="1"
  LegDistance="557"
\tFLSMeals="RF"
\tFLSInflightServices="  9"
\tFLSUUID="WAWFRA20231217LH5715"
\t\tFLSUUIDActualFlight="WAWFRA20231217LO381"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="WAW" FLSLocationName="Frederic Chopin Airport" Terminal=" " FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" />
            <OperatingAirline Code="LO" CodeContext="IATA" CompanyShortName="LOT Polish Airlines" FlightNumber="381" />
            <Equipment AirEquipType="E95" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T12:00:00"
   \tFLSDepartureTimeOffset="+0100"
\tArrivalDateTime="2023-12-17T12:45:00"
        FLSArrivalTimeOffset="+0000"
\t
\tFlightNumber="906"
\tJourneyDuration="PT1H45M"
        SequenceNumber="2"
  LegDistance="407"
\tFLSMeals="RG"
\tFLSInflightServices=" "
\tFLSUUID="FRALHR20231217LH906"
\t
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="FRA" FLSLocationName="Frankfurt International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="LHR" FLSLocationName="Heathrow Airport" Terminal="2" FLSDayIndicator="" />
            <MarketingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" />
            <Equipment AirEquipType="32N" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T15:00:00"
   \tFLSDepartureTimeOffset="+0000"
\tArrivalDateTime="2023-12-17T18:10:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="6584"
\tJourneyDuration="PT8H10M"
        SequenceNumber="3"
  LegDistance="3550"
\tFLSMeals="MS"
\tFLSInflightServices="  3/  9/ 12/ 18/ 20"
\tFLSUUID="LHRYYZ20231217LH6584"
\t\tFLSUUIDActualFlight="LHRYYZ20231217AC857"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="LHR" FLSLocationName="Heathrow Airport" Terminal="2" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <MarketingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="857" />
            <Equipment AirEquipType="77W" />
        </FlightLegDetails>
        <FlightLegDetails
\tDepartureDateTime="2023-12-17T21:30:00"
   \tFLSDepartureTimeOffset="-0500"
\tArrivalDateTime="2023-12-17T22:21:00"
        FLSArrivalTimeOffset="-0500"
\t
\tFlightNumber="6508"
\tJourneyDuration="PT0H51M"
        SequenceNumber="4"
  LegDistance="89"
\tFLSMeals=""
\tFLSInflightServices="  9"
\tFLSUUID="YYZYXU20231217LH6508"
\t\tFLSUUIDActualFlight="YYZYXU20231217AC8265"
  
 >
            <DepartureAirport CodeContext="IATA" LocationCode="YYZ" FLSLocationName="Lester B. Pearson International Airport" Terminal="1" FLSDayIndicator="" />
            <ArrivalAirport CodeContext="IATA" LocationCode="YXU" FLSLocationName="London International Airport" Terminal=" " FLSDayIndicator="" />
            <MarketingAirline Code="LH" CodeContext="IATA" CompanyShortName="Lufthansa" />
            <OperatingAirline Code="AC" CodeContext="IATA" CompanyShortName="Air Canada" FlightNumber="8265" />
            <Equipment AirEquipType="DH4" />
        </FlightLegDetails>
    </FlightDetails>
</OTA_AirDetailsRS>`

    const a="WAW";
    const b="YXU";

    const [flights,setFlights]=useState<null|Flight[]>()

    useEffect(() => {
        // fetchFlights(a,b).then((fl)=>{
        //     parseString(fl,(err:any,res: any)=>{
        //         setFlights(res.OTA_AirDetailsRS.FlightDetails)
        //     });
        // })

            parseString(xmlString,(err:any,res: any)=>{
                const uniqueid:string[]=[];
                const uniqueFlights:Flight[]=[];
                res.OTA_AirDetailsRS.FlightDetails.forEach((el:Flight)=>{
                    if(!uniqueid.includes(el.FlightLegDetails[0].$.FLSUUID)){
                        uniqueid.push(el.FlightLegDetails[0].$.FLSUUID)
                        uniqueFlights.push(el)
                    }
                })
                setFlights(uniqueFlights)
            });

    }, []);

    return (
        <ScrollView style={{gap:30}} className="flex-1 bg-[#160227] flex-col px-[30] pt-[20px]">
            <Text style={{paddingTop:30}} className="text-white text-[24px] text-center font-bold">SEARCH RESULTS</Text>
            {flights &&
                flights.map((flight,index)=>
                    <FlightTile key={index} data={flight}/>)
            }
        </ScrollView>
    );
}

export default Flights;
