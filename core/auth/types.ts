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



export interface User {
  username: string;
  active: boolean;
  roleId: number;
  dateCreated: string;
  dateModified: string;
  lastName: string;
  firstName: string;
  displayName: string;
  jiraUsername: string;
  intacctUserId: string;
  userId: number,
  emailAddress: string;
  openAtCurWeeksTimesheet: boolean;
  activeInterviewer: boolean;
  createIntacctTimesheet: boolean;
  roleName: string;
}



export interface LoginResponse {
  accessToken: string | null;
  refreshToken: string | null;
  ttl: string | null;
  userData?: User;
}

