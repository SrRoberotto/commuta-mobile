import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api-common';

interface AuthState {
  access_token: string;
}

interface SignCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  access_token: string;
  loading: boolean;
  signIn(credentials: SignCredentials): Promise<void>;
  signOut(): void;
}

console.log ("Tudo certo X");
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token] = await AsyncStorage.multiGet([
        '@GoBarber:token',
      ]);

      if (token[1]) {
        setData({ access_token: token[1] });
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const device_name = "pedro-B450MH";
    const response = await api.post('/login', {
      email,
      password,
      device_name
    });

    const { access_token } = response.data;
    console.log ("Token:", access_token);

    await AsyncStorage.multiSet([
      ['@GoBarber:token', access_token],
    ]);

    setData({ access_token });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token']);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ access_token: data.access_token, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  console.log ("Tudo certo A");
  const context = useContext(AuthContext);
  console.log ("Tudo certo B");
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  } else {
    console.log ("Tudo certo 2");
  }
  return context;
}