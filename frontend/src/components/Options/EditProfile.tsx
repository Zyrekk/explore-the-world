import {
    ActivityIndicator,
    Image,
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
import {AntDesign, Ionicons, MaterialIcons} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import {UserData} from "../../commons/interfaces/interfaces";
import {getUserDataFromStorage, setUserDataToStorage} from "../../commons/utils/AuthContext";
import {OptionTypes} from "../../commons/types/OptionTypes";
import CountryPicker, {Country, CountryCode, DARK_THEME} from 'react-native-country-picker-modal'
import * as ImagePicker from 'expo-image-picker';
import countryEmoji from 'country-emoji'
import axios from "axios";
import {showAlert} from "../../commons/utils/Alert";


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

export const EditProfile = ({handleButtonPress}: EditProfileProps) => {

    const platform = Platform.OS === 'ios' ? styles.backButtonIos : styles.backButtonAndroid

    const offset = Platform.OS === "ios" ? -100 : -300;

    const [loader, setLoader] = useState<boolean>(false)

    const [fetchedUser, setFetchedUser] = useState<UserData | null>(null);

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

    const [avatar, setAvatar] = useState<string>("")

    const [image, setImage] = useState<any>(null);

    const [showCountryPicker, setShowCountryPicker] = useState<boolean>(false);

    const [countryEdit, setCountryEdit] = useState<boolean>(false)

    const [country, setCountry] = useState<CountryProps>(
        {
            country: {
                cca2: 'DE',
                currency: ['EUR'],
                flag: 'DEL',
                name: 'Germany',
                region: 'Europe',
                subregion: 'Western Europe',
                callingCode: ['49'],
            },
            editable: false
        }
    );
    const [countryCode, setCountryCode] = useState<CountryCode>('PL')
    const getUserData = async () => {
        try {
            // Check if user data is available in local storage
            const userData = await getUserDataFromStorage();
            setFetchedUser(userData)
            if (userData) {
                setEmail((prevState) => ({
                    ...prevState,
                    value: userData.email,
                }));
                if (userData.name) {
                    setName((prevState) => ({
                        ...prevState,
                        value: userData.name,
                    }));
                }
                if (userData.lastName) {
                    setLastName((prevState) => ({
                        ...prevState,
                        value: userData.lastName,
                    }));
                }
                if (userData.country) {

                    setCountry((prevState) => ({
                        ...prevState,
                        country: userData.country,
                    }));
                }
                if (userData.avatar) {
                    setAvatar(userData.avatar)
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        getUserData().then(r => console.log("what", r));
    }, []);

    const handleCountrySelect = (country: Country) => {
        setCountry((prevState) => ({...prevState, country: country, editable: false}));
        setShowCountryPicker(false);
    };

    const handleEditUser = async () => {
        setLoader(true);
        const save = async () => {
            try {
                if (fetchedUser?.username) {
                    const formData = new FormData();
                    if (image) {
                        formData.append('avatar', {
                            // @ts-ignore
                            uri: image,
                            type: 'image',
                            name: "nazwa.jpg"
                        });
                    }
                    formData.append('username', fetchedUser.username);
                    formData.append('currentPassword', 'mirek');
                    formData.append('email', email.value || '');
                    formData.append('name', name.value || '');
                    formData.append('lastName', lastName.value || '');
                    formData.append("country", JSON.stringify(country))


                    const response = await axios.put('http://192.168.0.30:5000/users/edit', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data', // Required for sending files
                        },
                    });

                    await setUserDataToStorage(response.data);
                    setFetchedUser(response.data);
                    setEmail((prevState) => ({
                        ...prevState,
                        editable: false,
                    }));
                    setName((prevState) => ({
                        ...prevState,
                        editable: false,
                    }));
                    setLastName((prevState) => ({
                        ...prevState,
                        editable: false,
                    }));
                    if (response.data !== undefined) {
                        setAvatar(response.data.avatar)
                    }
                    setCountryEdit(false);
                    setImage(null);
                    showAlert("Changes saved", "Your changes have been saved");
                    setLoader(false);
                }
            } catch (error) {
                setLoader(false);
                getUserData().then(r => console.log("what", r));
                setEmail((prevState) => ({
                    ...prevState,
                    editable: false,
                }));
                setName((prevState) => ({
                    ...prevState,
                    editable: false,
                }));
                setLastName((prevState) => ({
                    ...prevState,
                    editable: false,
                }));
                setCountryEdit(false);
                showAlert("Server connection error", "Please try again later");
                console.error('Error:', error);
            }
        }

        await save().then((r) => setLoader(false)).catch((e) => setLoader(false))
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    //render section
    const showSaveButton = () => {
        if (email.editable || name.editable || lastName.editable || countryEdit || image) {
            return (
                <TouchableOpacity style={styles.saveButton} onPress={handleEditUser}>
                    <Text style={styles.saveButtonText}>Save</Text>
                    <MaterialIcons name="save-alt" size={24}
                                   color="white"/>
                </TouchableOpacity>
            )
        }
    }

    const showLoader = () => {
        if (loader) {
            return (
                <View style={styles.loadingContainer}>
                    <Text style={styles.innerFont}>Saving changes</Text>
                    <ActivityIndicator size="large" color="#fff"/>
                </View>)
        }
    }

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
                )
            }
            return (
                <Image
                    style={styles.avatarImage}
                    source={{
                        uri: `data:image/jpeg;base64,${avatar}`,
                    }}
                />
            )
        } else {
            if (image) {
                return (
                    <Image
                        style={styles.avatarImage}
                        source={{
                            uri: image,
                        }}
                    />
                )
            }

        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior="position"
            keyboardVerticalOffset={offset}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {showLoader()}
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
                        {
                            renderAvatar()
                        }
                        {/*{avatar && (*/}
                        {/*    <Image*/}
                        {/*        style={styles.avatarImage}*/}
                        {/*        source={{*/}
                        {/*            uri: `data:image/jpeg;base64,${avatar}`,*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*)}*/}
                        <TouchableOpacity style={styles.avatarEditLayout} onPress={pickImage}>
                            <Ionicons name="pencil" size={28} color={"white"}/>
                            <Text style={styles.avatarEditText}>Edit avatar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.dataEditionContent}>
                        <View style={styles.singleValueEdit}>
                            <Text style={styles.singleValueEditText}>E-mail</Text>
                            <View
                                style={[styles.inputContainer, !email.editable ? styles.inputContainerDisabled : null]}>
                                <AntDesign name="mail" style={styles.innerFont}/>
                                <TextInput
                                    style={[styles.input, styles.innerFont]}
                                    onChangeText={(text) => setEmail((prevEmail) => ({...prevEmail, value: text}))}
                                    value={email.value}
                                    placeholder="E-mail"
                                    autoCorrect={false}
                                    placeholderTextColor="#fff"
                                    underlineColorAndroid="transparent"
                                    editable={email.editable}
                                />
                                <TouchableOpacity onPress={() => setEmail((prevEmail) => ({
                                    ...prevEmail,
                                    editable: !email.editable
                                }))}>
                                    {email.value === fetchedUser?.email &&
                                        <Ionicons name="pencil" size={24} color={"white"}/>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/*{image && <Image source={{uri: image}} style={{width: 200, height: 200}}/>}*/}
                    <View style={styles.dataEditionContent}>
                        <View style={styles.singleValueEdit}>
                            <Text style={styles.singleValueEditText}>Name</Text>
                            <View
                                style={[styles.inputContainer, !name.editable ? styles.inputContainerDisabled : null]}>
                                <AntDesign name="user" style={styles.innerFont}/>
                                <TextInput
                                    style={[styles.input, styles.innerFont]}
                                    onChangeText={(text) => setName((prevName) => ({...prevName, value: text}))}
                                    value={name.value}
                                    placeholder="Name"
                                    autoCorrect={false}
                                    placeholderTextColor="#fff"
                                    underlineColorAndroid="transparent"
                                    editable={name.editable}
                                />
                                <TouchableOpacity onPress={() => setName((prevName) => ({
                                    ...prevName,
                                    editable: !name.editable
                                }))}>
                                    {name.value === fetchedUser?.name &&
                                        <Ionicons name="pencil" size={24} color={"white"}/>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.dataEditionContent}>
                        <View style={styles.singleValueEdit}>
                            <Text style={styles.singleValueEditText}>Last name</Text>
                            <View
                                style={[styles.inputContainer, !lastName.editable ? styles.inputContainerDisabled : null]}>
                                <AntDesign name="user" style={styles.innerFont}/>
                                <TextInput
                                    style={[styles.input, styles.innerFont]}
                                    onChangeText={(text) => setLastName((prevLastName) => ({
                                        ...prevLastName,
                                        value: text
                                    }))}
                                    value={lastName.value}
                                    placeholder="Last name"
                                    autoCorrect={false}
                                    placeholderTextColor="#fff"
                                    underlineColorAndroid="transparent"
                                    editable={lastName.editable}
                                />
                                <TouchableOpacity onPress={() => setLastName((prevLastName) => ({
                                    ...prevLastName,
                                    editable: !lastName.editable
                                }))}>
                                    {lastName.value === fetchedUser?.lastName &&
                                        <Ionicons name="pencil" size={24} color={"white"}/>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.dataEditionContent}>
                        <View style={styles.singleValueEdit}>
                            <Text style={styles.singleValueEditText}>Nationality </Text>
                            <View style={[styles.inputContainer, !countryEdit ? styles.inputContainerDisabled : null]}>
                                <View><Text>{countryEmoji.flag(country.country?.cca2) || '❓'}</Text></View>
                                <Pressable style={[styles.countryInput]} onPress={() => {
                                    if (countryEdit) {
                                        setShowCountryPicker(true)
                                    }
                                }}>
                                    <Text style={styles.innerFont}>{country.country.name.toString()}</Text>
                                </Pressable>
                                <TouchableOpacity onPress={() => setCountryEdit(!countryEdit)}>
                                    {/*{country.country.cca2 === fetchedUser?.nationality &&*/}
                                    <Ionicons name="pencil" size={24} color={"white"}/>
                                    {/*}*/}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {showSaveButton()}

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
                                    handleCountrySelect(country)
                                },
                                visible: true
                            }}
                        />
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    keyboardContainer: {
        display: "flex",
        justifyContent: "flex-end",
        height: "100%",
        paddingBottom: 40,
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
    countryInput: {
        height: 40,
        display: "flex",
        justifyContent: "center",
        flex: 1,

    }
})
