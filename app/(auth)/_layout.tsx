import { Tabs } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import MyColors from "@/constants/MyColors";

// export const LogoutButton = () => {
//   const { signOut } = useAuth();

//   const doLogout = () => {
//     signOut();
//   };

//   return (
//     <Pressable onPress={doLogout} style={{ marginRight: 10 }}>
//       <Ionicons name="log-out-outline" size={24} color={"#fff"} />
//     </Pressable>
//   );
// };

const TabsPage = () => {
  // const { isSignedIn } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: MyColors.primary,
        tabBarLabelStyle: {
          fontWeight: "bold",
        },

        // headerStyle: {
        //   backgroundColor: '#6c47ff',
        // },
        // headerTintColor: '#fff',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="travels"
        options={{
          headerShown: false,
          tabBarLabel: "Travels",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="airplane-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          headerShown: false,
          tabBarLabel: "Favorite",
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="md-person-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Feather name="menu" size={size} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="home"
        options={{
          headerTitle: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          tabBarLabel: "Home",
        }}
        // redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          tabBarLabel: "Home",
        }}
        // redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          headerTitle: "Favourite",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
          tabBarLabel: "My Profile",
          headerRight: () => <LogoutButton />,
        }}
        // redirect={!isSignedIn}
      /> */}
    </Tabs>
  );
};

export default TabsPage;
