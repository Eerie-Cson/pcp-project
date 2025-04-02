import { createContext, useContext, useState, ReactNode } from 'react';
import { Account } from '../types/graphql';

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  session: {
    id: string;
    dateTimeCreated: string;
  };
};

type AuthContextType = {
  tokens?: AuthTokens | null;
  user?: Account | null;
  login: (data: Account & { password: string }) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [tokens, setTokens] = useState<AuthTokens | null>();
  const [user, setUser] = useState<Account | null>();

  const login = async (credentials: { username: string; password: string }) => {
    let data: AuthTokens;
    try {
      const response = await fetch('http://localhost:4003/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${window.btoa(`${credentials.username}:${credentials.password}`)}`,
        },
        body: JSON.stringify(credentials),
      });

      data = await response.json();
    } catch (error) {
      console.log(error);
      throw error;
    }

    setTokens(data);
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
  };

  return (
    <AuthContext.Provider
      value={{
        tokens,
        user,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
