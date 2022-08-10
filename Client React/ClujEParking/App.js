import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./pages/Login";
import HomeScreen from "./pages/Home";
import SignUpScreen from "./pages/SignUp";
import ForgotPasswordScreen from "./pages/ForgotPassword";
import { Provider } from "react-redux";
import { store } from "./redux/app-redux";
import Dashboard from "./pages/Dashboard";
import ImagePage from "./pages/ImagePage";
import CarManagementPage from "./pages/CarManagementPage";
import CarForm from "./pages/CarForm";
import ReservationPage from "./pages/ReservationPage";
import ReservationForm from "./pages/ReservationForm";
import ProfilePage from "./pages/ProfilePage";
import ReservationManagementPage from "./pages/ReservationManagementPage";
import CheckPaymentPage from "./pages/CheckPaymentPage";
import ReportPage from "./pages/ReportPage";
import YourReportsPage from "./pages/YourReportsPage";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { setHardwareNumberOfCars } from "./redux/actions";
const Stack = createNativeStackNavigator();

function App() {
  const [connection, setConnection] = useState(null);
  const [val, setVal] = useState(null);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://efda-5-14-148-17.ngrok.io/parkHub")
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);
  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("Connected!");
          connection.on("number", (val) => {
            console.log("Number " + val);
            store.dispatch(setHardwareNumberOfCars(val));
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#06B6D4" },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "CJ E-Parking",
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "Log in",
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              title: "Sign up",
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{
              title: "Forgot Password",
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              title: "Dashboard",
              headerBackVisible: false,
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="ImagePage"
            component={ImagePage}
            options={{
              title: "Image Menu",
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="CarManagementPage"
            component={CarManagementPage}
            options={{
              title: "Your cars",
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="CarForm"
            component={CarForm}
            options={{
              title: "Car form",
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="ReservationPage"
            component={ReservationPage}
            options={{
              title: "Reservation page",
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="ReservationForm"
            component={ReservationForm}
            options={{
              title: "Reservation form",
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfilePage}
            options={{
              title: "My profile",
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="ReservationManagementPage"
            component={ReservationManagementPage}
            options={{
              title: "My Reservations",
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="CheckPaymentPage"
            component={CheckPaymentPage}
            options={{
              title: "Check Payment Page",
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="ReportPage"
            component={ReportPage}
            options={{
              title: "Report Page",
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="YourReportsPage"
            component={YourReportsPage}
            options={{
              title: "Your reports page",
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerTitleAlign: "center",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
