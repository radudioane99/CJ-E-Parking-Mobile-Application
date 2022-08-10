import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Image,
  Text,
  HStack,
  Stack,
  NativeBaseProvider,
  VStack,
  Pressable,
  ScrollView,
} from "native-base";
import { StyleSheet } from "react-native";
import { useSelector, useDispatch, batch } from "react-redux";
import {
  setSuccessMessage,
  setIsSuccessMessageVisible,
  setHasUserSignUp,
} from "../redux/actions";

function Dashboard({ navigation }) {
  const { hasUserSignUp } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (hasUserSignUp) {
      batch(() => {
        dispatch(setSuccessMessage("New user was created successfully!"));
        dispatch(setIsSuccessMessageVisible(true));
        dispatch(setHasUserSignUp(false));
      });
    }
  }, []);
  return (
    <NativeBaseProvider>
      <ScrollView>
        <VStack space={4} alignItems="center" style={styles.background}>
          <Box alignItems="center">
            <Pressable onPress={() => navigation.navigate("ImagePage")}>
              <Box
                width="80"
                rounded="lg"
                overflow="hidden"
                borderColor="#336888"
                borderWidth="2"
              >
                <Box style={styles.upperBox}>
                  <Image
                    source={require("../assets/carCheck.png")}
                    alt="Connection Error"
                    style={styles.image}
                    resizeMode={"contain"}
                  />
                </Box>
                <Stack p="4" space={3}>
                  <Stack space={2}>
                    <Heading size="md" ml="-1" style={styles.text}>
                      Check parked vehicle payment
                    </Heading>
                  </Stack>
                  <Text fontWeight="400" style={styles.text}>
                    Check the parked car by photographing the registration
                    number.
                  </Text>
                  <HStack
                    alignItems="center"
                    space={4}
                    justifyContent="space-between"
                  >
                    <HStack alignItems="center">
                      <Text style={styles.text} fontWeight="400">
                        Send a photo and check for car payment.
                      </Text>
                    </HStack>
                  </HStack>
                </Stack>
              </Box>
            </Pressable>
          </Box>

          <Box alignItems="center">
            <Pressable onPress={() => navigation.navigate("CarManagementPage")}>
              <Box
                width="80"
                rounded="lg"
                overflow="hidden"
                borderColor="#336888"
                borderWidth="2"
              >
                <Box style={styles.upperBox}>
                  <Image
                    source={require("../assets/newCar.png")}
                    alt="Connection Error"
                    style={styles.image}
                    resizeMode={"contain"}
                  />
                </Box>
                <Stack p="4" space={3}>
                  <Stack space={2}>
                    <Heading size="md" ml="-1" style={styles.text}>
                      Add your own car in the system
                    </Heading>
                  </Stack>
                  <Text fontWeight="400" style={styles.text}>
                    In order to reserve parking spaces please add the cars you
                    posses here.
                  </Text>
                  <HStack
                    alignItems="center"
                    space={4}
                    justifyContent="space-between"
                  >
                    <HStack alignItems="center">
                      <Text style={styles.text} fontWeight="400">
                        Only registration number and few details about the car
                        are required.
                      </Text>
                    </HStack>
                  </HStack>
                </Stack>
              </Box>
            </Pressable>
          </Box>

          <Box alignItems="center">
            <Pressable onPress={() => navigation.navigate("ReservationPage")}>
              <Box
                width="80"
                rounded="lg"
                overflow="hidden"
                borderColor="#336888"
                borderWidth="2"
              >
                <Box style={styles.upperBoxReservation}>
                  <Image
                    source={require("../assets/res_colored_fixed.png")}
                    alt="Connection Error"
                    style={styles.image}
                    resizeMode={"contain"}
                  />
                </Box>
                <Stack p="4" space={3}>
                  <Stack space={2}>
                    <Heading size="md" ml="-1" style={styles.text}>
                      Check car parks status and reserve
                    </Heading>
                  </Stack>
                  <Text fontWeight="400" style={styles.text}>
                    Check the current status of parking lots and make a
                    reservation. Be sure to stick to the schedule.
                  </Text>
                  <HStack
                    alignItems="center"
                    space={4}
                    justifyContent="space-between"
                  >
                    <HStack alignItems="center">
                      <Text style={styles.text} fontWeight="400">
                        If not honored the resrevation will be cancelled after
                        20 minutes.
                      </Text>
                    </HStack>
                  </HStack>
                </Stack>
              </Box>
            </Pressable>
          </Box>

          <Box alignItems="center">
            <Pressable onPress={() => navigation.navigate("Profile")}>
              <Box
                width="80"
                rounded="lg"
                overflow="hidden"
                borderColor="#336888"
                borderWidth="2"
                pt={2}
              >
                <Box style={styles.upperBoxReservation}>
                  <Image
                    source={require("../assets/profile_colored.png")}
                    alt="Connection Error"
                    style={styles.image}
                    resizeMode={"contain"}
                  />
                </Box>
                <Stack p="4" space={3}>
                  <Stack space={2}>
                    <Heading size="md" ml="-1" style={styles.profileTitle}>
                      Your profile
                    </Heading>
                  </Stack>
                  <Text fontWeight="400" style={styles.text}>
                    Edit profile information. Keeping the data up to date is
                    recommanded.
                  </Text>
                  <HStack
                    alignItems="center"
                    space={4}
                    justifyContent="space-between"
                  ></HStack>
                </Stack>
              </Box>
            </Pressable>
          </Box>
          <Box alignItems="center">
            <Pressable
              onPress={() => navigation.navigate("ReservationManagementPage")}
            >
              <Box
                width="80"
                rounded="lg"
                overflow="hidden"
                borderColor="#336888"
                borderWidth="2"
                pt={2}
              >
                <Box style={styles.upperBoxReservation}>
                  <Image
                    source={require("../assets/reservation.png")}
                    alt="Connection Error"
                    style={styles.image}
                    resizeMode={"contain"}
                  />
                </Box>
                <Stack p="4" space={3}>
                  <Stack space={2}>
                    <Heading size="md" ml="-1" style={styles.profileTitle}>
                      Your reservations
                    </Heading>
                  </Stack>
                  <Text fontWeight="400" style={styles.text}>
                    Check and manage your current reservations.If the
                    reservation is no longer needed please cancel it ass soon as
                    possible.
                  </Text>
                  <HStack
                    alignItems="center"
                    space={4}
                    justifyContent="space-between"
                  ></HStack>
                </Stack>
              </Box>
            </Pressable>
          </Box>
          <Box alignItems="center">
            <Pressable onPress={() => navigation.navigate("YourReportsPage")}>
              <Box
                width="80"
                rounded="lg"
                overflow="hidden"
                borderColor="#336888"
                borderWidth="2"
                pt={2}
              >
                <Box style={styles.upperBoxReservation}>
                  <Image
                    source={require("../assets/police_image.png")}
                    alt="Connection Error"
                    style={styles.image}
                    resizeMode={"contain"}
                  />
                </Box>
                <Stack p="4" space={3}>
                  <Stack space={2}>
                    <Heading size="md" ml="-1" style={styles.profileTitle}>
                      Your reports
                    </Heading>
                  </Stack>
                  <Text fontWeight="400" style={styles.text}>
                    Check for possible fines, complaints regarding your cars.
                  </Text>
                  <HStack
                    alignItems="center"
                    space={4}
                    justifyContent="space-between"
                  ></HStack>
                </Stack>
              </Box>
            </Pressable>
          </Box>
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#ffffff",
    paddingTop: "5%",
  },
  card: {
    borderColor: "#ff0000",
    borderRadius: 20,
  },
  text: {
    color: "#336888",
  },
  image: {
    width: "100%",
    height: 200,
  },
  upperBox: {
    justifyContent: "center",
    paddingLeft: "7%",
  },
  upperBoxReservation: {
    justifyContent: "center",
    paddingLeft: "2%",
  },
  profileTitle: {
    alignSelf: "center",
    color: "#336888",
  },
});
export default Dashboard;
