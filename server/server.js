const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const server = express();

server.use(
  cors({
    origin: "http://localhost:5000", // adjust to your frontend
    credentials: true,
  }),
);

server.use(express.json());

function makeToken(size = 32) {
  return crypto.randomBytes(size).toString("hex");
}
server.post("/user/login", (req, res) => {
  const { username, password } = req.body;

  // Mock credential check
  if (
    username === undefined ||
    password === undefined ||
    !username ||
    !password
  ) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = makeToken(32);
  const refreshToken = makeToken(64);

  // Access
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false, // this is an issue
    sameSite: "lax",
    path: "/",
  });

  // Refresh
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  // json response
  res.json({
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
  });
});

server.listen(4000, () => {
  console.log(
    "BOGUS auth server running on http://localhost:5000!  NOT REAL.  Sorry!",
  );
});
