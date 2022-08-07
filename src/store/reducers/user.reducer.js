import { SET_USER_INFO } from "../types/user.type";
import {USER_INFO_KEY} from "../../constants/common.js";

let userInfo = localStorage.getItem(USER_INFO_KEY);

if (userInfo) {
  userInfo = JSON.parse(userInfo);
}

const DEDFAULT_STATE = {
  userInfo: userInfo,
  //userInfo,
};

export const userReducer = (state = DEDFAULT_STATE, { type, payload }) => {
  switch (type) {
    case SET_USER_INFO: {
      state.userInfo = payload;
      return { ...state };
    }
    default:
      return state;
  }
};
