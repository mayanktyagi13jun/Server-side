import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js";

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log(`cookie available at refresh: ${JSON.stringify(cookies)}`);
  const cookieOptions = {
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "prod") cookieOptions.secure = true;
  res.clearCookie("jwt", cookieOptions);
  if (!cookies?.jwt)
    return res
      .status(401)
      .json({ message: "You are not authorized for login" });

  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();

  // Detected refresh token reuse!
  if (!foundUser) {
    jwt.verify(refreshToken, process.env.APP_SECRET, async (err, decoded) => {
      console.log(`decoded: ${JSON.stringify(decoded)}`); // { email: 'test', iat: 1626954769, exp: 1626958369 }
      if (err) return res.sendStatus(403); //Forbidden
      console.log("attempted refresh token reuse!");
      const hackedUser = await User.findOne({
        email: decoded.email,
      });
      hackedUser.refreshToken = [];
      const result = await hackedUser.save();
      console.log(result);
    });
    return res.sendStatus(403); //Forbidden
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  jwt.verify(refreshToken, process.env.APP_SECRET, async (err, decoded) => {
    if (err) {
      console.log("expired refresh token");
      foundUser.refreshToken = [...newRefreshTokenArray];
      const result = await foundUser.save();
      console.log(result);
    }

    if (err || foundUser.email !== decoded.email) return res.sendStatus(403);

    let tokenType = "Access";
    const accessToken = generateToken({ email: decoded.email, userid: foundUser._id }, tokenType);
    
    tokenType = "Refresh";
   
    const newRefreshToken = generateToken({ email: decoded.email, userid: foundUser._id }, tokenType);

    // Saving refreshToken with current user
    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await foundUser.save();

    // Creates Secure Cookie with refresh token
    cookieOptions.maxAge = 24 * 60 * 60 * 1000;
    res.cookie('jwt', newRefreshToken, cookieOptions);

    res.json({accessToken, newRefreshToken })

  });
};

export default handleRefreshToken;
