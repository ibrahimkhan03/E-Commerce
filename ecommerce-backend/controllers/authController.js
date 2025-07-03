const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

 const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "Customer",
    });

    await user.save();
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
};

 const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        console.log(user)
        if(!user) return res.status(404).json({message: 'User not found'});
        console.log(user.password,password)
        const isMatch = await bcrypt.compare(password, user.password);
      
        if(!isMatch) return res.status(401).json({message: 'Invalid credentials'});

        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Login failed'});
    }
}

module.exports = {
    registerUser,
    loginUser,
};