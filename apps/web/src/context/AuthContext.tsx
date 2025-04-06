import { createContext, useContext, useState, ReactNode } from 'react';
import { Account, AccountType } from '../types/accounts/graphql';

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  session: {
    id: string;
    dateTimeCreated: string;
  };
};

type AuthContextType = {
  tokens: AuthTokens | null;
  login: (data: Account & { password: string }) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [tokens, setTokens] = useState<AuthTokens | null>(null);

  const login = async (input: Account & { password: string }) => {
    let data: AuthTokens;
    try {
      const response = await fetch('http://localhost:4003/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          role: AccountType.Member,
          Authorization: `Basic ${window.btoa(`${input.username}:${input.password}`)}`,
        },
        body: JSON.stringify(input),
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
