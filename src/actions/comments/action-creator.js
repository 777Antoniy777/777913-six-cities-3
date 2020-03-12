const CommentsActionType = {
  GET_COMMENTS: `GET_COMMENTS`,
};

const CommentsActionCreator = {
  getComments: (comments) => ({
    type: CommentsActionType.GET_COMMENTS,
    payload: comments,
  }),
};

export {CommentsActionType, CommentsActionCreator};
