import jwt from "jsonwebtoken";

export const generateToken = (payload, type) => {
  if (type === "Access") {
    return jwt.sign(payload, process.env.APP_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN_Access,
    }); 
  }else if (type === "Refresh"){
    return jwt.sign(payload, process.env.APP_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN_Refresh,
    });
  } else {
    throw new Error("Invalid token type");
  }
};
