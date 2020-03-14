import reviewsState from './reviews';
import {ReviewsActionType, ReviewsActionCreator} from "../../actions/reviews/action-creator";

const reviews = [
  {
    id: 1,
    user: {
      id: 1,
      name: `name`,
      status: `true`,
    },
    comment: `comment`
  },
];

it(`Reviews without additional parameters should return initial state`, () => {
  expect(reviewsState(void 0, {})).toEqual({
    requestStatus: null,
    requestMessage: null,
    reviews: [],
  });
});

it(`Reducer should set offers request status`, () => {
  expect(reviewsState({
    requestStatus: null,
  }, {
    type: ReviewsActionType.SET_REVIEWS_REQUEST_STATUS,
    payload: `success`,
  })).toEqual({
    requestStatus: `success`,
  });
});

it(`Reducer should set offers request message`, () => {
  expect(reviewsState({
    requestMessage: null,
  }, {
    type: ReviewsActionType.SET_REVIEWS_REQUEST_MESSAGE,
    payload: `message`,
  })).toEqual({
    requestMessage: `message`,
  });
});

it(`Reducer should get reviews`, () => {
  expect(reviewsState({
    reviews: [],
  }, {
    type: ReviewsActionType.GET_REVIEWS,
    payload: reviews,
  })).toEqual({
    reviews,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for set reviews request status returns correct action`, () => {
    expect(ReviewsActionCreator.setReviewsRequestStatus())
      .toEqual({
        type: ReviewsActionType.SET_REVIEWS_REQUEST_STATUS,
        payload: undefined,
      });
  });

  it(`Action creator for set reviews request status should returns "success" value`, () => {
    expect(ReviewsActionCreator.setReviewsRequestStatus(`success`))
    .toEqual({
      type: ReviewsActionType.SET_REVIEWS_REQUEST_STATUS,
      payload: `success`,
    });
  });

  it(`Action creator for set reviews request message returns correct action`, () => {
    expect(ReviewsActionCreator.setReviewsRequestMessage())
      .toEqual({
        type: ReviewsActionType.SET_REVIEWS_REQUEST_MESSAGE,
        payload: undefined,
      });
  });

  it(`Action creator for set reviews request message should returns "message" value`, () => {
    expect(ReviewsActionCreator.setReviewsRequestMessage(`message`))
    .toEqual({
      type: ReviewsActionType.SET_REVIEWS_REQUEST_MESSAGE,
      payload: `message`,
    });
  });

  it(`Action creator for get reviews returns correct action`, () => {
    expect(ReviewsActionCreator.getReviews())
      .toEqual({
        type: ReviewsActionType.GET_REVIEWS,
        payload: undefined,
      });
  });

  it(`Action creator for get reviews should returns reviews`, () => {
    expect(ReviewsActionCreator.getReviews(reviews))
    .toEqual({
      type: ReviewsActionType.GET_REVIEWS,
      payload: reviews,
    });
  });
});
