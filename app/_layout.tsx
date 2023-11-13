import {Slot, useRouter} from "expo-router";
import {useEffect} from "react";
import {getUserFromStorage} from "@/utils/getUserFromStorage";

const InitialLayout = () => {
    const router = useRouter();
    useEffect(() => {
        getUserFromStorage().then((res) => {
            if (res) {
                router.replace("/home");
            } else {
                router.replace("/login");
            }
        })
    }, []);

    return <Slot/>;
};

const RootLayout = () => {
    return (
        <InitialLayout/>
    );
};

export default RootLayout;
