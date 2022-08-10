import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import { batch, useDispatch } from "react-redux";
import CameraPreview from "./CameraPreview";
import { Platform } from "expo-modules-core";
import axios from "axios";
import { getUrl } from "../utils/configure-http";
import { HStack, NativeBaseProvider, Input, VStack } from "native-base";
import * as ImagePicker from "expo-image-picker";
import {
  setModalText,
  setModalVisible,
  setIsSuccessMessageVisible,
  setSuccessMessage,
} from "../redux/actions";
import LoadModal from "./LoadModal";

export default function ReportPage({ route }) {
  const { locationId, number, userId } = route.params.reportData;
  const [startCamera, setStartCamera] = useState(false);
  const [chosenImage, setChosenImage] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraObject = useRef(null);
  const dispatch = useDispatch();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setChosenImage(result.uri);
    }
  };
  const actionStartCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };

  const takePicture = async () => {
    if (!cameraObject.current) return;
    try {
      const photo = await cameraObject.current.takePictureAsync({});
      setPreviewVisible(true);
      setCapturedImage(photo);
      setChosenImage(null);
    } catch (error) {}
  };

  const retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    actionStartCamera();
  };

  const savePhoto = async () => {
    if (!capturedImage && !chosenImage) return;
    if (chosenImage === null) {
      batch(() => {
        dispatch(setModalVisible(true));
        dispatch(setModalText("Processing..."));
      });

      const fileName = capturedImage.uri.split("/").pop();
      let formData = new FormData();
      formData.append("file", {
        uri:
          Platform.OS === "android"
            ? capturedImage.uri
            : capturedImage.uri.replace("file://", ""),
        name: fileName,
        type: "image/jpg",
      });

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      try {
        const response = await axios.post(
          getUrl(`/Reports/PostReport/${userId}/${locationId}`),
          formData,
          config
        );
        batch(() => {
          dispatch(setModalVisible(false));
          dispatch(setModalText(""));
        });
      } catch (error) {
        batch(() => {
          dispatch(setModalVisible(false));
          dispatch(setModalText(""));
        });
      }
    } else {
      const fileName = chosenImage.split("/").pop();

      let formData = new FormData();

      formData.append("file", {
        uri:
          Platform.OS === "android"
            ? chosenImage
            : chosenImage.replace("file://", ""),
        name: fileName,
        type: "image/jpg",
      });

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      dispatch(setModalVisible(true));
      dispatch(setModalText("Processing..."));

      try {
        const response = await axios.post(
          getUrl(`/Reports/PostReport/${userId}/${locationId}`),
          formData,
          config
        );

        batch(() => {
          dispatch(setSuccessMessage("Report submitted successfully!"));
          dispatch(setIsSuccessMessageVisible(true));
        });
      } catch (error) {
        batch(() => {
          dispatch(setModalVisible(false));
          dispatch(setModalText(""));
        });
      } finally {
        dispatch(setModalVisible(false));
        dispatch(setModalText(""));
      }
    }
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <LoadModal />
        {startCamera ? (
          <React.Fragment>
            {previewVisible && capturedImage ? (
              <CameraPreview
                photo={capturedImage}
                retakePicture={retakePicture}
                savePhoto={savePhoto}
              />
            ) : (
              <Camera style={styles.camera} ref={cameraObject}>
                <View style={styles.transparentView}>
                  <View style={styles.insideCameraContainer}>
                    <View style={styles.imagePreview}>
                      <TouchableOpacity
                        onPress={takePicture}
                        style={styles.takePictureButton}
                      />
                    </View>
                  </View>
                </View>
              </Camera>
            )}
          </React.Fragment>
        ) : (
          <VStack space={5} alignItems="center">
            <TouchableOpacity
              onPress={actionStartCamera}
              style={styles.openTakePictureButtonEnabled}
            >
              <Text style={styles.textStyle}>Take picture</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={pickImage}
              style={styles.openTakePictureButtonEnabled}
            >
              <Text style={styles.textStyle}>Choose picture</Text>
            </TouchableOpacity>

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
              />
            </HStack>

            <TouchableOpacity
              style={styles.openTakePictureButtonEnabled}
              onPress={savePhoto}
            >
              <Text style={styles.textStyle}>Submit Report</Text>
            </TouchableOpacity>
            {chosenImage && (
              <Image
                source={{ uri: chosenImage }}
                style={{ width: 300, height: 200 }}
              />
            )}
          </VStack>
        )}
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "5%",
  },
  recommandations: {
    paddingBottom: 6,
    paddingLeft: 10,
  },
  recommandationsContainer: {
    width: "90%",
  },
  openTakePictureButtonEnabled: {
    width: 330,
    borderRadius: 4,
    backgroundColor: "#06B6D4",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
  },
  openTakePictureButtonDisabled: {
    width: 330,
    borderRadius: 4,
    backgroundColor: "#737373",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
  },
  textStyle: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  spacer: {
    height: 50,
  },
  insideCameraContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    flex: 1,
    width: "100%",
    padding: 20,
    justifyContent: "space-between",
  },
  imagePreview: {
    alignSelf: "center",
    flex: 1,
    alignItems: "center",
  },
  takePictureButton: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: "#fff",
  },
  transparentView: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
    flexDirection: "row",
  },
});
