import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useState } from "react";
import { Image, Text, View, ScrollView, Alert } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { fetchAPI } from "@/lib/fetch";

const DriverForm = () => {
  const { isLoaded, user } = useUser();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [form, setForm] = useState({
    age: "",
    gender: "",
    DOB: "",
    brand: "",
    registrationPlate: "",
    vehicleModel: "",
    drivingLicenseImage: "",
    vehicleImage: "",
  });

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
            label="Age"
            placeholder="Enter your age"
            icon={icons.person}
            value={form.age}
            onChange={(value) =>
              setForm({ ...form, age: value.nativeEvent.text })
            }
          />

          <InputField
            label="Date of Birth"
            placeholder="Enter your date of birth"
            // icon={icons.calendar}
            value={form.DOB}
            onChange={(value) =>
              setForm({ ...form, DOB: value.nativeEvent.text })
            }
          />

          <InputField
            label="Vehicle Brand"
            placeholder="Enter your vehicle brand"
            // icon={icons.car}
            value={form.brand}
            onChange={(value) =>
              setForm({ ...form, brand: value.nativeEvent.text })
            }
          />

          <InputField
            label="Registration Plate"
            placeholder="Enter your registration plate"
            // icon={icons.car}
            value={form.registrationPlate}
            onChange={(value) =>
              setForm({
                ...form,
                registrationPlate: value.nativeEvent.text,
              })
            }
          />

          <InputField
            label="Vehicle Model"
            placeholder="Enter your vehicle model year"
            // icon={icons.car}
            value={form.vehicleModel}
            onChange={(value) =>
              setForm({
                ...form,
                vehicleModel: value.nativeEvent.text,
              })
            }
          />

          {/* You can add image upload logic here for driving license and vehicle image */}
          {/* For now, assume base64 or URLs are manually provided */}

          <CustomButton
            title="Submit"
            onPress={onDriverFormPress}
            className="mt-6"
          />

          <OAuth />
        </View>
      </View>
    </ScrollView>
  );
};

export default DriverForm;
