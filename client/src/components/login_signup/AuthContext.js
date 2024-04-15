import React, { createContext, useContext, useReducer, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      // Setting localStorage here again as a redundancy in case it's not set at login API response handling
      localStorage.setItem("jwt_token", action.payload.token);
      localStorage.setItem("user_role", action.payload.role);
      return {
        ...state,
        isAuthenticated: true,
        role: action.payload.role,
        token: action.payload.token,
      };
    case "LOGOUT":
      // Clearing all local storage items set during login
      localStorage.removeItem("jwt_token");
      localStorage.removeItem("user_role");
      return {
        ...state,
        isAuthenticated: false,
        role: null,
        token: null,
      };
    case "SET_TOKEN":
      // Directly setting a new token (not typically used but here for completeness)
      localStorage.setItem("jwt_token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const initialState = {
    isAuthenticated: !!localStorage.getItem("jwt_token"), // This will be true if token is not null
    role: localStorage.getItem("user_role"), // Fetch the role from local storage
    token: localStorage.getItem("jwt_token"), // Fetch the token from local storage
  };

  const [authState, dispatch] = useReducer(authReducer, initialState);

  // Effect to log changes - This can be removed in production
  useEffect(() => {
    console.log("Auth State Updated:", authState);
  }, [authState]);

  return (
    <AuthContext.Provider value={{ authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
