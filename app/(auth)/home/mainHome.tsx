import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Map from "@/components/Map/Map";
import BottomSlide from "@/components/BottomSlide";
import StartJourneyButton from "@/components/Map/StartJourneyButton";
import BottomSheet from "@gorhom/bottom-sheet";
import { LatLng } from "react-native-maps";
import ExitTravelModeBtn from "@/components/Map/ExitTravelModeBtn";
import DeleteMarkerButton from "@/components/Map/DeleteMarkerButton";

export interface ClickedInfoProps {
  countryCode: string;
  latlng: LatLng;
  name: string;
}

const MainHome = () => {
  const modes = {
    normal: "normal",
    travel: "travel",
  };
  const [mode, setMode] = useState("normal");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [clickedInfo, setClickedInfo] = useState<ClickedInfoProps | null>(null);
  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };
  return (
    <View className="flex-1">
      <Map
        openBottomSheet={openBottomSheet}
        clickedInfo={clickedInfo}
        setClickedInfo={setClickedInfo}
      />
      {clickedInfo && <DeleteMarkerButton setClickedInfo={setClickedInfo} />}
      {mode === "travel" && <ExitTravelModeBtn setMode={setMode} />}
      {clickedInfo && mode !== "travel" && (
        <BottomSlide
          mode={mode}
          setMode={setMode}
          bottomSheetRef={bottomSheetRef}
          clickedInfo={clickedInfo}
        />
      )}
    </View>
  );
};

export default MainHome;
