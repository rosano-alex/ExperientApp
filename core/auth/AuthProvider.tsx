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

        // no session saved
        if (!stored) {
          dispatch({ type: "BOOTSTRAP_COMPLETE", isAuthenticated: false });
          return;
        }

        const expired = isExpired(Number(stored.ttl))

        if (expired) {
          await deleteLoginResponse();
          dispatch({ type: "LOGOUT" });
          return;
        }

        // token is still valid
        dispatch({ type: "LOGIN_SUCCESS" });

      } catch (e) {
        dispatch({ type: "LOGIN_SUCCESS" });
      }
    };

    bootstrap();
  }, []);

  const bootstrap = async () => {
    let userAuthenticated = false;

    const loginResponse = await getLoginResponse();

    if (loginResponse?.ttl) {
      const ttl = parseInt(loginResponse.ttl);


      if (!isExpired(ttl)) {
        userAuthenticated = true;
      }
    }

    dispatch({
      type: "BOOTSTRAP_COMPLETE",
      isAuthenticated: userAuthenticated,

    });
  };


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

