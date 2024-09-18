import { Image, Linking, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import { icons } from "@/constants";
import { useOAuth } from "@clerk/clerk-expo";
import React, { useCallback } from "react";

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  // const handleGoogleSignIn = useCallback(async () => {
  //   try {
  //     const { createdSessionId, signIn, signUp, setActive } =
  //       await startOAuthFlow({
  //         // redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' }),
  //       });

  //     if (createdSessionId) {
  //       setActive!({ session: createdSessionId });
  //     } else {
  //       // Use signIn or signUp for next steps such as MFA
  //     }
  //   } catch (err) {
  //     console.error("OAuth error", err);
  //   }
  // }, []);

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100"></View>
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100"></View>
      </View>
      <CustomButton
        title="Log in with Google"
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        // onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;
