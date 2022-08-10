import * as React from "react";
import { StyleSheet } from "react-native";
import {
  Text,
  Button,
  VStack,
  Center,
  NativeBaseProvider,
  Image,
} from "native-base";
function HomeScreen({ navigation }) {
  return (
    <NativeBaseProvider>
      <VStack alignItems="center" flex={1}>
        <Center bg="primary.50" rounded="md" style={styles.firstHalf}>
          <VStack alignItems="center" alignContent="space-between" flex={1}>
            <Image
              resizeMode={"center"}
              source={require("../assets/Improved_Logo.png")}
              alt="Connection Error"
              style={styles.image}
            />
          </VStack>
        </Center>

        <Center rounded="md" style={styles.secondHalf} bg="primary.50">
          <VStack alignItems="center" style={styles.buttonBox} px="4">
            <Button
              variant="solid"
              style={styles.button}
              rounded={25}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.text}>Log in</Text>
            </Button>
            <Button
              variant="solid"
              style={styles.button}
              rounded={25}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text style={styles.text}>Sign Up</Text>
            </Button>
          </VStack>
        </Center>
      </VStack>
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  firstHalf: {
    height: "50%",
    width: "100%",
  },
  secondHalf: {
    height: "50%",
    width: "100%",
  },
  button: {
    width: "100%",
    height: 60,
  },
  text: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    color: "#00B9B4",
    fontSize: 50,
    alignSelf: "center",
  },
  buttonBox: {
    width: 300,
    height: "60%",
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
});
export default HomeScreen;
