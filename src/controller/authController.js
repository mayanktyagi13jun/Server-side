import User from "../models/user.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import sendEmail from "../utils/sendEMail.js";
import crpto from "crypto";

// Handler to send the reset token to the user email @forgot password
const forgetPasswordHandler = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });
  const isUseravailable = await User.findOne({ email });
  if (!isUseravailable)
    return res
      .status(400)
      .json({ message: "Account with this email does not exist" });

  const resetToken = isUseravailable.createPasswordResetToken();
  await isUseravailable.save({ validateBeforeSave: false });

  console.log("reset token", resetToken);

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/user/reset-password/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH/password reset request with your new password to: ${resetUrl}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: isUseravailable.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (error) {
    isUseravailable.resetPasswordToken = undefined;
    isUseravailable.resetPasswordExpire = undefined;
    await isUseravailable.save({ validateBeforeSave: false });
    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

// Handler to reset the password

const resetPasswordHandler = catchAsync(async (req, res, next) => {
  const { resetToken } = req.params;
  const { password } = req.body;
  if (!resetToken || !password)
    return next(new AppError("Token and password are required!"), 400);

  // get user based on token
  const hashedToken = crpto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user)
    return next(
      new AppError("Token is invalid or has expired! Please try again", 400)
    );

  //If token has not expired && user available, set the new password, remove the reset token and reset token expire 😊

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Password reset successful!",
  });
});

export { forgetPasswordHandler, resetPasswordHandler };
