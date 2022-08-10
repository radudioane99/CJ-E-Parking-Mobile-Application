import React from "react";
import {
  Box,
  Heading,
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

export default function LocationCard({ data }) {
  const navigation = useNavigation();
  return (
    <NativeBaseProvider>
      <Box
        maxW="80"
        rounded="lg"
        overflow="hidden"
        borderColor="#336888"
        borderWidth="5"
      >
        <Stack py="2" space={2}>
          <VStack space={2} alignItems="center">
            <Box style={styles.upperBox}>
              <Heading style={styles.title}>{data?.Name}</Heading>
            </Box>
            <Box width={80} height={20}>
              <HStack style={styles.listElement}>
                <Box style={styles.description}>
                  <Text style={styles.text}>Total park places</Text>
                </Box>
                <Box style={styles.totalPlaces}>
                  <Text style={styles.visualDescriptionText}>
                    {data?.NumberOfPlaces}
                  </Text>
                </Box>
              </HStack>
            </Box>
            {!data?.HardwareCaluclatedParkingPlaces && (
              <Box width={80} height={20}>
                <HStack style={styles.listElement}>
                  <Box style={styles.description}>
                    <Text style={styles.text}>Free park places</Text>
                  </Box>
                  <Box
                    style={
                      data?.FreeParkPlaces >= 100
                        ? styles.visualDescriptionTextMoreSpace
                        : data?.FreeParkPlaces > 5 && data?.FreeParkPlaces < 100
                        ? styles.visualDescriptionTextLessSpace
                        : styles.visualDescriptionTextNoSpace
                    }
                  >
                    <Text style={styles.visualDescriptionText}>
                      {data?.FreeParkPlaces}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            )}
            {data?.HardwareCaluclatedParkingPlaces && (
              <Box width={80} height={20}>
                <HStack style={styles.listElement}>
                  <Box style={styles.description}>
                    <Text style={styles.text}>Free park places</Text>
                  </Box>
                  <Box
                    style={
                      data?.HardwareNumberOfCars >= 100
                        ? styles.visualDescriptionTextMoreSpace
                        : data?.HardwareNumberOfCars > 5 &&
                          data?.HardwareNumberOfCars < 100
                        ? styles.visualDescriptionTextLessSpace
                        : styles.visualDescriptionTextNoSpace
                    }
                  >
                    <Text style={styles.visualDescriptionText}>
                      {data?.HardwareNumberOfCars
                        ? data?.HardwareNumberOfCars
                        : data?.HardwareCaluclatedParkingPlaces}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            )}
            <Box alignItems={"center"} justifyContent={"center"}>
              <Text style={styles.text}>{data?.Adress}</Text>
            </Box>
            <Box style={styles.commandElement} width={80} height={20}>
              <HStack alignItems="center">
                <Center>
                  <Button
                    variant="solid"
                    style={styles.reserveButton}
                    rounded={15}
                    onPress={() =>
                      navigation.navigate("ReservationForm", {
                        locationData: { data },
                      })
                    }
                  >
                    <Text style={styles.buttonText}>Reserve</Text>
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
    fontSize: 18,
  },

  upperBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  listElement: {
    borderColor: "#336888",
    borderWidth: 4,
  },
  reserveButton: {
    width: 100,
    height: 60,
    backgroundColor: "#06B6D4",
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
  description: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    height: 50,
  },
  visualDescriptionTextMoreSpace: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    height: 50,
    backgroundColor: "#34c754",
  },
  visualDescriptionTextLessSpace: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    height: 50,
    backgroundColor: "#d9e000",
  },
  visualDescriptionTextNoSpace: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    height: 50,
    backgroundColor: "#f78f86",
  },
  totalPlaces: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    height: 50,
    backgroundColor: "#06B6D4",
  },
  visualDescriptionText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    color: "#336888",
    fontSize: 24,
  },
});
