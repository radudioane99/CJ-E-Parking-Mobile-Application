import { Center } from "native-base";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useSelector } from "react-redux";
import LoadModal from "./LoadModal";

const CameraPreview = ({ photo, retakePicture, savePhoto }) => {
  return (
    <View style={styles.background}>
      <LoadModal />
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={styles.image}
      >
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <TouchableOpacity
              onPress={retakePicture}
              style={styles.buttonOpacity}
            >
              <Text style={styles.buttonText}>Re-take</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={savePhoto} style={styles.buttonOpacity}>
              <Text style={styles.buttonText}>Save photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "transparent",
    flex: 1,
    width: "100%",
    height: "100%",
  },
  image: {
    flex: 1,
  },
  buttonText: {
    color: "#06B6D4",
    fontSize: 25,
    fontWeight: "bold",
  },
  buttonOpacity: {
    width: 130,
    height: 40,
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 15,
    justifyContent: "flex-end",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default CameraPreview;
