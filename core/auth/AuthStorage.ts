import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginResponse } from "./types";
const ACCESS = "access";
const REFRESH = "refresh";
const TTL = "ttl";
const data = "data";

/**
 * STORAGE METHOD
 */
export const setLoginResponse = async (
  response: LoginResponse,
): Promise<void> => {
  try {
    await AsyncStorage.setItem(ACCESS, response.accessToken as string);
    await AsyncStorage.setItem(REFRESH, response.refreshToken as string);
    await AsyncStorage.setItem(TTL, response.ttl as string);
  } catch (e) {}
};

/**
 * RETRIEVAL METHOD
 */

export const getLoginResponse = async (): Promise<LoginResponse | null> => {
  try {
    const access = (await AsyncStorage.getItem(ACCESS)) ?? null;
    const refresh = (await AsyncStorage.getItem(REFRESH)) ?? null;
    const ttl = (await AsyncStorage.getItem(TTL)) ?? null;

    if (!access && !refresh && !ttl) return null;

    const value = { accessToken: access, refreshToken: refresh, ttl: ttl };
    return value;
  } catch (e) {
    // if we are here, it's likely we are
    // running the app for the firtst time
    return null;
  }
};

/**
 * DELETE METHOD
 */
export const deleteLoginResponse = async (): Promise<void | null> => {
  try {
    await AsyncStorage.removeItem(ACCESS);
    await AsyncStorage.removeItem(REFRESH);
    await AsyncStorage.removeItem(TTL);
  } catch (e) {
    return null;
  }
};
