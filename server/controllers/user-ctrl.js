const userModel = require("../models/user-model");
require('dotenv').config();
const jwt = require('jsonwebtoken');

const register = async (req,res)=> {
    try{
        const {username, email, password, confirmPassword} = req.body;
        if(confirmPassword != password) {
            return res.status(400).json({message:'The passwords do not match'});
        }
        const user = new userModel({
            username:username, email:email, password:password
        });
        await user.save();
        return res.status(201).json(user);
    }catch(err){
        return res.json({statusCode: 500, message: err.message});
    }
}

const login = async (req,res)=> {
    try{
        const  {email, password} = req.body;
        const user = await userModel.findOne({email:email, password:password});
        if(!user) return res.status(400).json({statusCode: 400, user:null, access:false, message:"The Account does not exist!"});
        
        const token = await jwt.sign({key:user},process.env.SECRET, {expiresIn:'1d'});
    
        return res.cookie('token',token,{
            httpOnly: true,
            sameSite: "none",
            secure: true
            }).status(201).json({user:user, access:true,message:"Logged in!"});
    }catch(err){
        return res.status(500).json({statusCode: 500, user:null, access:false, message: err.message});
    }
}

const loggedin = async (req,res)=> {
    try{
        const token = req.cookies.token;
        if(!token) return res.status(400).json({statusCode: 400, user:null, access:false});
        const result = await jwt.verify(token, process.env.SECRET);
        
        const user = await userModel.findById(String(result.key._id));
        
        return res.status(200).json({access:true, user: user});
    }catch(err){
        return res.json({statusCode: 500, access:false, user:null, message: err.message});
    }
}

const logout = async (req,res)=> {
    try{
        return res.cookie('token','').status(200).json({message:"Log out."});
    }catch(err){
        return res.json({statusCode: 500, message: err.message});
    }
}

module.exports = {
    register,
    login,
    loggedin,
    logout
}