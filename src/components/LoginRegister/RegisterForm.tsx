import {View,Text,StyleSheet} from "react-native";

type WelcomeProps = {
    handleButtonPress: (type: string) => void;
};

export const RegisterForm = ({ handleButtonPress }: WelcomeProps) => {
    return(
        <View>
            <Text style={styles.text}>Register form</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 60,
        color: "white"
    },
});
