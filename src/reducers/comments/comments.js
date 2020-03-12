import {CommentsActionType} from "../../actions/comments/action-creator";
import {extend} from "../../utils.js";

const initialState = {
  status: null,
  comments: [],
};

export default function createState(state = initialState, action) {
  switch (action.type) {

    case CommentsActionType.GET_COMMENTS:
      return extend(state, {
        comments: action.payload,
      });

    case CommentsActionType.SET_COMMENTS_STATUS:
      return extend(state, {
        status: action.payload,
      });

    default:
      return state;
  }
}
