import React, { useState, useEffect } from "react";
import {
  Input,
  Text,
  Stack,
  Button,
  FormControl,
  NativeBaseProvider,
  Box,
  WarningOutlineIcon,
  KeyboardAvoidingView,
  ScrollView,
} from "native-base";
import { StyleSheet } from "react-native";
import * as httpUtils from "../utils/http-utils";
import { batch, useDispatch } from "react-redux";
import {
  setIsAlertVisible,
  setAlertText,
  setUserData,
  setSuccessMessage,
  setIsSuccessMessageVisible,
} from "../redux/actions";
import Alert from "./Alert";
import SuccessMessage from "./SuccessMessage";
import { useSelector } from "react-redux";

function ProfilePage({ navigation }) {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { userData } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(userData.email);
    setFirstName(userData.firstName);
    setLastName(userData.lastName);
  }, []);

  async function submitButtonPressed() {
    if (
      email.trim() !== "" &&
      firstName.trim() !== "" &&
      lastName.trim() !== ""
    ) {
      const editUser = {
        Id: userData.id,
        Email: email,
        NewPassword: newPassword,
        OldPassword: currentPassword,
        FirstName: firstName,
        LastName: lastName,
      };
      try {
        const response = await httpUtils.putRequest(
          `Users/EditProfile`,
          editUser
        );
        if (response.status === 200) {
          batch(() => {
            dispatch(setUserData(response.data));
            dispatch(setSuccessMessage("User edited successfully!"));
            dispatch(setIsSuccessMessageVisible(true));
          });
        }
      } catch (error) {
        if (error.data) {
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
                  <Text fontSize="lg">Email</Text>
                </FormControl.Label>
                <Input
                  fontSize="md"
                  shadow={1}
                  placeholder="Email..."
                  onChangeText={(email) => setEmail(email)}
                  defaultValue={email}
                />
              </Stack>
            </FormControl>
            <FormControl isRequired>
              <Stack style={styles.element} mx="4">
                <FormControl.Label>
                  <Text fontSize="lg">First Name</Text>
                </FormControl.Label>
                <Input
                  fontSize="md"
                  shadow={1}
                  placeholder="First Name..."
                  onChangeText={(firstName) => setFirstName(firstName)}
                  defaultValue={firstName}
                />
              </Stack>
            </FormControl>

            <FormControl isRequired>
              <Stack style={styles.element} mx="4">
                <FormControl.Label>
                  <Text fontSize="lg">Last Name</Text>
                </FormControl.Label>
                <Input
                  fontSize="md"
                  shadow={1}
                  placeholder="Last Name..."
                  onChangeText={(lastName) => setLastName(lastName)}
                  defaultValue={lastName}
                />
              </Stack>
            </FormControl>
            <FormControl isRequired>
              <Stack style={styles.element} mx="4">
                <FormControl.Label>
                  <Text fontSize="lg">Current passowrd</Text>
                </FormControl.Label>
                <Input
                  fontSize="md"
                  shadow={1}
                  type="password"
                  placeholder="Current passowrd..."
                  onChangeText={(password) => setCurrentPassword(password)}
                  defaultValue={currentPassword}
                />
              </Stack>
            </FormControl>
            <FormControl isRequired>
              <Stack mx="4">
                <FormControl.Label>
                  <Text fontSize="lg">New Password</Text>
                </FormControl.Label>
                <Input
                  fontSize="md"
                  shadow={1}
                  type="password"
                  placeholder="New Password..."
                  onChangeText={(password) => setNewPassword(password)}
                  defaultValue={newPassword}
                />
                <FormControl.HelperText>
                  <Text fontSize="sm">Must be at least 8 characters.</Text>
                </FormControl.HelperText>
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  At least 8 characters are required.
                </FormControl.ErrorMessage>
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
              <Text style={styles.text}>Edit Profile</Text>
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

export default ProfilePage;
