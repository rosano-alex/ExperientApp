import { AuthAction, AuthState } from "./types";

//  Initial state assumes we are bootstrapping.
//  The app must verify credentials
//  before rendering either view stac

export const initialAuthState: AuthState = {
  status: "bootstrapping",
  isLoggedIn: false
};

// Pure reducer
export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "BOOTSTRAP_COMPLETE":
      return {
        status: action.isAuthenticated ? "authenticated" : "unauthenticated",
        isLoggedIn: action.isAuthenticated

      };
    case "LOGIN_SUCCESS":
      return { status: "authenticated", isLoggedIn: true };

    case "LOGOUT":
      return { status: "unauthenticated", isLoggedIn: false };

    default:
      return state;
  }
}
