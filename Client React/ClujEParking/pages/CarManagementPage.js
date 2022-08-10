import React, { useEffect, useState } from "react";
import {
  Box,
  NativeBaseProvider,
  VStack,
  ScrollView,
  Fab,
  Icon,
} from "native-base";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CarCard from "./CarCard";
import { useSelector } from "react-redux";

export default function CarManagementPage({ navigation }) {
  const { carData } = useSelector((state) => state);
  const [numberOfcars, setNumberOfcars] = useState();

  useEffect(() => {
    setNumberOfcars(carData.length);
  }, [carData]);

  return (
    <NativeBaseProvider>
      <ScrollView>
        <VStack space={4} alignItems="center" style={styles.background}>
          {numberOfcars != 0 && (
            <Box alignItems="center">
              {carData.map((car) => (
                <CarCard
                  key={car.id}
                  data={{
                    Id: car.id,
                    Name: car.name,
                    RegistrationNumber: car.registrationNumber,
                    Manufacturer: car.manufacturer,
                    Model: car.model,
                  }}
                />
              ))}
            </Box>
          )}

          <Fab
            label="Add car"
            shadow={2}
            size="lg"
            icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
            onPress={() => navigation.navigate("CarForm", { carData: {} })}
            placement={"top-right"}
          />
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
