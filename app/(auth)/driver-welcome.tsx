import React, { useRef, useState } from "react";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, Image } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";

const DriverOnboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>
      <View className="flex items-center justify-center p-5">
        <Image
          source={images.onboarding2}
          className="w-full h-[300px]"
          resizeMode="contain"
        />
        <View className="flex flex-row items-center justify-center">
          <Text className="text-black text-3xl font-bold mx-10 text-center">
            Welcome to the Driver app
          </Text>
        </View>
      </View>
      <CustomButton
        title="Continue"
        onPress={() => router.replace("/(auth)/sign-up")}
        className="w-10/12 mt-10"
      />
    </SafeAreaView>
  );
};

export default DriverOnboarding;
