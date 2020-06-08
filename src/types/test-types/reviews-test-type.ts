type TestReviewUser = {
  id: number;
  name: string;
  comment: string;
}

type TestReview = {
  id: number;
  user: TestReviewUser;
  status: string;
};

type TestReviews = TestReview[];

export {TestReviews};
