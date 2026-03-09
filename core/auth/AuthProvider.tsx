import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import {
  deleteLoginResponse,
  getLoginResponse,
  setLoginResponse,
} from "./AuthStorage";

import { authReducer, initialAuthState } from "./authReducer";

import { AuthState, LoginResponse } from "./types";
import { isExpired } from "./utils";

interface AuthContextValue {
  state: AuthState;
  signIn(token: LoginResponse): Promise<void>;
  signOut(): Promise<void>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const stored = await getLoginResponse();

        if (!stored) {
          dispatch({
            type: "BOOTSTRAP_COMPLETE",
            isAuthenticated: false
          });
          return;
        }

        const ttl = stored.ttl ? Number(stored.ttl) : 0;

        if (isExpired(ttl)) {
          await deleteLoginResponse();

          dispatch({
            type: "BOOTSTRAP_COMPLETE",
            isAuthenticated: false
          });

          return;
        }

        dispatch({
          type: "BOOTSTRAP_COMPLETE",
          isAuthenticated: true
        });
      } catch {
        dispatch({
          type: "BOOTSTRAP_COMPLETE",
          isAuthenticated: false
        });
      }
    };

    bootstrap();
  }, []);

  const signIn = async (token: LoginResponse) => {
    await setLoginResponse(token);
    dispatch({ type: "LOGIN_SUCCESS" });

  };

  const signOut = async () => {
    await deleteLoginResponse();
    dispatch({ type: "LOGOUT" });
  };

  const value = useMemo(
    () => ({
      state,
      signIn,
      signOut,
    }),
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

