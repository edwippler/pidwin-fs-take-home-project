import {TOSS} from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";

export const tossCoin = (formData, history) => async (dispatch) => {
  try {
    const {data} = await api.toss(formData);
    dispatch({TOSS, data});
    history("/");
    messages.success();
  } catch (e) {
    messages.error(e);
  }
}