import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  Input,
  Text,
  Stack,
  Button,
  Image,
  FormControl,
  NativeBaseProvider,
  Box,
  WarningOutlineIcon,
  ScrollView,
} from "native-base";
import {
  setIsAlertVisible,
  setAlertText,
  setIsSuccessMessageVisible,
  setSuccessMessage,
} from "../redux/actions";
import { useDispatch, batch } from "react-redux";
import * as httpUtils from "../utils/http-utils";

function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const dispatch = useDispatch();

  async function submitButtonPressed() {
    if (
      email.trim() !== "" &&
      newPassword.trim() !== "" &&
      confirmNewPassword.trim() !== ""
    ) {
      const passwordRequest = {
        Email: email,
        NewPassword: newPassword,
        ConfrirmPassword: confirmNewPassword,
      };
      try {
        const response = await httpUtils.postRequest(
          `Users/RecoverPassword`,
          passwordRequest
        );
        if (response.status === 200) {
          batch(() => {
            dispatch(
              setSuccessMessage(
                "Password request succssfully! Please check the email for validation message."
              )
            );
            dispatch(setIsSuccessMessageVisible(true));
          });
        }
      } catch (error) {
        dispatch(setIsAlertVisible(true));
        dispatch(setAlertText(error.data));
      }
    } else {
      dispatch(setIsAlertVisible(true));
      dispatch(setAlertText("Please fill in all the required data!"));
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

        <Box style={styles.loginPanel}>
          <FormControl isRequired>
            <Stack mx="4">
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

          <FormControl style={styles.passwords} isRequired>
            <Stack style={styles.password} mx="4">
              <FormControl.Label>
                <Text fontSize="lg">New password</Text>
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

          <FormControl style={styles.passwords} isRequired>
            <Stack style={styles.password} mx="4">
              <FormControl.Label>
                <Text fontSize="lg">Confirm new password</Text>
              </FormControl.Label>
              <Input
                fontSize="md"
                shadow={1}
                type="password"
                placeholder="Confirm new password..."
                onChangeText={(password) => setConfirmNewPassword(password)}
                defaultValue={confirmNewPassword}
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
            <Text style={styles.text}>Reset password</Text>
          </Button>
        </Box>
        <Text>In order to fulfill</Text>
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
  button: {
    width: "70%",
    height: 60,
    alignSelf: "center",
  },
  forgotPasswordLink: {
    paddingTop: 40,
    alignSelf: "flex-end",
    paddingRight: 25,
  },
});

export default ForgotPasswordScreen;
