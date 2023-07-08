import * as TYPES from "../action-types";
import _ from "lodash";
// 个人信息
let initial = {
  info: null,
};

export default function baseReducer(state = initial, action) {
  state = _.clone(state);
  switch (action.type) {
    default:
      break;
  }
  return state;
}
