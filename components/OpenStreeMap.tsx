import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { UrlTile, Marker } from "react-native-maps";

const OpenStreetMapMap: React.FC = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.7749, // Initial latitude
          longitude: -122.4194, // Initial longitude
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Use OpenStreetMap tiles */}
        <UrlTile
          urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19} // Maximum zoom level for OSM tiles
        />

        {/* Example Marker */}
        <Marker
          coordinate={{
            latitude: 37.7749,
            longitude: -122.4194,
          }}
          title="San Francisco"
          description="This is a marker in San Francisco"
        />
      </MapView>
    </View>
  );
};

export default OpenStreetMapMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
