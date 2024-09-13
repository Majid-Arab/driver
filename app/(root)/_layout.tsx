import { Stack } from "expo-router";
const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="find-ride" />
      <Stack.Screen name="confirmed-ride" />
      <Stack.Screen name="book-ride" />
    </Stack>
  );
};

export default Layout;
