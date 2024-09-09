import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, Text, View, ScrollView } from "react-native";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignUpPress = async () => {};

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute left-5 bottom-5 ">
            Welcome 👋
          </Text>
        </View>
        <View className="p-5">
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
            href="/(auth)/sign-up"
            className="text-lg text-general-200 text-center mt-10"
          >
            <Text>Don't have an account? </Text>
            <Text className="text-primary-500">Sign Up</Text>
          </Link>

          {/* Verification Modal */}
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
