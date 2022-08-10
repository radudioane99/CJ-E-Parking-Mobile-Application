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
  Link,
  ScrollView,
} from "native-base";
import * as httpUtils from "../utils/http-utils";
import Alert from "./Alert";
import SuccessMessage from "./SuccessMessage";
import {
  setIsAlertVisible,
  setAlertText,
  setUserData,
  loadCars,
  loadReservations,
  loadLocations,
  loadReports,
} from "../redux/actions";
import { useDispatch, batch } from "react-redux";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  function CleanState() {
    setEmail("");
    setPassword("");
  }

  async function submitButtonPressed() {
    if (email.trim() !== "" && password.trim() !== "") {
      try {
        const response = await httpUtils.postRequest(
          `Users/${email}/${password}`
        );

        if (response.status === 200) {
          batch(() => {
            dispatch(setUserData(response.data));
            dispatch(loadCars(response.data.id));
            dispatch(loadReservations(response.data.id));
            dispatch(loadLocations());
            dispatch(loadReports(response.data.id));
          });
          CleanState();
          navigation.navigate("Dashboard");
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
        <SuccessMessage />
        <Alert />
        <Image
          resizeMode={"stretch"}
          source={require("../assets/LogoName.png")}
          alt="Connection Error"
          style={styles.image}
        />

        <Box style={styles.loginPanel}>
          <FormControl isRequired>
            <Stack style={styles.email} mx="4">
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

          <FormControl style={"secondElement"} isRequired>
            <Stack style={styles.password} mx="4">
              <FormControl.Label>
                <Text fontSize="lg">Password</Text>
              </FormControl.Label>
              <Input
                fontSize="md"
                shadow={1}
                type="password"
                placeholder="Password..."
                onChangeText={(password) => setPassword(password)}
                defaultValue={password}
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
            <Text style={styles.text}>Log in</Text>
          </Button>
          <Link
            _text={{
              fontSize: "lg",
              color: "#0891b2",
            }}
            style={styles.forgotPasswordLink}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            Forgot Password?
          </Link>
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
  email: {
    paddingBottom: 20,
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

export default LoginScreen;
