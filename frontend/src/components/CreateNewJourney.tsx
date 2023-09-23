import {Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AntDesign, Feather, Octicons} from "@expo/vector-icons";
import React from "react";

interface CreateNewJourneyProps {
    setHandleType: (type: string) => void;
    setCreatorMode: (type: boolean) => void;
}

const CreateNewJourney = ({setHandleType, setCreatorMode}: CreateNewJourneyProps) => {
    return (
        <View style={styles.container}>
            <SafeAreaView style={{gap: 10}}>
                <TouchableOpacity
                    style={styles.back}
                    onPress={() => {
                        setCreatorMode(false)
                    }}
                >
                    <AntDesign
                        name="left"
                        style={{fontSize: 24}}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>Your journey starts here</Text>
                <View style={styles.row}>
                    <View style={styles.iconWrapper}>
                        <Feather name="circle" size={24} color="black"/>
                    </View>
                    <Pressable onPress={() => {
                        setHandleType('origin')
                    }} style={styles.button}>
                        <Text style={{fontSize: 18}}>Origin</Text>
                        <Feather name="arrow-right" size={20} color="black"/>
                    </Pressable>
                </View>
                <Pressable onPress={() => {
                    setHandleType('waypoint')
                }} style={styles.row}>
                    <View style={styles.iconWrapper}>
                        <Feather name="plus-circle" size={24} color="black"/>
                    </View>
                    <Text style={{fontSize: 18}}>Add waypoint</Text>
                </Pressable>
                <View style={styles.row}>
                    <View style={styles.iconWrapper}>
                        <Octicons name="location" size={24} color="#DD2C2C"/>
                    </View>
                    <Pressable onPress={() => {
                        setHandleType('destination')
                    }} style={styles.button}>
                        <Text style={{fontSize: 18}}>Destination</Text>
                        <Feather name="arrow-right" size={20} color="black"/>
                    </Pressable>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    iconWrapper: {
        width: 30,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    back: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        fontSize: 26,
        marginBottom: 15

    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000',
        marginBottom: 16,

    },
    container: {
        position: 'absolute',
        paddingTop: 70,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: "#FFF",
        height: '100%',
    }
    ,
    row: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    }
    ,
    button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 16,
        width: '70%',
        borderColor: '#000',
        borderWidth: 1,
        paddingVertical: 10,
        borderRadius: 12,
        paddingHorizontal: 8
    }
});

export default CreateNewJourney;
