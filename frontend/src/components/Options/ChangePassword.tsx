import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {OptionTypes} from "../../commons/types/OptionTypes";
import {AntDesign, Ionicons, MaterialIcons} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import axios from "axios/index";
import {getUserDataFromStorage, setUserDataToStorage} from "../../commons/utils/AuthContext";
import {showAlert} from "../../commons/utils/Alert";
import {UserData} from "../../commons/interfaces/interfaces";
import {showLoader} from "../../commons/utils/Loader";

export const ChangePassword = ({handleButtonPress}: { handleButtonPress: (type: string) => void }) => {
    const platform = Platform.OS === 'ios' ? styles.backButtonIos : styles.backButtonAndroid
    const offset = Platform.OS === "ios" ? -100 : -300;

    const [currentPassword, setCurrentPassword] = useState<string>()
    const [newPassword, setNewPassword] = useState<string>()
    const [confirmPassword, setConfirmPassword] = useState<string>()
    const [loader, setLoader] = useState<boolean>(false)
    const [fetchedUser, setFetchedUser] = useState<UserData | null>(null);

    const save = async () => {
        setLoader(true);
        if (confirmPassword !== newPassword) {
            setLoader(false);
            showAlert("Passwords don't match", "Please check your passwords");
            return;
        }
        const send = async () => {
            setLoader(true);
            try {
                if (fetchedUser?.username && currentPassword && newPassword) {
                    const formData = new FormData();
                    formData.append('username', fetchedUser.username);
                    formData.append('currentPassword', currentPassword);
                    formData.append('password', newPassword);


                    const response = await axios.put('http://192.168.0.30:5000/users/edit', formData);

                    await setUserDataToStorage(response.data);
                    setFetchedUser(response.data);
                    showAlert("Changes saved", "Your changes have been saved");
                    setNewPassword('')
                    setConfirmPassword('')
                    setCurrentPassword('')
                    setLoader(false);
                    handleButtonPress(OptionTypes.OPTIONS)
                }
            } catch (error) {
                setLoader(false);
                showAlert("Server connection error", "Please try again later");
                console.error('Error:', error);
            }
        }

        await send().then((r) => setLoader(false)).catch((e) => setLoader(false))
    };

    useEffect(() => {
        const getUserData = async () => {
            try {
                // Check if user data is available in local storage
                const userData = await getUserDataFromStorage();
                setFetchedUser(userData)
            } catch (error) {
                console.error("Error:", error);
            }
        };
        getUserData().then(r => console.log(r));
    }, []);


    return (
        <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior="position"
            keyboardVerticalOffset={offset}
        ><ScrollView contentContainerStyle={styles.scrollContainer}>
            {showLoader(loader, 'Changing password')}
            <Pressable style={platform} onPress={() => {
                handleButtonPress(OptionTypes.OPTIONS)
            }}>
                <AntDesign name="left" style={[styles.innerFont, {fontSize: 20}]}/>
                <Text style={[styles.innerFont, {fontSize: 20}]}>Back</Text>
            </Pressable>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Change password</Text>
            </View>
            <View style={styles.editSection}>
                <View style={styles.dataEditionContent}>
                    <View style={styles.singleValueEdit}>
                        <Text style={styles.singleValueEditText}>Current password</Text>
                        <View
                            style={[styles.inputContainer]}>
                            <Ionicons name="ios-lock-closed-outline" style={styles.innerFont}/>
                            <TextInput
                                style={[styles.input, styles.innerFont]}
                                onChangeText={(text) => setCurrentPassword(text)}
                                value={currentPassword}
                                placeholder="Current password"
                                autoCorrect={false}
                                placeholderTextColor="#fff"
                                underlineColorAndroid="transparent"
                                secureTextEntry={true}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.dataEditionContent}>
                    <View style={styles.singleValueEdit}>
                        <Text style={styles.singleValueEditText}>New password</Text>
                        <View
                            style={[styles.inputContainer]}>
                            <Ionicons name="ios-lock-closed-outline" style={styles.innerFont}/>
                            <TextInput
                                style={[styles.input, styles.innerFont]}
                                onChangeText={(text) => setNewPassword(text)}
                                value={newPassword}
                                placeholder="New password"
                                autoCorrect={false}
                                placeholderTextColor="#fff"
                                underlineColorAndroid="transparent"
                                secureTextEntry={true}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.dataEditionContent}>
                    <View style={styles.singleValueEdit}>
                        <Text style={styles.singleValueEditText}>Repeat new password</Text>
                        <View
                            style={[styles.inputContainer]}>
                            <Ionicons name="ios-lock-closed-outline" style={styles.innerFont}/>
                            <TextInput
                                style={[styles.input, styles.innerFont]}
                                onChangeText={(text) => setConfirmPassword(text)}
                                value={confirmPassword}
                                placeholder="New password"
                                autoCorrect={false}
                                placeholderTextColor="#fff"
                                underlineColorAndroid="transparent"
                                secureTextEntry={true}
                            />
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.saveButton} onPress={save}>
                    <Text style={styles.saveButtonText}>Save</Text>
                    <MaterialIcons name="save-alt" size={24}
                                   color="white"/>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    keyboardContainer: {
        display: "flex",
        justifyContent: "flex-end",
        height: "100%",
        paddingBottom: 40,
    },
    passwordRequireContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
    },
    loadingContainer: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.75)",
        width: "100%",
        gap: 5,
        height: "100%",
        zIndex: 200
    },
    saveButton: {
        marginTop: 25,
        display: "flex",
        flexDirection: "row",
        gap: 5,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        backgroundColor: "rgba(140,165,255,0.7)",
        borderRadius: 40,
        width: "70%",
    },
    saveButtonText: {
        fontSize: 16,
        color: "white"
    },
    scrollContainer: {
        flexGrow: 1,
        height: "100%",
        marginBottom: 100
    },
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
        // backgroundColor: "rgba(255,255,255,0.2)",
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
    countryInput: {
        height: 40,
        display: "flex",
        justifyContent: "center",
        flex: 1,

    }
})

