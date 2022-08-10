import React from "react";

import { StyleSheet, Modal, View, Text } from "react-native";
import { useDispatch, batch, useSelector } from "react-redux";
import { setModalText, setModalVisible } from "../redux/actions";
const LoadModal = () => {
  const { isModalVisible, modalText } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <Modal
      transparent={true}
      animationType={"none"}
      visible={isModalVisible}
      onRequestClose={() => {
        batch(() => {
          dispatch(setModalVisible(false));
          dispatch(setModalText(""));
        });
      }}
    >
      <View style={styles.modalBackground}>
        <Text style={styles.text}>{modalText}</Text>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#00000070",
  },
  text: {
    color: "#29d5f2",
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
  },
});
export default LoadModal;
