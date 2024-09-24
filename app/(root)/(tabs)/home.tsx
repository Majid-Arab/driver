import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import * as Location from "expo-location";
import { icons, images } from "@/constants";
import { useLocationStore } from "@/store";
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import { Link, router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useFetch } from "@/lib/fetch";
import { Ride } from "@/types/type";

export default function Home() {
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const { user } = useUser();
  const { signOut } = useAuth();
  const { data: recentRides, loading } = useFetch<Ride[]>(
    `/(api)/ride/${user?.id}`
  );

  const [hadPermission, setHadPermission] = useState(false);

  const handleSingOut = () => {
    signOut();
    router.push("/(auth)/sign-in");
  };
  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);

    router.push("/(root)/find-ride");
  };

  useEffect(() => {
    const requestionPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        setHadPermission(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync();

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude!,
        longitude: location.coords.longitude!,
      });
      setUserLocation({
        // latitude: location.coords.latitude,
        // longitude: location.coords.longitude,
        latitude: 37.78825,
        longitude: -122.4324,
        address: `${address[0].name}, ${address[0].region}`,
      });
    };

    requestionPermission();
  }, []);
  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={recentRides?.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View>
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h40"
                  alt="No recent rides found"
                  resizeMode="contain"
                />
                <Text className="text-sm">No recent rides found</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex flex-row items-center justify-between my-5">
              <Text className="text-2xl font-JakartaExtraBold capitalize">
                Welcome{", "}
                {user?.firstName ||
                  user?.emailAddresses[0].emailAddress.split("@")[0]}
                👋
              </Text>
              <TouchableOpacity
                onPress={handleSingOut}
                className="flex justify-center items-center w-10 h-10 rounded-full bg-white"
              >
                <Image source={icons.out} className="w-4 h-4" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSingOut}
                className="flex justify-center items-center w-10 h-10 rounded-full bg-white"
              ></TouchableOpacity>
              <Link href={{ pathname: "/(auth)/driver-welcome" }} asChild>
                <Pressable>
                  <Image source={icons.selectedMarker} className="w-8 h-8" />
                </Pressable>
              </Link>
            </View>

            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            />
            <Link href={{ pathname: "/find-ride" }} asChild>
              <Pressable>
                <Text>Go to Find Ride</Text>
              </Pressable>
            </Link>

            <>
              <Text className="text-xl font-JakartaBold mt-5 mb-3 ">
                Your Current Location
              </Text>
              <View className="flex flex-row items-center bg-transparent h-[300px]">
                <Map />
              </View>
              <Text className="text-xl font-JakartaBold mt-5 mb-3 ">
                Recent Rides
              </Text>
            </>
          </>
        )}
      />
    </SafeAreaView>
  );
}
