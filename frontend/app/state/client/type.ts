export interface IAuthState {
  token?: string | null;
  setToken: (token: string | null) => void;
   user?: { name: string } | null; //TODO 
}

export enum AuthStateActionType {
  SET_TOKEN,
}

export interface Action<T, R> {
  payload?: T | null;
  type: R;
}
