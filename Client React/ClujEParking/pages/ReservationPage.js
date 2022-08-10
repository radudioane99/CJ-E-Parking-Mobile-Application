import React, { useEffect, useState } from "react";
import { Box, NativeBaseProvider, VStack, ScrollView } from "native-base";
import { StyleSheet } from "react-native";
import LocationCard from "./LocationCard";
import { loadLocations } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";

function ReservationPage({ navigation }) {
  const { locations, hardwareNumberOfCars } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [numberOfLocations, setNumberOfLocations] = useState();

  useEffect(() => {
    setNumberOfLocations(locations.length);
  }, [locations]);

  useEffect(async () => {
    await dispatch(loadLocations());
  }, []);

  return (
    <NativeBaseProvider>
      <ScrollView>
        <VStack space={4} alignItems="center" style={styles.background}>
          {numberOfLocations != 0 && (
            <Box alignItems="center">
              {locations.map((location) => (
                <LocationCard
                  key={location.locationEntity.id}
                  data={{
                    Adress: location.locationEntity.adress,
                    Name: location.locationEntity.name,
                    NumberOfPlaces: location.locationEntity.numberOfPlaces,
                    Id: location.locationEntity.id,
                    FreeParkPlaces: location.freeParkPlaces,
                    HardwareCaluclatedParkingPlaces:
                      location.locationEntity.hardwareCalculatedNumberOfPlaces,
                    HardwareNumberOfCars: hardwareNumberOfCars,
                  }}
                />
              ))}
            </Box>
          )}
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  background: {
    paddingTop: "5%",
  },
  card: {
    borderColor: "#ff0000",
    borderRadius: 25,
  },
  text: {
    color: "#336888",
    fontSize: 15,
  },
  image: {
    width: "100%",
    height: 170,
  },
  upperBox: {
    justifyContent: "center",
    paddingLeft: "7%",
  },
  listElement: {
    borderColor: "#336888",
    borderWidth: 4,
  },
  editButton: {
    width: "55%",
    height: 60,
    backgroundColor: "#06B6D4",
  },
  deleteButton: {
    width: "55%",
    height: 60,
    backgroundColor: "#ef4444",
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  commandElement: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ReservationPage;
