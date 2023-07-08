import * as TYPES from "../action-types";
import _ from "lodash";
let initial = {
  list: null,
};

export default function storeReducer(state = initial, action) {
  state = _.clone(state);
  switch (action.type) {
    default:
      break;
  }
  return state;
}
