import { Text, Pressable} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Pressable>
        <Text>HOME</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Home;
