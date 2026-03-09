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



  const user = {
    username: "VShah",
    active: true,
    roleId: 20,
    dateCreated: "2018-03-02T00:00:00.000Z",
    dateModified: "2018-03-02T00:00:00.000z",
    lastName: "Shah",
    firstName: "Viraj",
    displayName: "Viraj Shah",
    jiraUsername: "viraj.shah",
    intacctUserId: "EE-00112",
    userId: 41,
    emailAddress: "vshah@experient.com",
    openAtCurWeeksTimesheet: true,
    activeInterviewer: true,
    createIntacctTimesheet: true,
    roleName: "Developer",
  };

  return new Promise((resolve, reject) => {
    setTimeout(() => {

      if (username.length > 0 && password.length > 0) {

        resolve({
          accessToken: GUID(),
          refreshToken: GUID(),
          ttl: generateTTL(3).toString(),
          userData: user

        });


      } else {
        reject(new Error("Invalid credentials, try again"));
      }
    }, 1255);
  });
}
