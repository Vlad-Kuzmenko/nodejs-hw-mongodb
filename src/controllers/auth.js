import {
  loginUser,
  logoutUser,
  refreshUserSessoin,
  registerUser,
  resetPassword,
  sendResetEmail,
} from "../services/auth.js";

export const setupSession = (res, session) => {
  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie("sessionId", session.userId, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};

export const registerController = async (req, res) => {
  const { email, password, name } = req.body;

  const newUser = await registerUser({ email, password, name });

  const { password: _, ...userData } = newUser.toObject();

  res.status(201).json({
    status: 201,
    message: "Successfully registered a user!",
    data: userData,
  });
};

export const loginController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: "Successfully logged in an user!",
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie("sessionId").clearCookie("refreshToken").status(204).send();
};

export const refreshUserSessoinController = async (req, res) => {
  const session = await refreshUserSessoin({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: "Successfully refreshed a session!",
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const sendResetEmailController = async (req, res) => {
  await sendResetEmail(req.body.email);

  res.json({
    message: "Reset password email has been successfully sent.",
    status: 200,
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);

  res.json({
    message: "Password was successfully reset",
    status: 200,
    data: {},
  });
};
