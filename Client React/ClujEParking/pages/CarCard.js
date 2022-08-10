import React from "react";
import {
  Box,
  Heading,
  Image,
  Text,
  HStack,
  Stack,
  NativeBaseProvider,
  VStack,
  Center,
  Button,
} from "native-base";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as httpUtils from "../utils/http-utils";
import { useSelector, useDispatch, batch } from "react-redux";
import { loadCars } from "../redux/actions";
import {
  setIsSuccessMessageVisible,
  setSuccessMessage,
} from "../redux/actions";

export default function CarCard({ data }) {
  const navigation = useNavigation();
  const { userData } = useSelector((state) => state);
  const dispatch = useDispatch();

  async function deleteButtonPressed() {
    const car = {
      Id: data?.Id,
      Name: data?.Name,
      RegistrationNumber: data?.RegistrationNumber,
      Manufacturer: data?.Manufacturer,
      Model: data?.Model,
      UserId: userData?.id,
    };
    try {
      const response = await httpUtils.deleteRequest(`Cars`, car);
      if (response.status === 200) {
        batch(() => {
          dispatch(loadCars(userData.id));
          dispatch(setIsSuccessMessageVisible(true));
          dispatch(setSuccessMessage("Car deleted successfully."));
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
        maxW="80"
        rounded="lg"
        overflow="hidden"
        borderColor="#336888"
        borderWidth="5"
      >
        <Box style={styles.upperBox}>
          <Image
            source={require("../assets/coloredCarPlaceholder.png")}
            alt="Connection Error"
            style={styles.image}
            resizeMode={"contain"}
          />
        </Box>
        <Stack py="2" space={2}>
          <VStack space={3} alignItems="center">
            <Heading>{data?.Name}</Heading>
            <Box width={80} height={20}>
              <VStack style={styles.listElement} alignItems="center">
                <Center height={"50%"}>
                  <Text style={styles.titleText}>Registration Number</Text>
                </Center>
                <Center height={"50%"}>
                  <Text style={styles.text}>{data?.RegistrationNumber}</Text>
                </Center>
              </VStack>
            </Box>
            <Box width={80} height={20}>
              <VStack style={styles.listElement} alignItems="center">
                <Center height={"50%"}>
                  <Text style={styles.titleText}>Manufacturer</Text>
                </Center>
                <Center height={"50%"}>
                  <Text style={styles.text}>{data?.Manufacturer}</Text>
                </Center>
              </VStack>
            </Box>
            <Box width={80} height={20}>
              <VStack style={styles.listElement} alignItems="center">
                <Center height={"50%"}>
                  <Text style={styles.titleText}>Model</Text>
                </Center>
                <Center height={"50%"}>
                  <Text style={styles.text}>{data?.Model}</Text>
                </Center>
              </VStack>
            </Box>
            <Box style={styles.commandElement} width={80} height={20}>
              <HStack alignItems="center">
                <Center width={"50%"}>
                  <Button
                    variant="solid"
                    style={styles.editButton}
                    rounded={15}
                    onPress={() =>
                      navigation.navigate("CarForm", { carData: { data } })
                    }
                  >
                    <Text style={styles.buttonText}>Edit</Text>
                  </Button>
                </Center>
                <Center width={"50%"}>
                  <Button
                    variant="solid"
                    style={styles.deleteButton}
                    rounded={15}
                    onPress={deleteButtonPressed}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
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
