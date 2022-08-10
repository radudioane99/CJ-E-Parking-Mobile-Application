import ActionTypes from "./types";
import * as httpUtils from "../utils/http-utils";

export const setIsAlertVisible = (isVisible) => ({
  type: ActionTypes.SET_IS_ALERT_VISIBLE,
  payload: isVisible,
});

export const setAlertText = (alertText) => ({
  type: ActionTypes.SET_ALERT_TEXT,
  payload: alertText,
});

export const setIsSuccessMessageVisible = (isVisible) => ({
  type: ActionTypes.SET_IS_SUCCESS_MESSAGE_VISIBLE,
  payload: isVisible,
});

export const setSuccessMessage = (successText) => ({
  type: ActionTypes.SET_SUCCESS_MESSAGE_TEXT,
  payload: successText,
});

export const setModalText = (modalText) => ({
  type: ActionTypes.SET_DISPLAY_MODAL_TEXT,
  payload: modalText,
});

export const setModalVisible = (modalVisible) => ({
  type: ActionTypes.SET_DISPLAY_MODAL,
  payload: modalVisible,
});

export const setUserData = (userData) => ({
  type: ActionTypes.SET_USER_DATA,
  payload: userData,
});

export const setUserCars = (userCars) => ({
  type: ActionTypes.SET_USER_CARS,
  payload: userCars,
});

export const setUserReports = (userReports) => ({
  type: ActionTypes.SET_USER_REPORTS,
  payload: userReports,
});

export const setUserReservations = (userReservations) => ({
  type: ActionTypes.SET_USER_RESERVATIONS,
  payload: userReservations,
});

export const setLocations = (locations) => ({
  type: ActionTypes.SET_LOCATIONS,
  payload: locations,
});

export const setHasUserSignUp = (payload) => ({
  type: ActionTypes.SET_HAS_USER_SIGN_UP,
  payload: payload,
});

export const clearUserData = () => ({
  type: ActionTypes.CLEAR_USER_DATA,
});

export const setHardwareNumberOfCars = (payload) => ({
  type: ActionTypes.SET_HARDWARE_NUMBER_OF_CARS,
  payload: payload,
});

export const loadCars = (userId) => async (dispatch) => {
  try {
    const response = await httpUtils.getRequest(`Cars/${userId}`);
    if (response.status === 200) {
      dispatch(setUserCars(response.data));
      return {
        isOk: true,
      };
    } else {
      return {
        isOk: false,
      };
    }
  } catch {
    return {
      isOk: false,
    };
  }
};

export const loadReports = (userId) => async (dispatch) => {
  try {
    const response = await httpUtils.getRequest(`Reports/${userId}`);
    if (response.status === 200) {
      dispatch(setUserReports(response.data));
      return {
        isOk: true,
      };
    } else {
      return {
        isOk: false,
      };
    }
  } catch {
    return {
      isOk: false,
    };
  }
};

export const loadReservations = (userId) => async (dispatch) => {
  try {
    const response = await httpUtils.getRequest(`Reservations/${userId}`);
    if (response.status === 200) {
      dispatch(setUserReservations(response.data));
      return {
        isOk: true,
      };
    } else {
      return {
        isOk: false,
      };
    }
  } catch {
    return {
      isOk: false,
    };
  }
};

export const loadLocations = () => async (dispatch) => {
  try {
    const response = await httpUtils.getRequest(`Locations`);
    if (response.status === 200) {
      dispatch(setLocations(response.data));
      return {
        isOk: true,
      };
    } else {
      return {
        isOk: false,
      };
    }
  } catch {
    return {
      isOk: false,
    };
  }
};
