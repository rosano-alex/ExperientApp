import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import crypto from "crypto";

const serverApp = express();

/*
CONFIG
*/
const HOST = "127.0.0.1";
const PORT = 3001;

const ACCESS_TTL = 60 * 1000; // 1 minute
const REFRESH_TTL = 10 * 60 * 1000; // 10 minutes

const SECRET = "MYOHMY";

/*
MOCK USER
*/
const FakeUser = {
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

/*
SIGNATURE HELPER
*/
function encrypt(value: string) {
  return crypto.createHmac("sha256", SECRET).update(value).digest("hex");
}

/*
CREATE TOKEN
format: base64(exp).signature
*/
function createToken(ttl: number) {
  const expires = String(Date.now() + ttl);
  const data = Buffer.from(expires).toString("base64");
  const sig = encrypt(data);
  return `${data}.${sig}`;
}

/*
VALIDATE TOKEN
*/
function authorizeJWT(token?: string) {
  if (!token) {
    return false;
  }
  try {
    const [payload, signature] = token.split(".");
    if (!payload || !signature) return false;
    const expected = encrypt(payload);
    if (expected !== signature) return false;
    const exp = Number(Buffer.from(payload, "base64").toString());
    return Date.now() < exp;
  } catch {
    return false;
  }
}

/*
MIDDLEWARE
*/
serverApp.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

serverApp.use(express.json());
serverApp.use(cookieParser());

/*
LOGIN
*/
serverApp.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      error: "Username and password required",
    });
  }
  const accessToken = createToken(ACCESS_TTL);
  const refreshToken = createToken(REFRESH_TTL);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: ACCESS_TTL,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: REFRESH_TTL,
  });

  return res.json(FakeUser);
});

// validate
serverApp.get("/auth/me", (req, res) => {
  const token = req.cookies.accessToken;

  if (!authorizeJWT(token)) {
    return res.status(401).json({
      error: "Access token expired",
    });
  }

  return res.json(FakeUser);
});

/*
REFRESH ACCESS TOKEN
*/
serverApp.post("/auth/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!authorizeJWT(refreshToken)) {
    return res.status(401).json({
      error: "Refresh token expired",
    });
  }

  const newAccessToken = createToken(ACCESS_TTL);

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: ACCESS_TTL,
  });

  return res.json(FakeUser);
});

/*
LOGOUT
*/
serverApp.post("/auth/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return res.json({ message: "Logged out" });
});

/*
START SERVER
*/
serverApp.listen(PORT, HOST, () => {
  console.log(
    "\n⚡⚡⚡ " +
      `Mock auth server running at http://${HOST}:${PORT}` +
      " ⚡⚡⚡\n",
  );
});
