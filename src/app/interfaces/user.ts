export interface IUser {
  id: number;
  avatar: string;
  name: string;
  password: string;
  userFilms?: IUserFilms;
}

export interface IUserFilms {
  veto?:number[];
  viewing?: number[];
  feedback?: number[];
}
