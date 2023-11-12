import { View, Text } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  // const { user } = useUser();

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>HOME</Text>
      {/* <Text>Welcome, {user?.emailAddresses[0].emailAddress} 🎉</Text> */}
    </SafeAreaView>
  );
};

export default Home;
