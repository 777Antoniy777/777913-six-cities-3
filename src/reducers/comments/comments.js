import ActionType from '../../action-type';
import {extend} from "../../utils.js";

const initialState = {
  comments: [],
};

export default function createState(state = initialState, action) {
  switch (action.type) {

    case ActionType.GET_COMMENTS:
      return extend(state, {
        comments: action.payload,
      });

    default:
      return state;
  }
}
