import { Text, ActivityIndicator} from 'react-native'
import React from 'react'

const Loader = ({text}:{text:string}) => {
    return (
        <>
            <Text className="text-white text-[18px] mb-[20]">{text}</Text>
            <ActivityIndicator size="large" color="#fff"/>
        </>
    );
}

export default Loader;
