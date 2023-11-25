import {View,StyleSheet} from 'react-native'
import {SocialIcon} from "react-native-elements";

const LoginVia = () => {
    return (
        <View style={styles.loginOptions}>
            <SocialIcon
                raised={false}
                type="facebook"
                title="Continue With Facebook"
                button
                style={{backgroundColor: "#4285f4"}}
            />
            <SocialIcon
                raised={false}
                type="google"
                title="Continue With Google"
                button
            />
        </View>
    );
}

const styles = StyleSheet.create({
    loginOptions:{
        display:"flex",
        flexDirection:"column",
        gap:10,
        width:"100%",
    }
})

export default LoginVia;
