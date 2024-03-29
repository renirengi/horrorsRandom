export interface IFilm {
 title?: string,
 rusTitle?: string,
 id: number,
 trailer?: string,
 year: string,
 director: string,
 urlPoster?: string,
 countries: string[],
 genres: string[],
 plot: string,
 url: string,
 notes?: string,
 rating:number,
 feedback?: IFeedback[];
 userId?: number;
 filmDate?: string;
}

export interface IFeedback {
  id: number;
  userId: number;
  filmId: number;
  movieRating: number;
  review?: string;
  dateReview?: string;
  typeReview?: string;
  dateRating?: string;
  reviewState?: TState;
}

export type TState ="false"| "true"| "wait";
