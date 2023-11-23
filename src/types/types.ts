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
