import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="sing-up" options={{ headerShown: false }} />
      <Stack.Screen name="sing-in" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;