/** Fnite state machine
 */
export type AuthStatus =
  | "bootstrapping" // App launch; checking persisted token
  | "authenticated" // User session valid
  | "unauthenticated"; // No valid session

/**
 * Single source of truth 
 */
export interface AuthState {
  status: AuthStatus;
  isLoggedIn: boolean;
}

// These are the ONLY ways auth state may changes
export type AuthAction =
  | { type: "BOOTSTRAP_COMPLETE"; isAuthenticated: boolean }
  | { type: "LOGIN_SUCCESS" }
  | { type: "LOGOUT" };


export interface LoginResponse {
  accessToken: string | null;
  refreshToken: string | null;
  ttl: string | null;
}
