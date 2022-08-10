import React, { useEffect, useState } from "react";
import { Box, NativeBaseProvider, VStack, ScrollView } from "native-base";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import ReportCard from "./ReportCard";

export default function YourReportsPage({ navigation }) {
  const { userReports } = useSelector((state) => state);
  const [numberOfReports, setNumberOfReports] = useState();

  useEffect(() => {
    setNumberOfReports(userReports.length);
  }, [userReports]);

  return (
    <NativeBaseProvider>
      <ScrollView>
        <VStack space={4} alignItems="center" style={styles.background}>
          {numberOfReports != 0 && (
            <Box alignItems="center">
              {userReports.map((report) => (
                <ReportCard
                  key={report.id}
                  data={{
                    Id: report.id,
                    Image: report.image,
                    ReportDate: report.reportDate,
                    LocationName: report.location.name,
                    LocationAdress: report.location.adress,
                  }}
                />
              ))}
            </Box>
          )}
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  background: {
    paddingTop: "5%",
  },
  card: {
    borderColor: "#ff0000",
    borderRadius: 25,
  },
  text: {
    color: "#336888",
    fontSize: 15,
  },
  image: {
    width: "100%",
    height: 170,
  },
  upperBox: {
    justifyContent: "center",
    paddingLeft: "7%",
  },
  listElement: {
    borderColor: "#336888",
    borderWidth: 4,
  },
  editButton: {
    width: "55%",
    height: 60,
    backgroundColor: "#06B6D4",
  },
  deleteButton: {
    width: "55%",
    height: 60,
    backgroundColor: "#ef4444",
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  commandElement: {
    alignItems: "center",
    justifyContent: "center",
  },
});
