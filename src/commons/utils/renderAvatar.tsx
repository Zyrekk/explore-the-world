import {Image, StyleSheet} from "react-native";
import React from "react";

export const renderAvatar = (avatar:string,image:string) => {
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

const styles = StyleSheet.create({
    avatarImage: {
        borderRadius: 100,
        width: "101%",
        height: "101%",
    }
})
