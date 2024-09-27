import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Image, Text, View, ScrollView, Alert } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import { fetchAPI } from "@/lib/fetch";

const DriverForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [form, setForm] = useState({
    age: "",
    gender: "",
    DOB: "",
    image: "",
    brand: "",
    registrationPlate: "",
    vehicleModel: "",
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });
  3;

  const onDriverFormPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        age: form.age,
        password: form.gender,
        birthDate: form.DOB,
        image: form.image,
        vehicleBrand: form.brand,
        registrationPlate: form.registrationPlate,
        verhicleModel: form.vehicleModel,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeDriverForm = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeDriverForm.status === "complete") {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            age: form.age,
            brithDay: form.DOB,
            clerkId: completeDriverForm.createdUserId,
          }),
        });

        await setActive({ session: completeDriverForm.createdSessionId });
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
            Please fill in the details
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.age}
            onChange={(value) =>
              setForm({ ...form, age: value.nativeEvent.text })
            }
          />
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.person}
            value={form.DOB}
            onChange={(value) =>
              setForm({ ...form, DOB: value.nativeEvent.text })
            }
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.person}
            value={form.brand}
            onChange={(value) =>
              setForm({ ...form, brand: value.nativeEvent.text })
            }
          />
          <CustomButton
            title="Sign Up"
            onPress={onDriverFormPress}
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
              if (verification.state === "success") {
                setShowSuccessModal(true);
              }
            }}
          >
            <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
              <Text className="text-2xl font-JakartaBold mb-2">
                Verification
              </Text>
              <Text className="font-Jakarta mb-5">
                We've sent a verification code to {form.email}
              </Text>
              <InputField
                label="Code"
                icon={icons.lock}
                placeholder="12345"
                value={verification.code}
                keyboardType="numeric"
                onChangeText={(code) => {
                  setVerification({ ...verification, code });
                }}
              />

              {verification.error && (
                <Text className="text-red-500 text-sm mt-1">
                  {verification.error}
                </Text>
              )}

              <CustomButton
                title="Verify Email"
                onPress={onPressVerify}
                className="mt-5 bg-success-500"
              />
            </View>
          </ReactNativeModal>

          <ReactNativeModal isVisible={showSuccessModal}>
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
                onPress={() => {
                  setShowSuccessModal(false);
                  router.push("/(root)/(tabs)/home");
                }}
                className="mt-5"
              />
            </View>
          </ReactNativeModal>
        </View>
      </View>
    </ScrollView>
  );
};

export default DriverForm;
