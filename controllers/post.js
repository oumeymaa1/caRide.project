const Post = require("../models/Post");

exports.add = async (req, res) =>{
    try{
        const {name, car, itineraire, phone} = req.body;
        const newPost = new Post({name, car, itineraire, phone, id_user:req.user._id});
        await newPost.save();
        res.status(200).send({message: "Post added", newPost});
        }
        catch(error){
            res.status(400).send({message:" Can not add post !!!", error: error});
        }     
}

exports.edit = async (req, res) =>{
    try{
        const { _id } = req.params;
        const result = await Post.updateOne({_id}, { $set:{...req.body} });
        res.status(200).send({message:"Post updated !!!"});
    
    } catch (error) {
        res 
            .status (400)
            .send({message:"Can not edit Post !!!", error});

    }
}

exports.supprim = async (req, res) =>{
    try{
        const {_id} = req.params;
        await Post.findOneAndDelete({_id});
        res.status(200).send({message: "Post deleted ..."});
    }catch(error){
        res
            .status(400)
            .send({message:"Can not delete Post !!! ", error});
    }
}

exports.getAll = async (req, res) =>{
    try{
        const postsList = await Post.find();
        res
        .status(200)
        .send({message: "Post list ...", postsList});
    } catch (error){
        res
        .status (400)
        .send ({message:"Can not get Post list"} , error);
    }
}

exports.getOne = async (req, res) =>{
    try{
        const post = await Post.findOne({_id:req.params.id});
        res.status(200).send({message: "Post found...", post});
    }
    catch(error){
                res
                .status(400)
                .send({message:"Can not get post !!! ", error});
            }
}





