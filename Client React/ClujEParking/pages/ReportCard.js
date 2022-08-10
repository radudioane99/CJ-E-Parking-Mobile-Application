import React, { useState } from "react";
import {
  Box,
  Image,
  Text,
  Stack,
  NativeBaseProvider,
  VStack,
  Center,
} from "native-base";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ReportCard({ data }) {
  function formatDate(date) {
    let dateObject = new Date(date);
    let dd = String(dateObject.getDate()).padStart(2, "0");
    let mm = String(dateObject.getMonth() + 1).padStart(2, "0");
    let yyyy = dateObject.getFullYear();
    return dd + "/" + mm + "/" + yyyy;
  }

  return (
    <NativeBaseProvider>
      <Box
        w="80"
        rounded="lg"
        overflow="hidden"
        borderColor="#336888"
        borderWidth="5"
      >
        <Box style={styles.upperBox}>
          <Image
            source={{ uri: "data:image/png;base64," + data.Image }}
            alt="Connection Error"
            style={styles.image}
            resizeMode={"stretch"}
          />
        </Box>
        <Stack>
          <VStack alignItems="center">
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
            <Box width={80} height={20}>
              <VStack style={styles.listElement} alignItems="center">
                <Center height={"50%"}>
                  <Text style={styles.titleText}>Date</Text>
                </Center>
                <Center height={"50%"}>
                  <Text style={styles.text}>
                    {formatDate(data?.ReportDate)}
                  </Text>
                </Center>
              </VStack>
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
    height: "100%",
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
  upperBox: {
    height: 220,
    width: 310,
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
