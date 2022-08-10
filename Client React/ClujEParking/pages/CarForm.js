import React, { useEffect, useState } from "react";
import {
  Input,
  Text,
  Stack,
  Button,
  FormControl,
  NativeBaseProvider,
  Box,
  KeyboardAvoidingView,
  ScrollView,
} from "native-base";
import { StyleSheet } from "react-native";
import * as httpUtils from "../utils/http-utils";
import { useDispatch, useSelector } from "react-redux";
import { setIsAlertVisible, setAlertText, loadCars } from "../redux/actions";
import Alert from "./Alert";
import SuccessMessage from "./SuccessMessage";
import { useNavigation } from "@react-navigation/native";

function CarForm({ route }) {
  const { carData } = route.params;
  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state);

  const navigation = useNavigation();

  useEffect(() => {
    if (carData) {
      setManufacturer(carData?.data?.Manufacturer);
      setModel(carData?.data?.Model);
      setName(carData?.data?.Name);
      setRegistrationNumber(carData?.data?.RegistrationNumber);
    }
  }, []);

  async function submitButtonPressed() {
    if (
      name.trim() !== "" &&
      manufacturer.trim() !== "" &&
      model.trim() !== "" &&
      registrationNumber.trim() !== ""
    ) {
      const car = {
        Id: carData ? carData?.data?.Id : 0,
        Name: name,
        RegistrationNumber: registrationNumber,
        Manufacturer: manufacturer,
        Model: model,
        UserId: userData?.id,
      };

      if (carData?.data) {
        try {
          const { status, data } = await httpUtils.putRequest(`Cars`, car);
          await dispatch(loadCars(userData?.id));
          navigation.navigate("CarManagementPage");
        } catch (error) {
          dispatch(setIsAlertVisible(true));
          dispatch(setAlertText(error.data));
        }
      } else {
        try {
          const { status, data } = await httpUtils.postRequest(`Cars`, car);
          await dispatch(loadCars(userData?.id));
          navigation.navigate("CarManagementPage");
        } catch (error) {
          dispatch(setIsAlertVisible(true));
          dispatch(setAlertText(error.data));
        }
      }
    } else {
      dispatch(setIsAlertVisible(true));
      dispatch(setAlertText("Please fill in all the required data!"));
    }
  }
  return (
    <NativeBaseProvider>
      <ScrollView>
        <SuccessMessage />
        <Alert />
        <KeyboardAvoidingView>
          <Box style={styles.loginPanel}>
            <FormControl isRequired>
              <Stack style={styles.element} mx="4">
                <FormControl.Label>
                  <Text fontSize="lg">Name</Text>
                </FormControl.Label>
                <Input
                  fontSize="md"
                  shadow={1}
                  placeholder="Name..."
                  onChangeText={(name) => setName(name)}
                  defaultValue={carData ? carData?.data?.Name : ""}
                />
                <FormControl.HelperText>
                  <Text fontSize="sm">
                    Choose a name easy to identify in case of registering
                    multiple cars.
                  </Text>
                </FormControl.HelperText>
              </Stack>
            </FormControl>
            <FormControl isRequired>
              <Stack style={styles.element} mx="4">
                <FormControl.Label>
                  <Text fontSize="lg">Registration Number</Text>
                </FormControl.Label>
                <Input
                  fontSize="md"
                  shadow={1}
                  placeholder="Registration Number..."
                  onChangeText={(registrationNumber) =>
                    setRegistrationNumber(registrationNumber)
                  }
                  defaultValue={
                    carData ? carData?.data?.RegistrationNumber : ""
                  }
                  autoCapitalize="characters"
                  maxLength={7}
                />
              </Stack>
            </FormControl>

            <FormControl isRequired>
              <Stack style={styles.element} mx="4">
                <FormControl.Label>
                  <Text fontSize="lg">Manufacturer</Text>
                </FormControl.Label>
                <Input
                  fontSize="md"
                  shadow={1}
                  placeholder="Manufacturer..."
                  onChangeText={(manufacturer) => setManufacturer(manufacturer)}
                  defaultValue={carData ? carData?.data?.Manufacturer : ""}
                />
              </Stack>
            </FormControl>
            <FormControl isRequired>
              <Stack style={styles.password} mx="4">
                <FormControl.Label>
                  <Text fontSize="lg">Model</Text>
                </FormControl.Label>
                <Input
                  fontSize="md"
                  shadow={1}
                  placeholder="Model..."
                  onChangeText={(model) => setModel(model)}
                  defaultValue={carData ? carData?.data?.Model : ""}
                />
              </Stack>
            </FormControl>
          </Box>
          <Box style={styles.secondHalf}>
            <Button
              variant="solid"
              style={styles.button}
              rounded={25}
              onPress={submitButtonPressed}
            >
              <Text style={styles.text}>
                {carData.data ? "Edit Car" : "Add Car"}
              </Text>
            </Button>
          </Box>
        </KeyboardAvoidingView>
      </ScrollView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  loginPanel: {
    paddingTop: "2%",
    alignContent: "space-between",
    paddingBottom: 50,
  },
  secondHalf: {
    height: "100%",
  },
  element: {
    paddingBottom: 20,
  },
  text: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    width: "70%",
    height: 60,
    alignSelf: "center",
  },
});

export default CarForm;
