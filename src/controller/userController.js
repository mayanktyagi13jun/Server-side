import User from "../models/user.js";
import { generateToken } from "../utils/generateToken.js";
import  AppError  from "../utils/appError.js";
import catchAsync from '../utils/catchAsync.js'

//@desc Register a user
//@route POST /api/v1/user/register
//@access public
const register = catchAsync(async (req, res, next) => {
  const { firstname, lastname, email, password, mobile } = req.body;

  if (!firstname || !lastname || !email || !password)
    return res
      .status(400)
      .json({ message: "Please enter all required field." });

  // try {
    /*
     * Currently we are not checking for duplicate emails in the db because in User Schema we are using email as unique.
     * check for duplicate usernames in the db
     * const duplicate = await User.findOne({ email: email }).exec();
     * if (duplicate) return res.sendStatus(409); //Conflict
     */
    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
      mobile,
    });
    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  // } catch (error) {
  //   //console.log(error);
  //   // res.status(500).json({ error: error, message: error.message });
  //   return next(new AppError("fuck off", 500));
  // }
});

//@desc Login a user and generate accces, refresh token
//@route POST /api/v1/user/login
//@access public
const handleLogin = async (req, res) => {
  const cookies = req.cookies;
  console.log(`cookie available at login: ${JSON.stringify(cookies)}`);

  const cookieOptions = {
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "prod") cookieOptions.secure = true;

  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  const foundUser = await User.findOne({ email: email }).exec();
  console.log(`foundUser: ${foundUser}`);
  if (!foundUser || !(await foundUser.comparePassword(password)))
    return res
      .status(401)
      .json({ message: "You are not authorized for login" }); //Unauthorized

  let tokenType = "Access";

  const accessToken = generateToken(
    { email, userid: foundUser._id },
    tokenType
  );

  tokenType = "Refresh";
  const newRefreshToken = generateToken(
    { email, userid: foundUser._id },
    tokenType
  );

  let newRefreshTokenArray = !cookies?.jwt
    ? foundUser.refreshToken
    : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);

  if (cookies?.jwt) {
    /* 
      Scenario added here: 
          1) User logs in but never uses RT and does not logout 
          2) RT is stolen
          3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
      */
    const refreshToken = cookies.jwt;
    const foundToken = await User.findOne({ refreshToken }).exec();

    // Detected refresh token reuse!
    if (!foundToken) {
      console.log("attempted refresh token reuse at login!");
      // clear out ALL previous refresh tokens
      newRefreshTokenArray = [];
    }

    res.clearCookie("jwt", cookieOptions);
  }

  // Saving refreshToken with current user 
  foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
  const result = await foundUser.save();
  console.log(result);

  cookieOptions.maxAge =  60 * 60 * 1000; // 1 hour
  res.cookie("jwt", newRefreshToken, cookieOptions);

  return res.status(200).json({ message: "Login successful", refreshToken: newRefreshToken, accessToken: accessToken });
};

export { register, handleLogin };
