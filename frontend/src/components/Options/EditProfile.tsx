import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { UserData } from "../../commons/interfaces/interfaces";
import {
    getUserDataFromStorage,
    setUserDataToStorage,
} from "../../commons/utils/AuthContext";
import { OptionTypes } from "../../commons/types/OptionTypes";
import CountryPicker, {
    Country,
    CountryCode,
    DARK_THEME,
} from "react-native-country-picker-modal";
import * as ImagePicker from "expo-image-picker";
import countryEmoji from "country-emoji";
import axios from "axios";
import { showAlert } from "../../commons/utils/Alert";
import { showLoader } from "../../commons/utils/Loader";
import { REACT_APP_API_URL } from "@env";
import {
    doc,
    updateDoc,
    query,
    where,
    collection,
    getDocs,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../../FirebaseConfig";

interface EditProfileProps {
    handleButtonPress: (type: string) => void;
}

interface CountryFlagProps {
    country: Country | null; // Pass the saved country object here
}

interface fieldProps {
    value: string;
    editable: boolean;
}

interface CountryProps {
    country: Country;
    editable: boolean;
}

export const EditProfile = ({ handleButtonPress }: EditProfileProps) => {
    const platform =
        Platform.OS === "ios" ? styles.backButtonIos : styles.backButtonAndroid;

    const offset = Platform.OS === "ios" ? -100 : -300;

    const [loader, setLoader] = useState<boolean>(false);

    const [fetchedUser, setFetchedUser] = useState<UserData | null>(null);

    const [password, setPassword] = useState<string>("");

    const [showRequire, setShowRequire] = useState<boolean>(false);

    const [isCountryChanged, setIsCountryChanged] = useState<boolean>(false);

    const [email, setEmail] = useState<fieldProps>({
        value: "",
        editable: false,
    });

    const [name, setName] = useState<fieldProps>({
        value: "",
        editable: false,
    });

    const [lastName, setLastName] = useState<fieldProps>({
        value: "",
        editable: false,
    });

    const [avatar, setAvatar] = useState<string>("");

    const [image, setImage] = useState<any>(null);

    const [showCountryPicker, setShowCountryPicker] = useState<boolean>(false);

    const [countryEdit, setCountryEdit] = useState<boolean>(false);

    const [country, setCountry] = useState<CountryProps>({
        country: {
            cca2: "DE",
            currency: ["EUR"],
            flag: "DEL",
            name: "Germany",
            region: "Europe",
            subregion: "Western Europe",
            callingCode: ["49"],
        },
        editable: false,
    });
    const [countryCode, setCountryCode] = useState<CountryCode>("PL");
    useEffect(() => {
        const getUserData = async () => {
            try {
                // Check if user data is available in local storage
                const userData = await getUserDataFromStorage();
                setFetchedUser(userData);
                if (userData) {
                    setEmail((prevState) => ({
                        ...prevState,
                        value: userData.email,
                    }));
                    setName((prevState) => ({
                        ...prevState,
                        value: userData.name,
                    }));
                    setLastName((prevState) => ({
                        ...prevState,
                        value: userData.lastName,
                    }));
                    if (userData.country) {
                        setCountry((prevState) => ({
                            ...prevState,
                            country: userData.country.country,
                        }));
                    }
                    setAvatar(userData?.avatar);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        getUserData().then((r) => console.log(r));
    }, []);

    // const handleCountrySelect = (country: Country) => {
    //     setCountry((prevState) => ({ country: country, editable: false }));
    //     setShowCountryPicker(false);
    //     setIsCountryChanged(true);
    // };

    // const save = async () => {
    //     setLoader(true);
    //     const send = async () => {
    //         try {
    //             if (fetchedUser) {
    //                 // const formData = new FormData();
    //                 // if (image) {
    //                 //     formData.append('avatar', {
    //                 //         // @ts-ignore
    //                 //         uri: image,
    //                 //         type: 'image',
    //                 //         name: "nazwa.jpg"
    //                 //     });
    //                 // }
    //                 // formData.append("username", fetchedUser.nickname);
    //                 // formData.append("currentPassword", password);
    //                 // formData.append("email", email.value || "");
    //                 // formData.append("name", name.value || "");
    //                 // formData.append("lastName", lastName.value || "");
    //                 // formData.append("country", JSON.stringify(country));

    //                 // const response = await axios.put(
    //                 //     `${REACT_APP_API_URL}/users/edit`,
    //                 //     formData,
    //                 //     {
    //                 //         headers: {
    //                 //             "Content-Type": "multipart/form-data", // Required for sending files
    //                 //         },
    //                 //     }
    //                 // );

    //                 // await setUserDataToStorage(response.data);
    //                 // setFetchedUser(response.data);
    //                 // setEmail((prevState) => ({
    //                 //     ...prevState,
    //                 //     editable: false,
    //                 // }));
    //                 // setName((prevState) => ({
    //                 //     ...prevState,
    //                 //     editable: false,
    //                 // }));
    //                 // setLastName((prevState) => ({
    //                 //     ...prevState,
    //                 //     editable: false,
    //                 // }));
    //                 // if (response.data !== undefined) {
    //                 //     setAvatar(response.data.avatar);
    //                 // }
    //                 setCountryEdit(false);
    //                 setImage(null);
    //                 showAlert("Changes saved", "Your changes have been saved");
    //                 setLoader(false);
    //                 setShowRequire(false);
    //                 setIsCountryChanged(false);
    //                 setPassword("");
    //             }
    //         } catch (error) {
    //             setLoader(false);
    //             setShowRequire(false);
    //             setPassword("");
    //             setEmail((prevState) => ({
    //                 ...prevState,
    //                 editable: false,
    //             }));
    //             setName((prevState) => ({
    //                 ...prevState,
    //                 editable: false,
    //             }));
    //             setLastName((prevState) => ({
    //                 ...prevState,
    //                 editable: false,
    //             }));
    //             setCountryEdit(false);
    //             showAlert("Server connection error", "Please try again later");
    //             console.error("Error:", error);
    //         }
    //     };

    //     await send()
    //         .then((r) => setLoader(false))
    //         .catch((e) => setLoader(false));
    // };

    // const renderPasswordRequire = () => {
    //     return (
    //         <View style={styles.passwordRequireContainer}>
    //             {showLoader(loader, "Saving changes")}
    //             <TouchableOpacity
    //                 style={platform}
    //                 onPress={() => {
    //                     setShowRequire(false);
    //                 }}
    //             >
    //                 <AntDesign
    //                     name="left"
    //                     style={[styles.innerFont, { fontSize: 20 }]}
    //                 />
    //                 <Text style={[styles.innerFont, { fontSize: 20 }]}>
    //                     Back
    //                 </Text>
    //             </TouchableOpacity>
    //             <Text style={styles.innerFont}>
    //                 Type your password to save changes
    //             </Text>
    //             <View style={[styles.inputContainer, { marginTop: 20 }]}>
    //                 <Ionicons
    //                     name="ios-lock-closed-outline"
    //                     style={styles.innerFont}
    //                 />
    //                 <TextInput
    //                     style={[styles.input, styles.innerFont]}
    //                     value={password}
    //                     autoCorrect={false}
    //                     placeholderTextColor="#fff"
    //                     underlineColorAndroid="transparent"
    //                     placeholder="Password"
    //                     secureTextEntry={true}
    //                     onChangeText={(text) => setPassword(text)}
    //                 />
    //             </View>
    //             <TouchableOpacity style={styles.saveButton} onPress={save}>
    //                 <Text style={styles.saveButtonText}>Save</Text>
    //                 <MaterialIcons name="save-alt" size={24} color="white" />
    //             </TouchableOpacity>
    //         </View>
    //     );
    // };

    // const handleEditUser = () => {
    //     setShowRequire(true);
    // };

    // const pickImage = async () => {
    //     // No permissions request is necessary for launching the image library
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });
    //     if (!result.canceled) {
    //         setImage(result.assets[0].uri);
    //     }
    // };

    //render section
    // const showSaveButton = () => {
    //     if (
    //         email.editable ||
    //         name.editable ||
    //         lastName.editable ||
    //         isCountryChanged ||
    //         image
    //     ) {
    //         return (
    //             <TouchableOpacity
    //                 style={styles.saveButton}
    //                 onPress={handleEditUser}
    //             >
    //                 <Text style={styles.saveButtonText}>Confirm changes</Text>
    //                 <AntDesign name="check" size={24} color="white" />
    //             </TouchableOpacity>
    //         );
    //     }
    // };

    const renderAvatar = () => {
        if (avatar) {
            if (image) {
                return (
                    <Image
                        style={styles.avatarImage}
                        source={{
                            uri: image,
                        }}
                    />
                );
            }
            return (
                <Image
                    style={styles.avatarImage}
                    source={{
                        uri: `data:image/jpeg;base64,${avatar}`,
                    }}
                />
            );
        } else {
            if (image) {
                return (
                    <Image
                        style={styles.avatarImage}
                        source={{
                            uri: image,
                        }}
                    />
                );
            }
        }
    };

    const updateUser = async () => {
        if (fetchedUser) {
            const q = query(
                collection(FIREBASE_DB, "Users"),
                where("uid", "==", fetchedUser.uid)
            );
            getDocs(q).then((snapshot) => {
                console.log(snapshot.docs[0].id);
                const ref = doc(FIREBASE_DB, `Users/${snapshot.docs[0].id}`);
                updateDoc(ref, { nickname: "Konrado" });
            });
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior="position"
            keyboardVerticalOffset={offset}
        >
            {showRequire ? null : ( // renderPasswordRequire()
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Pressable
                        style={platform}
                        onPress={() => {
                            handleButtonPress(OptionTypes.OPTIONS);
                        }}
                    >
                        <AntDesign
                            name="left"
                            style={[styles.innerFont, { fontSize: 20 }]}
                        />
                        <Text style={[styles.innerFont, { fontSize: 20 }]}>
                            Back
                        </Text>
                    </Pressable>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Edit profile</Text>
                    </View>
                    <View style={styles.editSection}>
                        {/* <View style={styles.avatarContainer}>
                            {renderAvatar()}
                            <TouchableOpacity
                                style={styles.avatarEditLayout}
                                onPress={pickImage}
                            >
                                <Ionicons
                                    name="pencil"
                                    size={28}
                                    color={"white"}
                                />
                                <Text style={styles.avatarEditText}>
                                    Edit avatar
                                </Text>
                            </TouchableOpacity>
                        </View> */}
                        <View style={styles.dataEditionContent}>
                            <View style={styles.singleValueEdit}>
                                <Text style={styles.singleValueEditText}>
                                    E-mail
                                </Text>
                                <View
                                    style={[
                                        styles.inputContainer,
                                        !email.editable
                                            ? styles.inputContainerDisabled
                                            : null,
                                    ]}
                                >
                                    <AntDesign
                                        name="mail"
                                        style={styles.innerFont}
                                    />
                                    <TextInput
                                        style={[styles.input, styles.innerFont]}
                                        onChangeText={(text) =>
                                            setEmail((prevEmail) => ({
                                                ...prevEmail,
                                                value: text,
                                            }))
                                        }
                                        value={email.value}
                                        placeholder="E-mail"
                                        autoCorrect={false}
                                        placeholderTextColor="#fff"
                                        underlineColorAndroid="transparent"
                                        onFocus={() =>
                                            setEmail((prevEmail) => ({
                                                ...prevEmail,
                                                editable: true,
                                            }))
                                        }
                                        onBlur={() =>
                                            email.value ===
                                                fetchedUser?.email &&
                                            setEmail((prevEmail) => ({
                                                ...prevEmail,
                                                editable: false,
                                            }))
                                        }
                                    />
                                    {email.value === fetchedUser?.email && (
                                        <Ionicons
                                            name="pencil"
                                            size={24}
                                            color={"white"}
                                        />
                                    )}
                                </View>
                            </View>
                        </View>
                        <View style={styles.dataEditionContent}>
                            <View style={styles.singleValueEdit}>
                                <Text style={styles.singleValueEditText}>
                                    Name
                                </Text>
                                <View
                                    style={[
                                        styles.inputContainer,
                                        !name.editable
                                            ? styles.inputContainerDisabled
                                            : null,
                                    ]}
                                >
                                    <AntDesign
                                        name="user"
                                        style={styles.innerFont}
                                    />
                                    <TextInput
                                        style={[styles.input, styles.innerFont]}
                                        onChangeText={(text) =>
                                            setName((prevName) => ({
                                                ...prevName,
                                                value: text,
                                            }))
                                        }
                                        value={name.value}
                                        placeholder="Name"
                                        autoCorrect={false}
                                        placeholderTextColor="#fff"
                                        underlineColorAndroid="transparent"
                                        onFocus={() =>
                                            setName((prevName) => ({
                                                ...prevName,
                                                editable: true,
                                            }))
                                        }
                                        onBlur={() =>
                                            name.value === fetchedUser?.name &&
                                            setName((prevName) => ({
                                                ...prevName,
                                                editable: false,
                                            }))
                                        }
                                    />
                                    {name.value === fetchedUser?.name && (
                                        <Ionicons
                                            name="pencil"
                                            size={24}
                                            color={"white"}
                                        />
                                    )}
                                </View>
                            </View>
                        </View>
                        <View style={styles.dataEditionContent}>
                            <View style={styles.singleValueEdit}>
                                <Text style={styles.singleValueEditText}>
                                    Last name
                                </Text>
                                <View
                                    style={[
                                        styles.inputContainer,
                                        !lastName.editable
                                            ? styles.inputContainerDisabled
                                            : null,
                                    ]}
                                >
                                    <AntDesign
                                        name="user"
                                        style={styles.innerFont}
                                    />
                                    <TextInput
                                        style={[styles.input, styles.innerFont]}
                                        onChangeText={(text) =>
                                            setLastName((prevLastName) => ({
                                                ...prevLastName,
                                                value: text,
                                            }))
                                        }
                                        value={lastName.value}
                                        placeholder="Last name"
                                        autoCorrect={false}
                                        placeholderTextColor="#fff"
                                        underlineColorAndroid="transparent"
                                        onFocus={() =>
                                            setLastName((prevLastName) => ({
                                                ...prevLastName,
                                                editable: true,
                                            }))
                                        }
                                        onBlur={() =>
                                            lastName.value ===
                                                fetchedUser?.lastName &&
                                            setLastName((prevLastName) => ({
                                                ...prevLastName,
                                                editable: false,
                                            }))
                                        }
                                    />

                                    {lastName.value ===
                                        fetchedUser?.lastName && (
                                        <Ionicons
                                            name="pencil"
                                            size={24}
                                            color={"white"}
                                        />
                                    )}
                                </View>
                            </View>
                        </View>
                        <View style={styles.dataEditionContent}>
                            <View style={styles.singleValueEdit}>
                                <Text style={styles.singleValueEditText}>
                                    Nationality{" "}
                                </Text>
                                <View
                                    style={[
                                        styles.inputContainer,
                                        !isCountryChanged
                                            ? styles.inputContainerDisabled
                                            : null,
                                    ]}
                                >
                                    <View>
                                        <Text>
                                            {countryEmoji.flag(
                                                country.country?.cca2
                                            ) || "❓"}
                                        </Text>
                                    </View>
                                    <Pressable
                                        style={[styles.countryInput]}
                                        onPress={() => {
                                            setShowCountryPicker(true);
                                        }}
                                    >
                                        <Text style={styles.innerFont}>
                                            {country.country.name.toString()}
                                        </Text>
                                    </Pressable>
                                    {/*<TouchableOpacity onPress={() => setCountryEdit(!countryEdit)}>*/}
                                    {!isCountryChanged && (
                                        <Ionicons
                                            name="pencil"
                                            size={24}
                                            color={"white"}
                                        />
                                    )}
                                    {/*</TouchableOpacity>*/}
                                </View>
                            </View>
                        </View>
                        {/* {showSaveButton()} */}

                        {/* {showCountryPicker && (
                            <CountryPicker
                                theme={DARK_THEME}
                                {...{
                                    countryCode,
                                    withFilter: true,
                                    withFlag: true,
                                    withCountryNameButton: false,
                                    withAlphaFilter: true,
                                    withCallingCode: false,
                                    withEmoji: true,
                                    onSelect: (country: Country) => {
                                        handleCountrySelect(country);
                                    },
                                    onClose: () => {
                                        setShowCountryPicker(false);
                                    },
                                    visible: true,
                                }}
                            />
                        )} */}
                        <Pressable onPress={updateUser}>
                            <Text style={styles.innerFont}>save</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            )}
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
        zIndex: 200,
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
        color: "white",
    },
    scrollContainer: {
        flexGrow: 1,
        height: "100%",
        marginBottom: 100,
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
        color: "white",
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
        color: "white",
    },
    innerFont: {
        fontSize: 16,
        color: "white",
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
        alignItems: "flex-start",
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
    },
});
