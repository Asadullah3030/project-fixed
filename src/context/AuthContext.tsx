// src/context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

// ⚠️ Yeh password sirf aap ko pata hona chahiye
// GitHub pe push karne se pehle apna password set karo
const ADMIN_PASSWORD = 'Dawood$11@';

// Admin ka secret URL - /admin ki jagah yeh use hoga
export const ADMIN_SECRET_PATH = 'admin';

const AUTH_KEY = 'admin';

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
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem(AUTH_KEY) === 'true'
  );

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
