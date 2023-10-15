import User from "../models/user.js";

//@desc Register a user
//@route POST /api/v1/user/register
//@access public
const register = async (req, res) => {
  const { firstname, lastname, email, password, mobile } = req.body;

  if (!firstname || !lastname || !email || !password)
    return res
      .status(400)
      .json({ message: "Please enter all required field." });

  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error, message: error.message });
  }
};

//@desc Login a user
//@route POST /api/v1/user/login
//@access public
const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  const foundUser = await User.findOne({ email: email }).exec();
  if (!foundUser) return res.status(401)
  .json({ message: "You are not authorized for login" }); //Unauthorized
};

export { register, handleLogin };
