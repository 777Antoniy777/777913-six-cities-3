type OfferLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type City = {
  name: string;
  location: OfferLocation;
};

type Host = {
  avatar: string;
  id: number;
  name: string;
  status: boolean;
};

type Offer = {
  id: number;
  city: City;
  title: string;
  premium: boolean;
  favorite: boolean;
  src: string;
  photos: string[];
  price: number;
  description: string;
  type: string;
  rating: number;
  bedroomAmount: number;
  guestsAmount: number;
  items: string[];
  host: Host;
  location: OfferLocation;
};

type Offers = Offer[];
