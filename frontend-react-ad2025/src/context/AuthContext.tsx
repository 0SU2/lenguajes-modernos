import { createContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { api } from "../services/api";

type User = {
  id     : string;
  usuario: string;
  nombre : string;
}

type AuthContextType = {
  token           : string | null
  user            : User | null
  isAuthenticated : boolean
  login           : (usuario     : string, password: string) => Promise<void>
  logout          : () => void
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {}
})

export function AuthProvider({children}: {children:React.ReactNode}) {
  const [ token, setToken ] = useState<string | null>(() => localStorage.getItem('token'));
  const [ user, setUser ] = useState<User | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<User>(token);
        setUser(decoded);
        localStorage.setItem('token', token);
      } catch (error) {
        console.log('error => ', error)
        setUser(null);
        localStorage.removeItem('token');
      }
    } else {
      setUser(null);
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = async(usuario: string, password: string) => {
    const { data } = await api.post('/empleados/login', { usuario, password });
    if (!data?.ok || !data?.token) {
      throw new Error(data?.message || 'Credenciales invalidas');
    }
    setToken(data.token)
  }

  const logout = () => {
    setToken(null);
  }

  const value = useMemo(() => ({
    token,
    user,
    isAuthenticated: Boolean(token),
    login,
    logout,
  }), [token, user]);

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
}
