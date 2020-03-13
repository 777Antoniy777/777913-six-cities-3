import offersState from './offers';
import {OffersActionType, OffersActionCreator} from "../../actions/offers/action-creator";

const initialOffers = [
  {
    id: 1,
    city: `Omsk`,
    title: `title`,
    premium: false,
    src: `img/image.jpg`,
    photos: [
      `img/image-1.jpg`,
    ],
    price: 10,
    description: `description`,
    type: `type`,
    rating: 1,
    bedroomAmount: 1,
    guestsAmount: 1,
    items: [
      `item1`,
      `item2`,
    ],
    host: {
      avatar: `img/avatar.jpg`,
      name: `name`,
      status: false,
    },
    reviews: [
      {
        id: 1,
        body: `body`,
        rating: 1,
        name: `name`,
        date: `date`,
      },
    ],
    coords: [2, 3],
  },
];
const offers = [
  {
    id: 1,
    city: `Omsk`,
    title: `title`,
    premium: false,
    src: `img/image.jpg`,
    photos: [
      `img/image-1.jpg`,
    ],
    price: 10,
    description: `description`,
    type: `type`,
    rating: 1,
    bedroomAmount: 1,
    guestsAmount: 1,
    items: [
      `item1`,
      `item2`,
    ],
    host: {
      avatar: `img/avatar.jpg`,
      name: `name`,
      status: false,
    },
    reviews: [
      {
        id: 1,
        body: `body`,
        rating: 1,
        name: `name`,
        date: `date`,
      },
    ],
    coords: [2, 3],
  },
];

it(`Offers without additional parameters should return initial state`, () => {
  expect(offersState(void 0, {})).toEqual({
    requestStatus: null,
    requestMessage: null,
    city: null,
    initialOffers: [],
    offers: [],
  });
});

it(`Reducer should set offers request status`, () => {
  expect(offersState({
    requestStatus: null,
  }, {
    type: OffersActionType.SET_OFFERS_REQUEST_STATUS,
    payload: `success`,
  })).toEqual({
    requestStatus: `success`,
  });
});

it(`Reducer should set offers request message`, () => {
  expect(offersState({
    requestMessage: null,
  }, {
    type: OffersActionType.SET_OFFERS_REQUEST_MESSAGE,
    payload: `message`,
  })).toEqual({
    requestMessage: `message`,
  });
});

it(`Reducer should set initial offers`, () => {
  expect(offersState({
    initialOffers: [],
  }, {
    type: OffersActionType.GET_INITIAL_OFFERS,
    payload: initialOffers,
  })).toEqual({
    initialOffers,
  });
});

it(`Reducer should set offers`, () => {
  expect(offersState({
    offers: [],
  }, {
    type: OffersActionType.GET_OFFERS,
    payload: offers,
  })).toEqual({
    offers,
  });
});

it(`Reducer should set initial city`, () => {
  expect(offersState({
    city: null,
  }, {
    type: OffersActionType.GET_INITIAL_CITY,
    payload: `Omsk`,
  })).toEqual({
    city: `Omsk`,
  });
});

it(`Reducer should set current city`, () => {
  expect(offersState({
    city: null,
  }, {
    type: OffersActionType.GET_CURRENT_CITY,
    payload: `Moscow`,
  })).toEqual({
    city: `Moscow`,
  });
});

it(`Reducer should set default order of offers`, () => {
  expect(offersState({
    offers: [],
  }, {
    type: OffersActionType.SET_DEFAULT_ORDER_OFFERS,
    payload: offers,
  })).toEqual({
    offers,
  });
});

it(`Reducer should set low to hugh order of offers`, () => {
  const filteredOffers = offers.sort((left, right) => left.price - right.price);

  expect(offersState({
    offers,
  }, {
    type: OffersActionType.SET_LOW_TO_HIGH_ORDER_OFFERS,
    payload: filteredOffers,
  })).toEqual({
    offers: filteredOffers,
  });
});

it(`Reducer should set hugh to low order of offers`, () => {
  const filteredOffers = offers.sort((left, right) => right.price - left.price);

  expect(offersState({
    offers,
  }, {
    type: OffersActionType.SET_HIGH_TO_LOW_ORDER_OFFERS,
    payload: filteredOffers,
  })).toEqual({
    offers: filteredOffers,
  });
});

it(`Reducer should set top rated first order of offers`, () => {
  const filteredOffers = offers.sort((left, right) => right.rating - left.rating);

  expect(offersState({
    offers,
  }, {
    type: OffersActionType.SET_TOP_RATED_FIRST_ORDER_OFFERS,
    payload: filteredOffers,
  })).toEqual({
    offers: filteredOffers,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for set offers request status returns correct action`, () => {
    expect(OffersActionCreator.setOffersRequestStatus())
      .toEqual({
        type: OffersActionType.SET_OFFERS_REQUEST_STATUS,
        payload: undefined,
      });
  });

  it(`Action creator for set offers request status should returns "success" value`, () => {
    expect(OffersActionCreator.setOffersRequestStatus(`success`))
    .toEqual({
      type: OffersActionType.SET_OFFERS_REQUEST_STATUS,
      payload: `success`,
    });
  });

  it(`Action creator for set offers request message returns correct action`, () => {
    expect(OffersActionCreator.setOffersRequestMessage())
      .toEqual({
        type: OffersActionType.SET_OFFERS_REQUEST_MESSAGE,
        payload: undefined,
      });
  });

  it(`Action creator for set offers request message should returns "success" value`, () => {
    expect(OffersActionCreator.setOffersRequestMessage(`message`))
    .toEqual({
      type: OffersActionType.SET_OFFERS_REQUEST_MESSAGE,
      payload: `message`,
    });
  });

  it(`Action creator for get initial offers returns correct action`, () => {
    expect(OffersActionCreator.getInitialOffers())
      .toEqual({
        type: OffersActionType.GET_INITIAL_OFFERS,
        payload: undefined,
      });
  });

  it(`Action creator for get initial offers should returns initialOffers`, () => {
    expect(OffersActionCreator.getInitialOffers(initialOffers))
    .toEqual({
      type: OffersActionType.GET_INITIAL_OFFERS,
      payload: initialOffers,
    });
  });

  it(`Action creator for get offers returns correct action`, () => {
    expect(OffersActionCreator.getOffers())
      .toEqual({
        type: OffersActionType.GET_OFFERS,
        payload: undefined,
      });
  });

  it(`Action creator for get offers should returns offers`, () => {
    expect(OffersActionCreator.getOffers(offers))
    .toEqual({
      type: OffersActionType.GET_OFFERS,
      payload: offers,
    });
  });

  it(`Action creator for get initial city returns correct action`, () => {
    expect(OffersActionCreator.getInitialCity())
      .toEqual({
        type: OffersActionType.GET_INITIAL_CITY,
        payload: undefined,
      });
  });

  it(`Action creator for get initial city should returns "Omsk"`, () => {
    expect(OffersActionCreator.getInitialCity(`Omsk`))
    .toEqual({
      type: OffersActionType.GET_INITIAL_CITY,
      payload: `Omsk`,
    });
  });

  it(`Action creator for set city returns correct action`, () => {
    expect(OffersActionCreator.getCurrentCity())
      .toEqual({
        type: OffersActionType.GET_CURRENT_CITY,
        payload: undefined,
      });
  });

  it(`Action creator for set city should returns "Moscow" value of city`, () => {
    expect(OffersActionCreator.getCurrentCity(`Moscow`))
    .toEqual({
      type: OffersActionType.GET_CURRENT_CITY,
      payload: `Moscow`,
    });
  });

  it(`Action creator for set default order returns correct action`, () => {
    expect(OffersActionCreator.setDefaultOrderOffers())
      .toEqual({
        type: OffersActionType.SET_DEFAULT_ORDER_OFFERS,
        payload: undefined,
      });
  });

  it(`Action creator for set default order should returns same "Offers"`, () => {
    expect(OffersActionCreator.setDefaultOrderOffers(offers))
    .toEqual({
      type: OffersActionType.SET_DEFAULT_ORDER_OFFERS,
      payload: offers,
    });
  });

  it(`Action creator for set low to high order returns correct action`, () => {
    expect(OffersActionCreator.setLowToHighOrderOffers())
      .toEqual({
        type: OffersActionType.SET_LOW_TO_HIGH_ORDER_OFFERS,
        payload: undefined,
      });
  });

  it(`Action creator for set low to high order should returns filtered "Offers"`, () => {
    const filteredOffers = offers.sort((left, right) => left.price - right.price);

    expect(OffersActionCreator.setLowToHighOrderOffers(filteredOffers)).toEqual({
      type: OffersActionType.SET_LOW_TO_HIGH_ORDER_OFFERS,
      payload: filteredOffers,
    });
  });

  it(`Action creator for set high to low order returns correct action`, () => {
    expect(OffersActionCreator.setHighToLowOrderOffers())
      .toEqual({
        type: OffersActionType.SET_HIGH_TO_LOW_ORDER_OFFERS,
        payload: undefined,
      });
  });

  it(`Action creator for set high to low order should returns filtered "Offers"`, () => {
    const filteredOffers = offers.sort((left, right) => right.price - left.price);

    expect(OffersActionCreator.setHighToLowOrderOffers(filteredOffers)).toEqual({
      type: OffersActionType.SET_HIGH_TO_LOW_ORDER_OFFERS,
      payload: filteredOffers,
    });
  });

  it(`Action creator for set top rated first order returns correct action`, () => {
    expect(OffersActionCreator.setTopRatedFirstOrderOffers())
      .toEqual({
        type: OffersActionType.SET_TOP_RATED_FIRST_ORDER_OFFERS,
        payload: undefined,
      });
  });

  it(`Action creator for set top rated first order should returns filtered "Offers"`, () => {
    const filteredOffers = offers.sort((left, right) => right.rating - left.rating);

    expect(OffersActionCreator.setTopRatedFirstOrderOffers(filteredOffers)).toEqual({
      type: OffersActionType.SET_TOP_RATED_FIRST_ORDER_OFFERS,
      payload: filteredOffers,
    });
  });
});
