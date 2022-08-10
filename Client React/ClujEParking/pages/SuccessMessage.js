import React from "react";
import {
  AlertDialog,
  Button,
  Center,
  NativeBaseProvider,
  Text,
} from "native-base";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsSuccessMessageVisible,
  setSuccessMessage,
} from "../redux/actions";
import { StyleSheet } from "react-native";
const Alert = () => {
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(setIsSuccessMessageVisible(false));
    dispatch(setSuccessMessage(""));
  };
  const { isSuccessMessageVisible, successMessageText } = useSelector(
    (state) => state
  );
  const cancelRef = React.useRef(null);
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Center>
          <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isSuccessMessageVisible}
            onClose={onClose}
          >
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header style={styles.header}>
                <Text style={styles.text}>Success</Text>
              </AlertDialog.Header>
              <AlertDialog.Body style={styles.body}>
                {successMessageText}
              </AlertDialog.Body>
              <AlertDialog.Footer style={styles.buttonPanel}>
                <Button
                  colorScheme="success"
                  onPress={onClose}
                  style={styles.okButton}
                >
                  OK
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </Center>
      </Center>
    </NativeBaseProvider>
  );
};
const styles = StyleSheet.create({
  buttonPanel: {
    alignSelf: "center",
  },
  okButton: {
    width: 70,
  },
  body: {
    paddingBottom: 10,
    paddingTop: 10,
  },
  header: {
    backgroundColor: "#22c55e",
  },
  text: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default Alert;
