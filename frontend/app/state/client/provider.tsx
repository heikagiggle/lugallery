'use client';

import { FC, PropsWithChildren, useCallback, useEffect, useReducer } from 'react';
import { AuthContext, DefaultAuthState } from './context';
import { AuthReducer } from './reducer';
import { AuthStateActionType } from './type';
import Cookies from 'js-cookie';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [{ token }, dispatch] = useReducer(AuthReducer, DefaultAuthState);

  const setToken = useCallback((payload: string | null) => {
    
    dispatch({ payload, type: AuthStateActionType.SET_TOKEN });
    if (!payload) {
      Cookies.remove('AUTH_ACCESS_TOKEN');
      Cookies.remove('AUTH_REFRESH_TOKEN');
    } else {
      Cookies.set('AUTH_ACCESS_TOKEN', payload, {
        expires: 1,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      });
    }
  }, [])

  useEffect(() => {
    const token = Cookies.get('AUTH_ACCESS_TOKEN');
    dispatch({ payload: token, type: AuthStateActionType.SET_TOKEN });
  }, []);

 const user = token ? { name: 'Ella' } : null;  //TODO 

  return (
    <AuthContext.Provider value={{ token, setToken, user }}>
      {children}
    </AuthContext.Provider>
  );
};
