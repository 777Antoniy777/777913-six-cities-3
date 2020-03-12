import {CommentsActionCreator} from "./action-creator";

const CommentsAsyncActionCreator = {
  getComments: (hotelId) => (dispatch, getState, api) => {
    return api.get(`/comments/${hotelId}`)
      .then((response) => {
        console.log(`ПОЛУЧАЮ ДАННЫЕ:`, response.data);
        response = response.data;

        dispatch(CommentsActionCreator.getComments(response));
      })
      .catch(function (error) {
        console.log(error);
        throw error;
      });
  },
};

export {CommentsAsyncActionCreator};
