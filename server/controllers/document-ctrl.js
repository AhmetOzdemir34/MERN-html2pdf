const userModel = require("../models/user-model");
const documentModel = require("../models/document-model");
const sha256 = require('sha256');

const createDoc = async(req,res) => {
    try{
        const {title, content} = req.body;
        const crypted = await sha256(title+" "+content+" "+req.user._id+Date.now());
        const newDoc = await documentModel.create({
            title:title,
            content:content,
            sha256: crypted,
            creatorId: req.user._id
        });
        
        const findedUser = await userModel.findById(req.user._id);
        findedUser.documents.push(newDoc);
        await findedUser.save();
        
        return res.status(201).json({findedUser});
    }catch(err){
        return res.status(500).json({message:err.message});
    }
};

const getUser = async(req,res) => {
    try{
        const user = req.user;
        const findedUser = await userModel.findById(user._id).populate( 'documents', ["title"] );
        return res.json(findedUser);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

// clientside do not use this function for now. Wait for next commit.
const getDoc = async(req,res) => {
    try{
        const key = req.params;
        const findedDoc = await userModel.findById(req.user.id);

        return res.json(findedDoc);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

module.exports = {
    createDoc, getUser, getDoc
};