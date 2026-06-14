import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // empty validation
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const user = await User.create({
      userName,
      email: email.toLowerCase(),
      password,
      loggedIn: false,
    });

    
    res.status(201).json({
        message: "User created successfully",
        user: {_id: user._id, email: user.email, username: user.userName}
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const userLogin = async(req, res) => {
    try {
        // check if user already exists
        const { email, password } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() })
        console.log("entered pass", password);
        console.log("db password", user.password);
        if(!user){
            res.status(404).json({
                message: "User doesn't exists."
            })
        };

        // compare password
        const isMatched = await user.comparePassword(password);
        if(!isMatched) return res.status(400).json({
            message: "Invalid password."
        }) 

        res.status(200).json({
            message: 'User Logged In.',
            user: {
                id: user._id,
                email: user.email
            }
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal server error."
        })
    }
}

const userLogout = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({email});

        if(!user) return res.status(404).json({
            message: "User does not exist."
        })

        res.status(200).json({
            message: "Logout successful."
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error."
        })
    }
}

export {
    registerUser,
    userLogin,
    userLogout
}