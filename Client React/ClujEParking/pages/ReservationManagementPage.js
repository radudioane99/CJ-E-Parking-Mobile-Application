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
import { useSelector } from "react-redux";
import ReservarionCard from "./ReservationCard";

export default function ReservationManagementPage({ navigation }) {
  const { reservationsData } = useSelector((state) => state);
  const [numberOfReservations, setNumberOfReservations] = useState();

  useEffect(() => {
    setNumberOfReservations(reservationsData.length);
  }, [reservationsData]);

  return (
    <NativeBaseProvider>
      <ScrollView>
        <VStack space={4} alignItems="center" style={styles.background}>
          {numberOfReservations != 0 && (
            <Box alignItems="center">
              {reservationsData.map((reservation) => (
                <ReservarionCard
                  key={reservation.id}
                  data={{
                    Id: reservation.id,
                    StartDate: reservation.startDate,
                    EndDate: reservation.endDate,
                    LocationId: reservation.locationId,
                    LocationName: reservation.location.name,
                    LocationAdress: reservation.location.adress,
                    CarName: reservation.car.name,
                  }}
                />
              ))}
            </Box>
          )}

          <Fab
            label="Add reservation"
            shadow={2}
            size="lg"
            icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
            onPress={() => navigation.navigate("ReservationPage")}
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
