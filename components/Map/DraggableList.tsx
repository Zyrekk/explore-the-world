import React from "react";
import {Text, StyleSheet, TouchableOpacity, Dimensions} from "react-native";
import DraggableFlatList, {
    RenderItemParams,
    ScaleDecorator,
} from "react-native-draggable-flatlist";
import {LatLng} from "react-native-maps";
import {TravelPointProps} from "@/app/(auth)/home/mainHome";

interface Props {
    travelPoints: TravelPointProps[];
    setTravelPoints: (points: TravelPointProps[]) => void;
}

const DraggableList = ({travelPoints, setTravelPoints}: Props) => {
    const windowWidth = Dimensions.get('window').width;
    const renderItem = ({item, drag, isActive}: RenderItemParams<{
        id: string,
        latlng: LatLng,
        name:string,
    }>) => {
        return (
            <ScaleDecorator>
                <TouchableOpacity
                    onLongPress={drag}
                    disabled={isActive}
                    style={[
                        styles.rowItem,
                        {backgroundColor: isActive ? "red" : "#0b1348"},
                    ]}
                >
                    <Text style={styles.text}>{item.name}</Text>
                </TouchableOpacity>
            </ScaleDecorator>
        );
    };

    return (
        <DraggableFlatList
            style={{marginTop:50,width:windowWidth}}
            data={travelPoints}
            onDragEnd={({data}) => {
                setTravelPoints(data)
            }}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
        />
    );
}

export default DraggableList;

const styles = StyleSheet.create({
    rowItem: {
        height: 100,
        width: "100%",
        alignItems: "flex-start",
        paddingHorizontal: 20,
        justifyContent: "center",
    },
    text: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});
