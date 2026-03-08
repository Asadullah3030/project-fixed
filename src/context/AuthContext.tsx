// src/context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

export const ADMIN_SECRET_PATH = 'admin';
const ADMIN_PASSWORD = 'Dawood$11@';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  // No sessionStorage — har baar page load pe login chahiye
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
