import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { driverOnboarding, FormState } from "@/constants";
import { useRef, useState } from "react";
import {
  Image,
  Text,
  View,
  ScrollView,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { fetchAPI } from "@/lib/fetch";
import Swiper from "react-native-swiper";
import { useRouter } from "expo-router";

const DriverForm = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === driverOnboarding.length - 1;
  const router = useRouter();
  const { isLoaded, user } = useUser();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [form, setForm] = useState<FormState>({
    age: "",
    gender: "",
    DOB: "",
    brand: "",
    registrationPlate: "",
    vehicleModel: "",
    drivingLicenseImage: "",
    vehicleImage: "",
  });

  const handleInputChange = (key: keyof FormState, value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [key]: value,
    }));
  };

  const onDriverFormPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      // Replace with your API URL that saves driver data in Neon
      const response = await fetchAPI("/api/driver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age: form.age,
          gender: form.gender,
          DOB: form.DOB,
          brand: form.brand,
          registrationPlate: form.registrationPlate,
          vehicleModel: form.vehicleModel,
          drivingLicenseImage: form.drivingLicenseImage, // Assuming these are base64 or URLs
          vehicleImage: form.vehicleImage,
        }),
      });

      if (response.ok) {
        setShowSuccessModal(true);
      } else {
        Alert.alert("Error", "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to submit data");
    }
  };

  return (
    // <ScrollView className="flex-1 bg-white">
    //   <View className="flex-1 bg-white">
    //     <View className="relative w-full h-[250px]">
    //       <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
    //       <Text className="text-2xl text-black font-JakartaSemiBold absolute left-5 bottom-5 ">
    //         Please fill in the details
    //       </Text>
    //     </View>

    //     <View className="p-5">
    //       <InputField
    //         label="Age"
    //         placeholder="Enter your age"
    //         icon={icons.person}
    //         value={form.age}
    //         onChange={(value) =>
    //           setForm({ ...form, age: value.nativeEvent.text })
    //         }
    //       />

    //       <InputField
    //         label="Date of Birth"
    //         placeholder="Enter your date of birth"
    //         // icon={icons.calendar}
    //         value={form.DOB}
    //         onChange={(value) =>
    //           setForm({ ...form, DOB: value.nativeEvent.text })
    //         }
    //       />

    //       <InputField
    //         label="Vehicle Brand"
    //         placeholder="Enter your vehicle brand"
    //         // icon={icons.car}
    //         value={form.brand}
    //         onChange={(value) =>
    //           setForm({ ...form, brand: value.nativeEvent.text })
    //         }
    //       />

    //       <InputField
    //         label="Registration Plate"
    //         placeholder="Enter your registration plate"
    //         // icon={icons.car}
    //         value={form.registrationPlate}
    //         onChange={(value) =>
    //           setForm({
    //             ...form,
    //             registrationPlate: value.nativeEvent.text,
    //           })
    //         }
    //       />

    //       <InputField
    //         label="Vehicle Model"
    //         placeholder="Enter your vehicle model year"
    //         // icon={icons.car}
    //         value={form.vehicleModel}
    //         onChange={(value) =>
    //           setForm({
    //             ...form,
    //             vehicleModel: value.nativeEvent.text,
    //           })
    //         }
    //       />

    //       {/* You can add image upload logic here for driving license and vehicle image */}
    //       {/* For now, assume base64 or URLs are manually provided */}

    //       <CustomButton
    //         title="Submit"
    //         onPress={onDriverFormPress}
    //         className="mt-6"
    //       />

    //       <OAuth />
    //     </View>
    //   </View>
    // </ScrollView>

    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {driverOnboarding.map((item) => (
          <View
            key={item.id}
            className="flex items-center justify-center p-5 w-full"
          >
            {/* <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            /> */}
            <View className="flex flex-row items-center justify-center">
              <Text className="text-black text-3xl font-bold mx-10 text-center">
                {item.title}
              </Text>
            </View>
            {item?.options?.map((option) => (
              <View className="flex justify-between items-center w-full">
                <Image
                  source={item.image}
                  className="w-6 h-6"
                  resizeMode="contain"
                />
                <Text>{option.label}</Text>
              </View>
            ))}
            {item?.fields?.map((field) => (
              <InputField
                className="w-full"
                key={field.key}
                label={field.label}
                placeholder={field.placeholder}
                value={form[field.key as keyof FormState]}
                onChange={(value) =>
                  handleInputChange(
                    field.key as keyof FormState,
                    value.nativeEvent.text
                  )
                }
              />
            ))}
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1)
        }
        className="w-10/12 mt-10"
      />
    </SafeAreaView>
  );
};

export default DriverForm;
