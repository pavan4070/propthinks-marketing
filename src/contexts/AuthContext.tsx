'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// =============================================================================
// Types
// =============================================================================

interface AuthUser {
  id: number;
  email: string;
  role: string;
  full_name: string;
  is_verified: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string, phone: string, role: string, city: string, state: string, otpCode: string) => Promise<void>;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}

// =============================================================================
// Context
// =============================================================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// =============================================================================
// Provider Component
// =============================================================================

interface AuthProviderProps {
  children: ReactNode;
}

const ACCESS_TOKEN_KEY = 'propthinks_access_token';
const USER_KEY = 'propthinks_user';

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);

    if (storedToken && storedUser) {
      try {
        setAccessToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://web-production-43694.up.railway.app/api/v1';
    
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // Include cookies for refresh token
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }

    const data = await response.json();
    
    // Store access token and user data
    setAccessToken(data.access_token);
    setUser(data.user);
    
    localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  };

  const signup = async (
    email: string,
    password: string,
    fullName: string,
    phone: string,
    role: string,
    city: string,
    state: string,
    otpCode: string
  ) => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://web-production-43694.up.railway.app/api/v1';
    
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        full_name: fullName,
        phone,
        role,
        city,
        state,
        otp_code: otpCode,
      }),
      credentials: 'include', // Include cookies for refresh token
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Signup failed');
    }

    const data = await response.json();
    
    // Store access token and user data
    setAccessToken(data.access_token);
    setUser(data.user);
    
    localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    
    // TODO: Call backend logout endpoint to invalidate refresh token
  };

  const refreshAuth = async () => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://web-production-43694.up.railway.app/api/v1';
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include', // Send refresh token cookie
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      
      setAccessToken(data.access_token);
      setUser(data.user);
      
      localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    } catch (error) {
      console.error('Failed to refresh token:', error);
      logout();
    }
  };

  const value: AuthContextType = {
    user,
    accessToken,
    isAuthenticated: !!user && !!accessToken,
    isLoading,
    login,
    signup,
    logout,
    refreshAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
