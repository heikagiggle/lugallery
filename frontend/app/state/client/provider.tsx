'use client';

import { FC, PropsWithChildren, useCallback, useEffect, useReducer } from 'react';
import { AuthContext, DefaultAuthState } from './context';
import { AuthReducer } from './reducer';
import { AuthStateActionType } from './type';

export const AccessTokenKey = "accessToken";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [{ token }, dispatch] = useReducer(AuthReducer, DefaultAuthState);

  // Save or remove token from sessionStorage
  const setToken = useCallback((payload: string | null) => {
    dispatch({ payload, type: AuthStateActionType.SET_TOKEN });

    if (payload) {
      sessionStorage.setItem(AccessTokenKey, payload);
    } else {
      sessionStorage.removeItem(AccessTokenKey);
    }
  }, []);

  // Load token from sessionStorage on app start
  useEffect(() => {
    const token = sessionStorage.getItem(AccessTokenKey);
    if (token) {
      dispatch({ payload: token, type: AuthStateActionType.SET_TOKEN });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken}}>
      {children}
    </AuthContext.Provider>
  );
};
