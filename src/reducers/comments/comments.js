import {CommentsActionType} from "../../actions/comments/action-creator";
import {extend} from "../../utils.js";

const initialState = {
  comments: [],
};

export default function createState(state = initialState, action) {
  switch (action.type) {

    case CommentsActionType.GET_COMMENTS:
      return extend(state, {
        comments: action.payload,
      });

    default:
      return state;
  }
}
