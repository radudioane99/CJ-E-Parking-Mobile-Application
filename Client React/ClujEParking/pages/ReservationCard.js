import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  HStack,
  Stack,
  NativeBaseProvider,
  VStack,
  Pressable,
  ScrollView,
  Fab,
  Center,
  Icon,
  Button,
} from "native-base";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as httpUtils from "../utils/http-utils";
import { useSelector, useDispatch, batch } from "react-redux";
import {
  setIsSuccessMessageVisible,
  setSuccessMessage,
  loadReservations,
  setIsAlertVisible,
  setAlertText,
} from "../redux/actions";

export default function ReservarionCard({ data }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state);

  function formatDate(date) {
    let dateObject = new Date(date);
    let dd = String(dateObject.getDate()).padStart(2, "0");
    let mm = String(dateObject.getMonth() + 1).padStart(2, "0");
    let yyyy = dateObject.getFullYear();
    return dd + "/" + mm + "/" + yyyy;
  }

  async function cancelButtonPressed() {
    try {
      const response = await httpUtils.deleteRequest(
        `Reservations/cancelReservation/${data.Id}`
      );
      if (response.status === 200) {
        batch(() => {
          dispatch(loadReservations(userData.id));
          dispatch(setIsSuccessMessageVisible(true));
          dispatch(setSuccessMessage("Reservation cancelled successfully."));
        });
      }
    } catch (error) {
      dispatch(setIsAlertVisible(true));
      dispatch(setAlertText(error.data));
    }
  }

  return (
    <NativeBaseProvider>
      <Box
        width="80"
        rounded="lg"
        overflow="hidden"
        borderColor="#336888"
        borderWidth="5"
      >
        <Box style={styles.upperBox}>
          <Image
            source={require("../assets/appointment.png")}
            alt="Connection Error"
            style={styles.image}
            resizeMode={"contain"}
          />
        </Box>
        <Stack py="2">
          <VStack space={3} alignItems="center">
            <Box width={80} height={20}>
              <VStack style={styles.listElement} alignItems="center">
                <Center height={"50%"}>
                  <Text style={styles.titleText}>Start Date</Text>
                </Center>
                <Center height={"50%"}>
                  <Text style={styles.text}>{formatDate(data?.StartDate)}</Text>
                </Center>
              </VStack>
            </Box>
            <Box width={80} height={20}>
              <VStack style={styles.listElement} alignItems="center">
                <Center height={"50%"}>
                  <Text style={styles.titleText}>End Date</Text>
                </Center>
                <Center height={"50%"}>
                  <Text style={styles.text}>{formatDate(data?.EndDate)}</Text>
                </Center>
              </VStack>
            </Box>
            <Box width={80} height={20}>
              <VStack style={styles.listElement} alignItems="center">
                <Center height={"50%"}>
                  <Text style={styles.titleText}>Car</Text>
                </Center>
                <Center height={"50%"}>
                  <Text style={styles.text}>{data?.CarName}</Text>
                </Center>
              </VStack>
            </Box>
            <Box width={80} height={20}>
              <VStack style={styles.listElement} alignItems="center">
                <Center height={"50%"}>
                  <Text style={styles.titleText}>Location Name</Text>
                </Center>
                <Center height={"50%"}>
                  <Text style={styles.text}>{data?.LocationName}</Text>
                </Center>
              </VStack>
            </Box>
            <Box width={80} height={20}>
              <VStack style={styles.listElement} alignItems="center">
                <Center height={"50%"}>
                  <Text style={styles.titleText}>Location Adress</Text>
                </Center>
                <Center height={"50%"}>
                  <Text style={styles.text}>{data?.LocationAdress}</Text>
                </Center>
              </VStack>
            </Box>
            <Box style={styles.commandElement} width={80} height={20}>
              <HStack alignItems="center">
                <Center width={"50%"}>
                  <Button
                    variant="solid"
                    style={styles.cancelButton}
                    rounded={15}
                    onPress={cancelButtonPressed}
                  >
                    <Text style={styles.buttonText}>Cancel Reservation</Text>
                  </Button>
                </Center>
              </HStack>
            </Box>
          </VStack>
        </Stack>
      </Box>
      <Stack height={6}></Stack>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#336888",
    fontSize: 15,
  },
  titleText: {
    color: "#336888",
    fontSize: 15,
    fontWeight: "bold",
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
  cancelButton: {
    width: 200,
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
