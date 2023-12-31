import {View} from "react-native";
import React, {useRef, useState} from "react";
import Map from "@/components/Map/Map";
import BottomSlide from "@/components/BottomSlide";
import BottomSheet from "@gorhom/bottom-sheet";
import {LatLng} from "react-native-maps";
import ExitTravelModeBtn from "@/components/Map/ExitTravelModeBtn";
import DeleteMarkerButton from "@/components/Map/DeleteMarkerButton";
import SaveTravelButton from "@/components/Map/SaveTravelButton";
import SaveTravelAs from "@/components/Travels/SaveTravelAs";

export interface ClickedInfoProps {
    countryCode: string;
    latlng: LatLng;
    name: string;
}

export interface TravelPointProps {
    id: string,
    latlng: LatLng,
    name: string,
}

const MainHome = () => {
    const [mode, setMode] = useState("normal");
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [clickedInfo, setClickedInfo] = useState<ClickedInfoProps | null>(null);
    const [travelPoints, setTravelPoints] = useState<TravelPointProps[]>([])
    const [isSaveClicked, setIsSaveClicked] = useState<boolean>(false)
    const openBottomSheet = () => {
        bottomSheetRef.current?.expand();
    };
    return (
        <View className="flex-1 bg-[#160227]">
            <Map
                mode={mode}
                openBottomSheet={openBottomSheet}
                clickedInfo={clickedInfo}
                setClickedInfo={setClickedInfo}
                travelPoints={travelPoints}
                setTravelPoints={setTravelPoints}
            />
            {clickedInfo && <DeleteMarkerButton setClickedInfo={setClickedInfo}/>}
            {mode === "travel" && <ExitTravelModeBtn setTravelPoints={setTravelPoints} setMode={setMode}/>}
            {mode === "travel" && travelPoints.length > 1 &&
                <SaveTravelButton setIsSaveClicked={setIsSaveClicked}/>}
            {isSaveClicked && <SaveTravelAs setIsSaveClicked={setIsSaveClicked} setTravelPoints={setTravelPoints} travelPoints={travelPoints} setMode={setMode}/>}
            {!isSaveClicked && clickedInfo && (
                <BottomSlide
                    mode={mode}
                    setMode={setMode}
                    bottomSheetRef={bottomSheetRef}
                    clickedInfo={clickedInfo}
                    travelPoints={travelPoints}
                    setTravelPoints={setTravelPoints}
                />
            )}
        </View>
    );
};

export default MainHome;
