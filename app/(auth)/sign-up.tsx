import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Image, Text, View, ScrollView } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "pending",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        // Todo Create a Database user!

        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed",
          state: "failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute left-5 bottom-5 ">
            Create Your Account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChange={(value) =>
              setForm({ ...form, name: value.nativeEvent.text })
            }
          />
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.person}
            value={form.email}
            onChange={(value) =>
              setForm({ ...form, email: value.nativeEvent.text })
            }
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.person}
            value={form.password}
            onChange={(value) =>
              setForm({ ...form, password: value.nativeEvent.text })
            }
          />
          <CustomButton
            title="Sign Up"
            onPress={onSignUpPress}
            className="mt-6"
          />

          <OAuth />

          <Link
            href="/(auth)/sign-in"
            className="text-lg text-general-200 text-center mt-10"
          >
            <Text>Already have an account? </Text>
            <Text className="text-primary-500">Log In</Text>
          </Link>

          <ReactNativeModal
            isVisible={verification.state === "pending"}
            onModalHide={() => {
              setVerification({ ...verification, state: "success" });
            }}
          >
            <View>
              <Text>Verification</Text>
              <Text>We've sent a verification code to {form.email}</Text>
            </View>
          </ReactNativeModal>

          <ReactNativeModal isVisible={verification.state === "success"}>
            <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
              <Image
                source={images.check}
                className="w-[110px] h-[110px] mx-auto my-5"
              />

              <Text className="text-3xl font-JakartaBold text-center">
                Verified
              </Text>

              <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
                You have successfully verified your account.
              </Text>

              <CustomButton
                title="Browse Home"
                onPress={() => router.replace("/(root)/(tabs)/home")}
                className="mt-5"
              />
            </View>
          </ReactNativeModal>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
