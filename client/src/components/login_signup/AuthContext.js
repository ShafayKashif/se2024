import React, { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true, role: action.payload.role };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, role: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, { isAuthenticated: false, role: null });

  return (
    <AuthContext.Provider value={{ authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
