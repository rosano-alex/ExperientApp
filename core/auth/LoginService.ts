// FAKE login requestx
import { LoginResponse } from "./types";
import { GUID, generateTTL } from "./utils";

// IN PROD ..
//  - This might call fetch/axios
//  - Interceptors would attach cookies
//  - Error mapping would be centralized (datadog)
//  - Error mapping would be centralized (datadog)
//  - Error mapping would be centralized (datadog)
// 
export async function authenticateUser(
  username: string = '',
  password: string = '',
): Promise<LoginResponse> {


  return new Promise((resolve, reject) => {
    setTimeout(() => {

      if (username.length > 0 && password.length > 0) {
        console.log('we are in here')
        resolve({
          accessToken: GUID(),
          refreshToken: GUID(),
          ttl: generateTTL(3).toString()
        });

        console.log('we are in here as well')
      } else {
        reject(new Error("Invalid credentials, try again"));
      }
    }, 1255);
  });
}
