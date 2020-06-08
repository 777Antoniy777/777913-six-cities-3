type TestCity = {
  id: number;
  name: string;
  coords: number[];
};

type TestHost = {
  avatar: string;
  name: string;
  status: boolean;
};

type TestReview = {
  id: number;
  body: string;
  rating: number;
  name: string;
  date: string;
};

type TestOffer = {
  id: number;
  city: TestCity;
  title: string;
  premium: boolean;
  src: string;
  photos: string[];
  price: number;
  description: string;
  type: string;
  rating: number;
  bedroomAmount: number;
  guestsAmount: number;
  items: string[];
  host: TestHost;
  reviews: TestReview[];
  coord: number[];
};

type TestOffers = TestOffer[];

export {TestOffer};
