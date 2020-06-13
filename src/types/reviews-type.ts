type UserReview = {
  id: number,
  status: boolean,
  name: string,
  avatar: string,
};

type Review = {
  id: number,
  user: UserReview,
  comment: string,
  rating: number,
  date: string,
};

type Reviews = Review[];

export {Review, Reviews};
