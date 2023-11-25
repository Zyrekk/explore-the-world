import {Slot, useRouter} from "expo-router";
import {useEffect} from "react";
import {getUserFromStorage} from "@/utils/getUserFromStorage";
import {ApplicationProvider} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import {default as theme} from "@/constants/Theme.json"

const InitialLayout = () => {
    const router = useRouter();
    useEffect(() => {
        getUserFromStorage().then((res) => {
            if (res) {
                router.push("/home/mainHome");
            } else {
                router.push("/landing");
            }
        })
    }, []);

    return (
        <Slot/>
    );
};

const RootLayout = () => {
    return (

        <ApplicationProvider {...eva} theme={{...eva.dark, ...theme}}>
            <InitialLayout/>
        </ApplicationProvider>
    );
};

export default RootLayout;
