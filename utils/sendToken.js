export const sendToken = (user, statusCode, message, res) => {
  const token = user.generateToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,         // ✅ required for HTTPS
      sameSite: "None",     // ✅ required for cross-site cookies
    })
    .json({
      success: true,
      user,
      message,
      token,
    });
};
