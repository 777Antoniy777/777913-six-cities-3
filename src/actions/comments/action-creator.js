const CommentsActionType = {
  GET_COMMENTS: `GET_COMMENTS`,
  SET_COMMENTS_STATUS: `SET_COMMENTS_STATUS`,
};

const CommentsActionCreator = {
  getComments: (comments) => ({
    type: CommentsActionType.GET_COMMENTS,
    payload: comments,
  }),

  setCommentsStatus: (status) => ({
    type: CommentsActionType.SET_COMMENTS_STATUS,
    payload: status,
  }),
};

export {CommentsActionType, CommentsActionCreator};
