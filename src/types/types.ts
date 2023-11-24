export interface IValues {
  [key: string]: string;
}

export interface IUser {
  email?: string;
  password?: string;
  checkPassword?: string;
  username?: string;
  phone?: string;
  businessNumber?: string;
}

export interface IUserInfo {
  email: string;
  username: string;
  token: string;
}

export interface IUserState {
  logInLoading: boolean;
  logInDone: boolean;
  logInError: Error | null;
  logOutLoading: boolean;
  logOutDone: boolean;
  logOutError: Error | null;
  userInfo: IUserInfo | null;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ICatalogue {
  _id: string;
  product_name: string;
  category: string;
  grade: string;
  phone: string;
  email: string;
  address: string;
  room_type: string;
  price: string;
  currency: string;
  hotel: string;
  representative_image: string;
  description: string;
  images: string[];
}

export interface ICatalogueList {
  catalogues: ICatalogue[];
}
