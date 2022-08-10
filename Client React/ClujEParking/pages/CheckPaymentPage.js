import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  Input,
  Text,
  Stack,
  Button,
  Image,
  NativeBaseProvider,
  Box,
  ScrollView,
  HStack,
  Select,
  VStack,
} from "native-base";
import { setIsAlertVisible, setAlertText } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import * as httpUtils from "../utils/http-utils";
import { useNavigation } from "@react-navigation/native";

function CheckPaymentPage({ route }) {
  const number = route.params.number;
  const { locations } = useSelector((state) => state);
  const [location, setLocation] = useState([]);
  const [validReservation, setValidReservation] = useState(0);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state);

  useEffect(() => {
    setValidReservation(0);
  }, []);

  async function submitButtonPressed() {
    if (number.length < 7) {
      dispatch(setIsAlertVisible(true));
      dispatch(
        setAlertText(
          "Please make sure that the number is in corect format , example: AA 01 AAA!"
        )
      );
      return;
    }

    if (location.length === 0) {
      dispatch(setIsAlertVisible(true));
      dispatch(setAlertText("Please fill in all the required data!"));
      return;
    }

    try {
      const response = await httpUtils.getRequest(
        `Reservations/HasUserReservation/${number}/${location}`
      );

      if (response.status === 200) {
        if (response.data === false) {
          setValidReservation(2);
        } else {
          setValidReservation(1);
        }
      }
    } catch (error) {
      dispatch(setIsAlertVisible(true));
      dispatch(setAlertText(error?.data));
    }
  }

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Image
          resizeMode={"stretch"}
          source={require("../assets/LogoName.png")}
          alt="Connection Error"
          style={styles.image}
        />
        <Box style={styles.container}>
          <Select
            selectedValue={location}
            minWidth="200"
            accessibilityLabel="Choose location to check"
            placeholder="Choose location"
            _selectedItem={{
              bg: "teal.600",
            }}
            mt={1}
            onValueChange={(itemValue) => setLocation(itemValue)}
            style={styles.select}
          >
            {locations.map((location) => (
              <Select.Item
                label={
                  location.locationEntity.name +
                  "   " +
                  location.locationEntity.adress
                }
                value={location.locationEntity.id}
                key={location.locationEntity.id}
              />
            ))}
          </Select>
          {""}
          <VStack width={80} py={3}>
            <HStack space={3} px={10}>
              <Input
                fontSize="md"
                shadow={1}
                placeholder="HD"
                width={70}
                style={styles.result}
                autoCapitalize="characters"
                maxLength={2}
                defaultValue={number?.slice(0, 2) ? number?.slice(0, 2) : ""}
                editable={false}
                onChangeText={(text) => setFirstNumberPart(text)}
              />
              <Input
                fontSize="md"
                shadow={1}
                placeholder="99"
                width={70}
                style={styles.result}
                maxLength={3}
                defaultValue={number?.slice(2, 4) ? number?.slice(2, 4) : ""}
                editable={false}
                onChangeText={(text) => setSecondNumberPart(text)}
              />
              <Input
                fontSize="md"
                shadow={1}
                placeholder="EXE"
                width={70}
                style={styles.result}
                autoCapitalize="characters"
                maxLength={3}
                defaultValue={number?.slice(4, 7) ? number?.slice(4, 7) : ""}
                editable={false}
                onChangeText={(text) => setThirdNumberPart(text)}
              />
            </HStack>
          </VStack>
          <Button
            variant="solid"
            style={styles.button}
            rounded={25}
            onPress={submitButtonPressed}
          >
            <Text style={styles.text}>Check payment</Text>
          </Button>
          <Box>
            {validReservation === 1 && (
              <Text style={styles.okText}>
                The user has an active reservation.
              </Text>
            )}
            {validReservation === 2 && (
              <VStack py={3}>
                <Text style={styles.errorText}>
                  The user is parked illegally please attach a picture for proof
                  and proceed to report button.
                </Text>
                <Stack h={10}></Stack>
                <Button
                  variant="solid"
                  style={
                    userData.hasTheRightToSubmitReports === true
                      ? styles.reportButton
                      : styles.reportButtonDisabled
                  }
                  rounded={25}
                  onPress={() =>
                    navigation.navigate("ReportPage", {
                      reportData: {
                        locationId: location,
                        userId: userData.id,
                        number: number,
                      },
                    })
                  }
                  disabled={!userData.hasTheRightToSubmitReports}
                >
                  <Text style={styles.text}>Report</Text>
                </Button>
                {!userData.hasTheRightToSubmitReports && (
                  <Text style={styles.warningText}>
                    Unfortunately, you do not have the right to submit reports.
                    Please contact the local police or authorized users.
                  </Text>
                )}
              </VStack>
            )}
          </Box>
        </Box>
      </ScrollView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  loginPanel: {
    paddingTop: "10%",
    alignContent: "space-around",
    paddingBottom: 50,
  },
  secondHalf: {
    height: "100%",
  },
  passwords: {
    paddingTop: 20,
  },
  image: {
    width: "100%",
  },
  text: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  errorText: {
    color: "#ef4444",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 20,
  },
  warningText: {
    color: "#fb923c",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 20,
  },
  okText: {
    color: "#22c55e",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 20,
  },
  button: {
    width: "70%",
    height: 60,
    alignSelf: "center",
  },
  reportButton: {
    height: 60,
    alignSelf: "center",
    width: "80%",
  },
  reportButtonDisabled: {
    height: 60,
    alignSelf: "center",
    width: "80%",
    backgroundColor: "#737373",
  },
  forgotPasswordLink: {
    paddingTop: 40,
    alignSelf: "flex-end",
    paddingRight: 25,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CheckPaymentPage;
