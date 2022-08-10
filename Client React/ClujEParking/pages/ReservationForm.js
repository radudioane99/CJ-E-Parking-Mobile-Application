import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Text, TouchableOpacity } from "react-native";
import {
  VStack,
  Center,
  NativeBaseProvider,
  Box,
  Select,
  HStack,
  Input,
  ScrollView,
} from "native-base";
import {
  setIsAlertVisible,
  setAlertText,
  setIsSuccessMessageVisible,
  setSuccessMessage,
  loadReservations,
} from "../redux/actions";
import * as httpUtils from "../utils/http-utils";
import { useSelector, batch } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

function ReservationForm({ route }) {
  const navigation = useNavigation();
  const { locationData } = route.params;
  const { carData } = useSelector((state) => state);
  const { userData } = useSelector((state) => state);
  const [selectedCar, setSelectedCar] = useState([]);
  const [displayStartDateModal, setDisplayStartDateModal] = useState(false);
  const [displayEndDateModal, setDisplayEndDateModal] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");
  const dispatch = useDispatch();
  const changeStartDate = (event, date) => {
    setDisplayStartDateModal(false);
    if (date) {
      setSelectedStartDate(date);
    }
  };

  const changeEndDate = (event, date) => {
    setDisplayEndDateModal(false);
    if (date) {
      setSelectedEndDate(date);
    }
  };

  const openStartDateModal = () => {
    setDisplayStartDateModal(true);
  };

  const openEndDateModal = () => {
    setDisplayEndDateModal(true);
  };

  async function submitButtonPressed() {
    if (selectedCar === 0 || selectedCar.length === 0 || userData.id === 0) {
      dispatch(setIsAlertVisible(true));
      dispatch(setAlertText("Please fill in all the required data!"));
      return;
    }

    let numericStartHour = parseInt(startHour, 10);
    if (isNaN(numericStartHour)) {
      dispatch(setIsAlertVisible(true));
      dispatch(setAlertText("Start hour is not valid!"));
      return;
    }

    let numericEndHour = parseInt(endHour, 10);
    if (isNaN(numericEndHour)) {
      dispatch(setIsAlertVisible(true));
      dispatch(setAlertText("End hour is not valid!"));
      return;
    }

    if (numericStartHour < 0 || numericStartHour > 23) {
      dispatch(setIsAlertVisible(true));
      dispatch(setAlertText("Start hour is not valid!"));
      return;
    }

    if (numericEndHour < 0 || numericEndHour > 23) {
      dispatch(setIsAlertVisible(true));
      dispatch(setAlertText("End hour is not valid!"));
      return;
    }

    if (selectedStartDate > selectedEndDate) {
      dispatch(setIsAlertVisible(true));
      dispatch(setAlertText("Start date is greater than end date!"));
      return;
    }
    const reservation = {
      Id: 0,
      UserId: userData.id,
      CarId: selectedCar,
      StartDate: selectedStartDate,
      EndDate: selectedEndDate,
      LocationId: locationData.data.Id,
      StartHour: numericStartHour,
      EndHour: numericEndHour,
    };
    try {
      const response = await httpUtils.postRequest(
        `Reservations/addReservation`,
        reservation
      );

      if (response.status === 200) {
        batch(() => {
          dispatch(setIsSuccessMessageVisible(true));
          dispatch(setSuccessMessage("Reservation added successfully!"));
          dispatch(loadReservations(userData.id));
        });

        navigation.navigate("ReservationPage");
      }
    } catch (error) {
      dispatch(setIsAlertVisible(true));
      dispatch(setAlertText(error?.data));
    }
  }

  return (
    <NativeBaseProvider>
      <ScrollView>
        <SafeAreaView>
          <VStack py={7} style={styles.container}>
            <Box w="3/4" maxW="300">
              <Select
                selectedValue={selectedCar}
                minWidth="200"
                accessibilityLabel="Choose Car"
                placeholder="Choose Car"
                _selectedItem={{
                  bg: "teal.600",
                }}
                mt={1}
                onValueChange={(itemValue) => setSelectedCar(itemValue)}
                style={styles.select}
              >
                {carData.map((car) => (
                  <Select.Item
                    label={
                      car.name +
                      "   " +
                      car.registrationNumber +
                      "   " +
                      car.manufacturer +
                      "   " +
                      car.model
                    }
                    value={car.id}
                    key={car.id}
                  />
                ))}
              </Select>
              {""}
              <TouchableOpacity
                style={styles.dateButton}
                onPress={openStartDateModal}
              >
                <Text style={styles.textStyle}>Add start date</Text>
              </TouchableOpacity>
              <HStack space={2} py={4}>
                <Input
                  fontSize="md"
                  shadow={1}
                  width={220}
                  value={selectedStartDate.toDateString()}
                  editable={true}
                  textAlign="center"
                />
                <Input
                  fontSize="md"
                  shadow={1}
                  width={70}
                  value={startHour}
                  keyboardType="numeric"
                  editable={true}
                  textAlign="center"
                  placeholder="Hour"
                  onChangeText={(startHour) => setStartHour(startHour)}
                />
              </HStack>
              {displayStartDateModal && (
                <DateTimePicker
                  value={selectedStartDate}
                  display={"default"}
                  onChange={(event, date) => changeStartDate(event, date)}
                  is24Hour={true}
                  dateFormat="longdate"
                />
              )}
              <TouchableOpacity
                style={styles.dateButton}
                onPress={openEndDateModal}
              >
                <Text style={styles.textStyle}>Add end date</Text>
              </TouchableOpacity>

              <HStack space={2} py={4}>
                <Input
                  fontSize="md"
                  shadow={1}
                  width={220}
                  value={selectedEndDate.toDateString()}
                  editable={true}
                  textAlign="center"
                />
                <Input
                  fontSize="md"
                  shadow={1}
                  width={70}
                  value={endHour}
                  keyboardType="numeric"
                  editable={true}
                  textAlign="center"
                  placeholder="Hour"
                  onChangeText={(endHour) => setEndHour(endHour)}
                />
                {displayEndDateModal && (
                  <DateTimePicker
                    value={selectedEndDate}
                    display={"default"}
                    onChange={(event, date) => changeEndDate(event, date)}
                    is24Hour={true}
                    dateFormat="longdate"
                  />
                )}
              </HStack>
            </Box>
          </VStack>
          <Center>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={submitButtonPressed}
            >
              <Text style={styles.textStyle}>Submit</Text>
            </TouchableOpacity>
          </Center>
        </SafeAreaView>
      </ScrollView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  textStyle: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  dateButton: {
    width: 300,
    borderRadius: 4,
    backgroundColor: "#06B6D4",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  submitButton: {
    width: 350,
    borderRadius: 4,
    backgroundColor: "#06B6D4",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
});

export default ReservationForm;
