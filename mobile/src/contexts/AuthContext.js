import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('@RNtoken');

      if (token) {
        setAuthenticated(true);
        api.defaults.headers.Authorization = `Bearer ${token}`;
      } else {
        setAuthenticated(false);
        api.defaults.headers.Authorization = `Bearer ${undefined}`;
      }
    })();
  }, [authenticated]);

  const register = async (response) => {
    login(response);
  };

  const login = async (response) => {
    setAuthenticated(true);

    await AsyncStorage.setItem('@RNtoken', response.data);
  };

  const logout = async () => {
    setAuthenticated(false);

    await AsyncStorage.removeItem('@RNtoken');
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
