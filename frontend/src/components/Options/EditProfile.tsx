import {Image, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import {UserData} from "../../commons/interfaces/interfaces";
import {getUserDataFromStorage} from "../../commons/utils/AuthContext";
import {OptionTypes} from "../../commons/types/OptionTypes";

interface EditProfileProps {
    handleButtonPress: (type: string) => void;
}


export const EditProfile = ({handleButtonPress}: EditProfileProps) => {
    const platform = Platform.OS === 'ios' ? styles.backButtonIos : styles.backButtonAndroid
    const [fetchedUser, setFetchedUser] = useState<UserData | null>(null);
    const [email, setEmail] = useState<string>("");
    const [emailEdit, setEmailEdit] = useState<boolean>(false);
    useEffect(() => {
        const getUserData = async () => {
            try {
                // Check if user data is available in local storage
                const userData = await getUserDataFromStorage();
                if (userData) {
                    setFetchedUser(userData);
                    setEmail(userData?.email)
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        getUserData();
    }, []);

    return (
        <>
            <Pressable style={platform} onPress={() => {
                handleButtonPress(OptionTypes.OPTIONS)
            }}>
                <AntDesign name="left" style={[styles.innerFont, {fontSize: 20}]}/>
                <Text style={[styles.innerFont, {fontSize: 20}]}>Back</Text>
            </Pressable>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Edit profile</Text>
            </View>
            <View style={styles.editSection}>
                <View style={styles.avatarContainer}>
                    {fetchedUser?.avatar && (
                        <Image
                            style={styles.avatarImage}
                            source={{
                                uri: `data:image/jpeg;base64,${fetchedUser.avatar}`,
                            }}
                        />
                    )}
                    <TouchableOpacity style={styles.avatarEditLayout}>
                        <Ionicons name="pencil" size={28} color={"white"}/>
                        <Text style={styles.avatarEditText}>Edit avatar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.dataEditionContent}>
                    <View style={styles.singleValueEdit}>
                        <Text style={styles.singleValueEditText}>E-mail</Text>
                        <View style={[styles.inputContainer, !emailEdit ? styles.inputContainerDisabled : null]}>
                            <AntDesign name="user" style={styles.innerFont}/>
                            <TextInput
                                style={[styles.input, styles.innerFont]}
                                onChangeText={setEmail}
                                value={email}
                                placeholder="E-mail"
                                autoCorrect={false}
                                placeholderTextColor="#fff"
                                underlineColorAndroid="transparent"
                                editable={emailEdit}
                            />
                            <TouchableOpacity onPress={() => setEmailEdit(!emailEdit)}>
                                {email === fetchedUser?.email &&
                                    <Ionicons name="pencil" size={24} color={"white"}/>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>


            </View>
        </>
    )
}

const styles = StyleSheet.create({
    backButtonIos: {
        position: "absolute",
        zIndex: 100,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        top: 20,
        left: 20,
        fontSize: 26,
        color: "white"
    },
    backButtonAndroid: {
        position: "absolute",
        zIndex: 100,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        top: 50,
        left: 20,
        fontSize: 26,
        color: "white"
    },
    innerFont: {
        fontSize: 16,
        color: "white"
    },
    titleContainer: {
        display: "flex",
        justifyContent: "flex-start",
        paddingHorizontal: 20,
        paddingTop: 70,
        paddingBottom: 30,
    },
    title: {
        paddingTop: 20,
        color: "#8ca5ff",
        fontSize: 32,
    },
    editSection: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10,
    },
    avatarContainer: {
        position: "relative",
        overflow: "hidden",
        borderWidth: 2,
        borderColor: "#F6F8E2",
        display: "flex",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        width: "30%",
        aspectRatio: "1/1",
    },
    avatarEditLayout: {
        position: "absolute",
        display: "flex",
        gap: 5,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255,255,255,0.2)",
    },
    singleValueEditText: {
        fontSize: 16,
        color: "#8ca5ff",
    },
    avatarEditText: {
        color: "white",
    },
    avatarImage: {
        borderRadius: 100,
        width: "101%",
        height: "101%",
    },
    singleValueEdit: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        justifyContent: "center",
        alignItems: "flex-start"
    },
    dataEditionContent: {
        marginTop: 20,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        display: "flex",
        paddingHorizontal: 15,
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 40,
        width: "70%",
        borderWidth: 2,
        borderColor: "white",
        height: 50,
        gap: 10,
        flexDirection: "row",
    },
    inputContainerDisabled: {
        backgroundColor: "rgba(255,255,255,0.2)",
    },
    input: {
        height: 40,
        flex: 1,
    },
})
