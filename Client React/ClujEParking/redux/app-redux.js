import { createStore, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";

import ActionTypes from "./types";

//State
const initialState = {
  isAlertVisible: false,
  hasUserSignUp: false,
  alertText: "",
  isSuccessMessageVisible: false,
  successMessageText: "",
  userData: [],
  carData: [],
  locations: [],
  reservationsData: [],
  isModalVisible: false,
  modalText: "",
  userReports: [],
  hardwareNumberOfCars: null,
};

//Reducer

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_IS_ALERT_VISIBLE: {
      return {
        ...state,
        isAlertVisible: payload,
      };
    }
    case ActionTypes.SET_ALERT_TEXT: {
      return {
        ...state,
        alertText: payload,
      };
    }
    case ActionTypes.SET_IS_SUCCESS_MESSAGE_VISIBLE: {
      return {
        ...state,
        isSuccessMessageVisible: payload,
      };
    }
    case ActionTypes.SET_SUCCESS_MESSAGE_TEXT: {
      return {
        ...state,
        successMessageText: payload,
      };
    }
    case ActionTypes.SET_USER_DATA: {
      return {
        ...state,
        userData: payload,
      };
    }
    case ActionTypes.SET_USER_CARS: {
      return {
        ...state,
        carData: payload,
      };
    }
    case ActionTypes.SET_USER_REPORTS: {
      return {
        ...state,
        userReports: payload,
      };
    }
    case ActionTypes.SET_LOCATIONS: {
      return {
        ...state,
        locations: payload,
      };
    }

    case ActionTypes.SET_HAS_USER_SIGN_UP: {
      return {
        ...state,
        hasUserSignUp: payload,
      };
    }

    case ActionTypes.SET_USER_RESERVATIONS: {
      return {
        ...state,
        reservationsData: payload,
      };
    }

    case ActionTypes.SET_DISPLAY_MODAL: {
      return {
        ...state,
        isModalVisible: payload,
      };
    }

    case ActionTypes.SET_DISPLAY_MODAL_TEXT: {
      return {
        ...state,
        modalText: payload,
      };
    }

    case ActionTypes.CLEAR_USER_DATA: {
      return {
        ...state,
        carData: [],
        reservationsData: [],
        userReports: [],
      };
    }

    case ActionTypes.SET_HARDWARE_NUMBER_OF_CARS: {
      return {
        ...state,
        hardwareNumberOfCars: payload,
      };
    }

    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export { store };
