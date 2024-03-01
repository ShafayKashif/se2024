import React, { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true, role: action.payload.role, token: action.payload.token };
    case 'LOGOUT':
      localStorage.removeItem('token'); // Clear token on logout
      return { ...state, isAuthenticated: false, role: null, token: null };
    case 'SET_TOKEN': // Added to directly set a token (optional if you're managing token in LOGIN action)
      localStorage.setItem('token', action.payload.token); // Save token to local storage
      return { ...state, token: action.payload.token };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const initialState = {
    isAuthenticated: false,
    role: null,
    token: localStorage.getItem('token') || null, // Initialize state with token from local storage if available
  };

  const [authState, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};