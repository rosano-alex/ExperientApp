import { AuthState, AuthAction, User } from "./types";

export const initialAuthState: AuthState = {
  status: "bootstrapping",
  isLoggedIn: false,
  user: null,
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "BOOTSTRAP_COMPLETE":
      return {
        ...state,
        status: action.isAuthenticated ? "authenticated" : "unauthenticated",
        isLoggedIn: action.isAuthenticated,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        status: "authenticated",
        isLoggedIn: true,
        user: action.user as User,
      };

    case "LOGOUT":
      return {
        ...state,
        status: "unauthenticated",
        isLoggedIn: false,
        user: null,
      };

    default:
      return state;
  }
}
