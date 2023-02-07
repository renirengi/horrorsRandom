export interface IUser {
  id: number;
  avatar?: string;
  name: string;
  password: string;
  email: string;
  userFilms?: IUserFilms;
  personalData: IPersonalData;
  rules: string;
}

export interface IUserFilms {
  veto?:number[];
  viewing?: number[];
  feedback?: number[];
  review?: string;
}

export interface IPersonalData {
  about?: string;
  country?: string;
  realName?: string;
  link?: string;
  phone?: string;
}
