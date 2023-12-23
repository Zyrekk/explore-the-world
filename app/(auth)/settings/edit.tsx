import {View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import {publicStyles} from "@/styles/publicStyles";
import {UserInterface} from "@/constants/UserInterface";
import {getUserFromStorage} from "@/utils/getUserFromStorage";
import Avatar, {AvatarProps} from "@/components/UserEdit/Avatar";
import CountryPicker, {
    DARK_THEME,
    Country,
    CountryCode
} from "react-native-country-picker-modal";
import EditField from "@/components/UserEdit/EditField";
import {AntDesign} from "@expo/vector-icons";
import CountryField from "@/components/UserEdit/CountryField";
import {updateFirebaseUser} from "@/utils/updateFirebaseUser";
import {useRouter} from "expo-router";

export interface EditProps {
    country: Country | null;
    name: string;
    lastname: string;
    countryCode: CountryCode;
    [key:string]:any;
}

interface UserUpdateProps{
    name:string;
    lastname:string;
    [key:string]:any;
}

const Edit = () => {
    const [user, setUser] = useState<UserInterface | null>(null);
    const router=useRouter();
    const [avatarState, setAvatarState] = useState<AvatarProps>({
        avatar: "",
        image: ""
    })
    const [editUser, setEditUser] = useState<EditProps>({
        country: null,
        name: "",
        lastname: "",
        countryCode: "PL"
    })
    const [showCountryPicker,setShowCountryPicker]=useState<boolean>(false)

    const handleCountrySelect = (country: Country) => {
        setEditUser({...editUser ,country:country,countryCode:country.cca2})
        setShowCountryPicker(false);
    };

    const sendChanges = () => {
        if (!user) {
            return;
        }
        const userUpdates:UserUpdateProps= {
            name: editUser.name,
            lastname: editUser.lastname,
            country: editUser.country,
        };
        if (avatarState.avatar) {
            userUpdates.avatar = avatarState.avatar;
        }

        updateFirebaseUser(user, userUpdates).then(()=>router.push("/settings/mainSettings"));

    };

    useEffect(() => {
        getUserFromStorage().then(user => {
            setUser(user)
            setAvatarState({
                avatar: user.avatar,
                image: null,
            })
            setEditUser({
                country: user.country,
                name: user.name,
                lastname: user.lastname,
                countryCode: user.countryCode,
            })
        });
    }, []);

    useEffect(() => {
    }, [avatarState]);
    return (
        <View className="bg-[#160227]" style={{flex: 1}}>
            <SafeAreaView style={publicStyles.safeArea}>
                <View
                    style={publicStyles.keyboardContainer}
                >
                    <ScrollView contentContainerStyle={publicStyles.scrollContainer}>
                        <View style={publicStyles.headContainer}>
                            <Text style={[publicStyles.title, {marginTop: 50, color: "white"}]}>Edit profile</Text>
                        </View>
                        <View style={styles.editSection}>
                            <Avatar avatar={avatarState} setAvatar={setAvatarState}/>
                            <EditField setEditUser={setEditUser}
                                       editUser={editUser}
                                       type={"name"}
                                       icon={<AntDesign
                                           name="user"
                                           style={[{
                                               fontSize: 16,
                                               color: "white"
                                           }]}
                                       />}
                                       placeholder={"Name"}
                            />
                            <EditField setEditUser={setEditUser}
                                       editUser={editUser}
                                       type={"lastname"}
                                       icon={<AntDesign
                                           name="user"
                                           style={[{
                                               fontSize: 16,
                                               color: "white"
                                           }]}
                                       />}
                                       placeholder={"Lastname"}
                            />
                            <CountryField setShowCountryPicker={setShowCountryPicker} editUser={editUser} />
                            {showCountryPicker && (
                                <CountryPicker
                                    theme={DARK_THEME}
                                    {...{
                                        countryCode:editUser.countryCode,
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
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={sendChanges}
                        >
                            <Text style={styles.saveButtonText}>Save</Text>
                            <AntDesign name="check" size={24} color="white"/>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    avatarImage: {
        borderRadius: 100,
        width: "101%",
        height: "101%",
    },
    saveButton: {
        marginTop: 25,
        display: "flex",
        flexDirection: "row",
        gap: 5,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        backgroundColor: "black",
        borderRadius: 40,
        width: "100%",
    },
    saveButtonText: {
        fontSize: 16,
        color: "white",
    },
    editSection: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10,
    },
})

export default Edit;
