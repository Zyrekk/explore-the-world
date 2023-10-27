import {
    Image,
    KeyboardAvoidingView,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import {LocalStorageUserSchema} from "../commons/interfaces/interfaces";
import {getUserDataFromStorage} from "../commons/utils/AuthContext";
import {OptionTypes} from "../commons/types/OptionTypes";
import CountryPicker, {
    Country,
    CountryCode,
    DARK_THEME,
} from "react-native-country-picker-modal";
import countryEmoji from "country-emoji";
import {pickImage} from "../commons/utils/pickImage";
import {renderAvatar} from "../commons/utils/renderAvatar";
import {updateUser} from "../commons/utils/updateUser";
import {ref,uploadBytes,getDownloadURL } from "firebase/storage";
import {v4} from "uuid";
import { doc,addDoc,collection } from "firebase/firestore";
import {FIREBASE_STORAGE,FIREBASE_DB} from "../../FirebaseConfig";

interface EditProfileProps {
    handleButtonPress: (type: string) => void;
}

interface fieldProps {
    value: string;
    editable: boolean;
}

export const EditProfile = ({handleButtonPress}: EditProfileProps) => {

    const [fetchedUser, setFetchedUser] = useState<LocalStorageUserSchema | null>(
        null
    );
    const [name, setName] = useState<fieldProps>({
        value: "",
        editable: false,
    });
    const [lastname, setLastname] = useState<fieldProps>({
        value: "",
        editable: false,
    });
    const [avatar, setAvatar] = useState<any>(null);
    const [image, setImage] = useState<any>(null);

    const [countryCode, setCountryCode] = useState<CountryCode>('PL')
    const [isCountryChanged, setIsCountryChanged] = useState<boolean>(false);
    const [showCountryPicker, setShowCountryPicker] = useState<boolean>(false);
    const [countryEdit, setCountryEdit] = useState<boolean>(false);
    const [country, setCountry] = useState<Country | null>(null);

    const updateStateProperty = (setState: (arg0: (prevState: any) => any) => void, property: any, value: any) => {
        setState((prevState) => ({
            ...prevState,
            [property]: value,
        }));
    }
    const handleCountrySelect = (country: Country) => {
        setCountry(country);
        setShowCountryPicker(false);
        setIsCountryChanged(true)
    };

    const sendChanges = () => {
        // addDoc(collection(FIREBASE_DB,"Temp"),{xd:"DUPA"}).then((o)=>console.log(o.id))
        // if (fetchedUser) {
        //     updateUser(fetchedUser,
        //         {
        //             name: name.value,
        //             lastname: lastname.value,
        //             country:country,
        //             avatar: avatar
        //         }
        //     )
        // }
        // uploadImage()
    }

    const uploadImage=async()=>{
        const response=await fetch(image)
        const blob=await response.blob()
        const filename=image.substring(image.lastIndexOf('/')+1)
        const imageRef=ref(FIREBASE_STORAGE,filename)
        uploadBytes(imageRef,blob).then(()=>{
            console.log("IMAGE UPLOADED")
        })
    }


    useEffect(() => {


        const initializeUser = async () => {
            const userData:LocalStorageUserSchema = await getUserDataFromStorage();
            setFetchedUser(userData);

            if (userData) {
                setName((prevState) => ({
                    ...prevState,
                    value: userData?.name?userData.name:"",
                }));
                setLastname((prevState) => ({
                    ...prevState,
                    value: userData?.lastname?userData.lastname:"",
                }));
                setAvatar(userData?.avatar?userData.avatar:"");
                setCountry(userData?.country?userData.country:null)
                setCountryCode(userData?.country?userData.country.cca2:'PL')
            } else {
                console.log("no user in local storage");
            }
        };
        initializeUser();
    }, []);

    useEffect(() => {
        const reference=ref(FIREBASE_STORAGE,"65C0104C-96D5-46D4-83DD-D59DA1580B27.jpg")
        getDownloadURL(reference).then((url)=>setAvatar(url))
    },[])

    return (
        <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior="position"
            keyboardVerticalOffset={-100}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Pressable
                    style={styles.backButton}
                    onPress={() => {
                        handleButtonPress(OptionTypes.OPTIONS);
                    }}
                >
                    <AntDesign
                        name="left"
                        style={[styles.innerFont, {fontSize: 20}]}
                    />
                    <Text style={[styles.innerFont, {fontSize: 20}]}>
                        Back
                    </Text>
                </Pressable>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Edit profile</Text>
                </View>
                <View style={styles.editSection}>
                    <View style={styles.avatarContainer}>
                        {renderAvatar(avatar, image)}
                        <TouchableOpacity
                            style={styles.avatarEditLayout}
                            onPress={() => pickImage(setImage)}
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
                    </View>
                    <View style={styles.dataEditionContent}></View>
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
                                    onFocus={() =>
                                        updateStateProperty(setName, "editable", true)
                                    }
                                    onBlur={() =>
                                        name.value === fetchedUser?.name &&
                                        updateStateProperty(setName, "editable", false)
                                    }
                                    onChangeText={(text) =>
                                        updateStateProperty(setName, "value", text)
                                    }
                                    value={name.value}
                                    placeholder="Name"
                                    autoCorrect={false}
                                    placeholderTextColor="#fff"
                                    underlineColorAndroid="transparent"
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
                                    !lastname.editable
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
                                        setLastname((prevLastName) => ({
                                            ...prevLastName,
                                            value: text,
                                        }))
                                    }
                                    value={lastname.value}
                                    placeholder="Last name"
                                    autoCorrect={false}
                                    placeholderTextColor="#fff"
                                    underlineColorAndroid="transparent"
                                    onFocus={() =>
                                        setLastname((prevLastName) => ({
                                            ...prevLastName,
                                            editable: true,
                                        }))
                                    }
                                    onBlur={() =>
                                        lastname.value ===
                                        fetchedUser?.lastname &&
                                        setLastname((prevLastName) => ({
                                            ...prevLastName,
                                            editable: false,
                                        }))
                                    }
                                />

                                {lastname.value ===
                                    fetchedUser?.lastname && (
                                        <Ionicons
                                            name="pencil"
                                            size={24}
                                            color={"white"}
                                        />
                                    )}
                            </View>
                        </View>
                    </View>
                    {<View style={styles.dataEditionContent}>
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
                                        {country && countryEmoji.flag(
                                            country?.cca2
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
                                        {country && country.name.toString()}
                                    </Text>
                                </Pressable>
                                <TouchableOpacity onPress={() => setCountryEdit(!countryEdit)}>
                                    {!isCountryChanged && (
                                        <Ionicons
                                            name="pencil"
                                            size={24}
                                            color={"white"}
                                        />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>}
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={sendChanges}
                    >
                        <Text style={styles.saveButtonText}>Save</Text>
                        <AntDesign name="check" size={24} color="white"/>
                    </TouchableOpacity>

                    {showCountryPicker && (
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
                    )}
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
    backButton: {
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
    },
    singleValueEditText: {
        fontSize: 16,
        color: "#8ca5ff",
    },
    avatarEditText: {
        color: "white",
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
