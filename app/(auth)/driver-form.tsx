import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { driverOnboarding, FormState } from "@/constants";
import { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Alert,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { fetchAPI } from "@/lib/fetch";
import { useRouter } from "expo-router";

const DriverForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
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

  const isLastStep = currentStep === driverOnboarding.length - 1;
  const isFirstStep = currentStep === 0;

  const goNextStep = () => {
    if (!isLastStep) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onDriverFormPress();
    }
  };

  const goPrevStep = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Function to handle option selection
  const handleOptionPress = (optionValue: string) => {
    setSelectedOption(optionValue);
  };

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {driverOnboarding.map((item, index) =>
          index === currentStep ? (
            <View key={item.id} className="w-full">
              <Text className="text-black text-3xl font-bold mx-10 text-center">
                {item.title}
              </Text>
              {item.description && (
                <Text className="text-center text-gray-500 mb-5">
                  {item.description}
                </Text>
              )}

              {item.options?.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => handleOptionPress(option.value)} // Set selected option on click
                  className={`${
                    selectedOption === option.value
                      ? "border-solid border-2 border-green-500"
                      : "bg-white"
                  } flex flex-row mb-5 items-center justify-between py-5 px-3 rounded-xl`}
                >
                  <Text>{option.label}</Text>
                </TouchableOpacity>
              ))}

              {item.fields?.map((field) => (
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
          ) : null
        )}
      </ScrollView>

      <View className="flex-row justify-center gap-5 w-40 mt-10">
        {/* Render Previous button except on the first step */}
        {!isFirstStep && <CustomButton title="Previous" onPress={goPrevStep} />}

        {/* Render Next or Submit button */}
        <CustomButton
          title={isLastStep ? "Submit" : "Next"}
          onPress={goNextStep}
        />
      </View>
    </SafeAreaView>
  );
};

export default DriverForm;
