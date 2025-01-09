import CustomButton from "@/components/CustomButton";
import DriverCard from "@/components/DriverCard";
import RideLayout from "@/components/RideLayout";
import { useFetch } from "@/lib/fetch";
import { useDriverStore } from "@/store";
import { Driver } from "@/types/type";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

const ConfirmRide = () => {
  const { selectedDriver, setSelectedDriver } = useDriverStore();
  const { data: drivers, loading } = useFetch<Driver[]>(`/(api)/driver`);

  if (loading) return <Text>Loading...</Text>;
  return (
    <RideLayout title="Confirm Ride" snapPoints={["65%", "85%"]}>
      <FlatList
        data={drivers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <DriverCard
            item={item}
            selected={selectedDriver === item.id}
            setSelected={() => setSelectedDriver(item.id)}
          />
        )}
        ListFooterComponent={() => (
          <View>
            <CustomButton
              title="Select Ride"
              onPress={() => router.push("/(root)/book-ride")}
            />
          </View>
        )}
      />
    </RideLayout>
  );
};

export default ConfirmRide;
