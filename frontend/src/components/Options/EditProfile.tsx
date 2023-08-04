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
    View
} from "react-native";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import {UserData} from "../../commons/interfaces/interfaces";
import {getUserDataFromStorage} from "../../commons/utils/AuthContext";
import {OptionTypes} from "../../commons/types/OptionTypes";
import CountryPicker, {Country, CountryCode, DARK_THEME} from 'react-native-country-picker-modal'
import countryEmoji from 'country-emoji';

interface EditProfileProps {
    handleButtonPress: (type: string) => void;
}

interface CountryFlagProps {
    country: Country | null; // Pass the saved country object here
}


export const EditProfile = ({handleButtonPress}: EditProfileProps) => {
    const platform = Platform.OS === 'ios' ? styles.backButtonIos : styles.backButtonAndroid
    const [fetchedUser, setFetchedUser] = useState<UserData | null>(null);
    const [email, setEmail] = useState<string>("");
    const [emailEdit, setEmailEdit] = useState<boolean>(false);
    const [name, setName] = useState<string>("")
    const [nameEdit, setNameEdit] = useState<boolean>(false)
    const [countryEdit, setCountryEdit] = useState<boolean>(false)
    const [lastName, setLastName] = useState<string>("")
    const [lastNameEdit, setLastNameEdit] = useState<boolean>(false)
    const offset = Platform.OS === "ios" ? -100 : -300;

    const [country, setCountry] = useState<Country | null>({
        cca2: 'DE', // Country code for Germany
        currency: ['EUR'], // Currency of Germany
        flag: 'DEL', // Flag emoji for Germany
        name: 'Germany',
        region: 'Europe',
        subregion: 'Western Europe',
        callingCode: ['49'], // Calling code for Germany
    });
    const [countryCode, setCountryCode] = useState<CountryCode>(country ? country.cca2 : 'PL')
    const [withCountryNameButton, setWithCountryNameButton] = useState<boolean>(
        false,
    )
    const onSelect = (country: Country) => {
        setCountryCode(country.cca2)
        setCountry(country)
    }

    useEffect(() => {
        const getUserData = async () => {
            try {
                // Check if user data is available in local storage
                const userData = await getUserDataFromStorage();
                if (userData) {
                    setFetchedUser(userData);
                    setEmail(userData?.email)
                    setName(userData?.name)
                    setLastName(userData?.lastName)
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        getUserData();
    }, []);

    const [showCountryPicker, setShowCountryPicker] = useState(false);

    const handleCountryPickerOpen = () => {
        setShowCountryPicker(true);
    };

    const handleCountrySelect = (country: Country) => {
        setCountry(country);
        setShowCountryPicker(false);
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior="position"
            keyboardVerticalOffset={offset}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                                <AntDesign name="mail" style={styles.innerFont}/>
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
                    <View style={styles.dataEditionContent}>
                        <View style={styles.singleValueEdit}>
                            <Text style={styles.singleValueEditText}>Name</Text>
                            <View style={[styles.inputContainer, !nameEdit ? styles.inputContainerDisabled : null]}>
                                <AntDesign name="user" style={styles.innerFont}/>
                                <TextInput
                                    style={[styles.input, styles.innerFont]}
                                    onChangeText={setName}
                                    value={name}
                                    placeholder="Name"
                                    autoCorrect={false}
                                    placeholderTextColor="#fff"
                                    underlineColorAndroid="transparent"
                                    editable={nameEdit}
                                />
                                <TouchableOpacity onPress={() => setEmailEdit(!nameEdit)}>
                                    {name === fetchedUser?.name &&
                                        <Ionicons name="pencil" size={24} color={"white"}/>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.dataEditionContent}>
                        <View style={styles.singleValueEdit}>
                            <Text style={styles.singleValueEditText}>Last name</Text>
                            <View style={[styles.inputContainer, !lastNameEdit ? styles.inputContainerDisabled : null]}>
                                <AntDesign name="user" style={styles.innerFont}/>
                                <TextInput
                                    style={[styles.input, styles.innerFont]}
                                    onChangeText={setLastName}
                                    value={lastName}
                                    placeholder="Last name"
                                    autoCorrect={false}
                                    placeholderTextColor="#fff"
                                    underlineColorAndroid="transparent"
                                    editable={lastNameEdit}
                                />
                                <TouchableOpacity onPress={() => setEmailEdit(!lastNameEdit)}>
                                    {lastName === fetchedUser?.lastName &&
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
                                <View><Text>{countryEmoji.flag(countryCode) || '❓'}</Text></View>
                                <Pressable style={[styles.countryInput]} onPress={() => {
                                    if (countryEdit) {
                                        setShowCountryPicker(true)
                                    }
                                }}>
                                    <Text style={styles.innerFont}>{country?.name.toString()}</Text>
                                </Pressable>
                                <TouchableOpacity onPress={() => setCountryEdit(!countryEdit)}>
                                    {lastName === fetchedUser?.lastName &&
                                        <Ionicons name="pencil" size={24} color={"white"}/>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {showCountryPicker && (
                        <CountryPicker
                            theme={DARK_THEME}
                            {...{
                                countryCode,
                                withFilter: true,
                                withFlag: true,
                                withCountryNameButton,
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
    scrollContainer: {
        flexGrow: 1,
        height: "100%",
        marginBottom: 30
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
