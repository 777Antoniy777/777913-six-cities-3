import MockAdapter from "axios-mock-adapter";
import createAPI from "../../api.js";
import offerState from "./favorites";
import {FavoritesActionType, FavoritesActionCreator} from "../../actions/favorites/action-creator";
import {OffersActionType} from "../../actions/offers/action-creator";
import {OfferActionType} from "../../actions/offer/action-creator";
import {FavoritesAsyncActionCreator} from "../../actions/favorites/async-action-creator";

const api = createAPI(() => {});

const requestStatus = `status`;
const requestMessage = `message`;
const favoriteOffer = {
  id: 1,
  city: {
    id: 1,
    name: `city`,
    coords: [1, 1],
  },
  title: `title 1`,
  premium: false,
  src: `img/image1`,
  photos: [`img/image1`],
  price: 999999,
  description: `test`,
  type: `type`,
  rating: 9999,
  bedroomAmount: 30,
  guestsAmount: 50,
  items: [`item`],
  host: {
    avatar: `img/avatar-1.jpg`,
    name: `name`,
    status: false,
  },
  reviews: [
    {
      id: 1,
      body: `text`,
      rating: 5,
      name: `name`,
      date: `date`,
    },
  ],
  coord: [1, 1],
};
const favoriteOffers = [
  {
    id: 1,
    city: {
      id: 1,
      name: `city`,
      coords: [1, 1],
    },
    title: `title 1`,
    premium: false,
    src: `img/image1`,
    photos: [`img/image1`],
    price: 999999,
    description: `test`,
    type: `type`,
    rating: 9999,
    bedroomAmount: 30,
    guestsAmount: 50,
    items: [`item`],
    host: {
      avatar: `img/avatar-1.jpg`,
      name: `name`,
      status: false,
    },
    reviews: [
      {
        id: 1,
        body: `text`,
        rating: 5,
        name: `name`,
        date: `date`,
      },
    ],
    coord: [1, 1],
  }
];

it(`Favorites without additional parameters should return initial state`, () => {
  expect(offerState(void 0, {})).toEqual({
    requestStatus: null,
    requestMessage: null,
    favoriteOffers: [],
  });
});

it(`Reducer should set request status`, () => {
  expect(offerState({
    requestStatus: null,
  }, {
    type: FavoritesActionType.SET_FAVORITE_REQUEST_STATUS,
    payload: requestStatus,
  })).toEqual({
    requestStatus,
  });
});

it(`Reducer should set request message`, () => {
  expect(offerState({
    requestMessage: null,
  }, {
    type: FavoritesActionType.SET_FAVORITE_REQUEST_MESSAGE,
    payload: requestMessage,
  })).toEqual({
    requestMessage,
  });
});

it(`Reducer should get favorite offers`, () => {
  expect(offerState({
    favoriteOffers: [],
  }, {
    type: FavoritesActionType.GET_FAVORITE_OFFERS,
    payload: favoriteOffers,
  })).toEqual({
    favoriteOffers,
  });
});

it(`Reducer should get favorite offer`, () => {
  const id = 2;
  const filteredOffers = favoriteOffers.filter((elem) => elem.id !== id);

  expect(offerState({
    favoriteOffers,
  }, {
    type: FavoritesActionType.GET_FAVORITE_OFFER,
    payload: filteredOffers,
  })).toEqual({
    favoriteOffers: filteredOffers,
  });
});

describe(`Async action creator work correctly`, () => {
  it(`Should make a correct correct GET to /favorite`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const getFavoriteOffers = FavoritesAsyncActionCreator.getFavoriteOffers();

    apiMock
      .onGet(`/favorite`)
      .reply(200, favoriteOffers);

    return getFavoriteOffers(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: FavoritesActionType.GET_FAVORITE_OFFERS,
          payload: favoriteOffers,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: FavoritesActionType.SET_FAVORITE_REQUEST_STATUS,
          payload: `success`,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: FavoritesActionType.SET_FAVORITE_REQUEST_MESSAGE,
          payload: null,
        });
      });
  });

  it(`Should make a correct correct POST to /favorite:hotelId:status`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const hotelId = 1;
    const status = 1;
    const setFavoriteStatus = FavoritesAsyncActionCreator.setFavoriteStatus(hotelId, status);

    apiMock
      .onPost(`/favorite/${hotelId}/${status}`)
      .reply(200, favoriteOffer);

    return setFavoriteStatus(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(5);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: OffersActionType.GET_FAVORITE_OFFER,
          payload: favoriteOffer,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: OfferActionType.GET_FAVORITE_OFFER,
          payload: favoriteOffer,
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: FavoritesActionType.GET_FAVORITE_OFFER,
          payload: favoriteOffer,
        });
        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: FavoritesActionType.SET_FAVORITE_REQUEST_STATUS,
          payload: `success`,
        });
        expect(dispatch).toHaveBeenNthCalledWith(5, {
          type: FavoritesActionType.SET_FAVORITE_REQUEST_MESSAGE,
          payload: null,
        });
      });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for set request status should returns "status"`, () => {
    expect(FavoritesActionCreator.setFavoriteRequestStatus(requestStatus))
      .toEqual({
        type: FavoritesActionType.SET_FAVORITE_REQUEST_STATUS,
        payload: requestStatus,
      });
  });

  it(`Action creator for set request message should returns "message"`, () => {
    expect(FavoritesActionCreator.setFavoriteRequestMessage(requestMessage))
      .toEqual({
        type: FavoritesActionType.SET_FAVORITE_REQUEST_MESSAGE,
        payload: requestMessage,
      });
  });

  it(`Action creator for get favorite offers should returns "favoriteOffers"`, () => {
    expect(FavoritesActionCreator.getFavoriteOffers(favoriteOffers))
      .toEqual({
        type: FavoritesActionType.GET_FAVORITE_OFFERS,
        payload: favoriteOffers,
      });
  });

  it(`Action creator for get favorite offer should returns "favoriteOffer"`, () => {
    expect(FavoritesActionCreator.getFavoriteOffer(favoriteOffer))
      .toEqual({
        type: FavoritesActionType.GET_FAVORITE_OFFER,
        payload: favoriteOffer,
      });
  });
});
