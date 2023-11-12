import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Slot, router, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { View } from "react-native";

const CLERK_PUBLISHABLE_KEY =
  "pk_test_c2luZ3VsYXItY2hvdy02Ny5jbGVyay5hY2NvdW50cy5kZXYk";

const InitialLayout = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/home");
  }, []);
  // const { isLoaded, isSignedIn } = useAuth();
  // const segments = useSegments();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!isLoaded) return;

  //   const inTabsGroup = segments[0] === "(auth)";

  //   console.log("User changed: ", isSignedIn);

  //   if (isSignedIn && !inTabsGroup) {
  //     router.replace("/login");
  //   } else if (!isSignedIn) {
  //     router.replace("/home");
  //   }
  // }, [isSignedIn]);

  return <Slot />;
};

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const RootLayout = () => {
  return (
    // <ClerkProvider
    //   publishableKey={CLERK_PUBLISHABLE_KEY}
    //   tokenCache={tokenCache}
    // >

    <InitialLayout />

    // </ClerkProvider>
  );
};

export default RootLayout;
