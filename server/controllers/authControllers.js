import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const signup = async (req,res) =>{
    const {name, email, password} = req.body;
    const existingUser = await User.findOne({email});
    if (existingUser) return res.status(400).json({msg: "User Already Exists"});

    const hashed = await bcrypt.hash(password,10);
    const newUser = new User({name,email,password:hashed});
    await newUser.save();
    res.status(201).json({msg: "User Created"})

}

const login = async (req,res) =>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(404).json({msg:"User not Registered"});

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) return res.status(404).json({msg:"Invalid Password"});

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
    res.json({token,user});

}

export  {signup,login};