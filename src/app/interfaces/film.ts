export interface IFilm {
 title: string,
 rusTitle: string,
 id: number,
 trailer: string,
 year: string,
 director: string,
 urlPoster: string,
 countries: string[],
 genres: string[],
 plot: string,
 url: string,
 notes?: string,
 rating:number,
 feedback: IFeedback[];
}

export interface IFeedback {
  id: number;
  userId: number;
  filmId: number;
  movieRating?: number;
  review: string;
}
