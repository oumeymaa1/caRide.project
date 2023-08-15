const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');

exports.register = async (req, res) =>{
try {
    const {name, email, password, phone} = req.body
    const foundUser = await User.findOne({email})
    if (foundUser) {
        return res.status(400).send({message:'Email already exists'})
    } 

    const saltRounds = 10;
    const hashpassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User ({...req.body}) ;

    newUser.password = hashpassword;   

    await newUser.save()
    
    const token = jwt.sign({
        id: newUser._id
    },
    process.env.SECRET_KEY,
    {expiresIn: "1h"}
    );
   


    res.status(200).send({message:'registered successfully...', user: newUser, token}) 
} catch (error) {
    res.status(400).send({message: "Cannot register user"});
}
};

exports.login = async (req, res) =>{
try {
    const {email, password} = req.body;
    const foundUser = await User.findOne({email})

    if (!foundUser) {
        return res.status(400).send({error: [{message:'Bad credential !!!'}]})
    }
    const checkPassword = await bcrypt.compare (password, foundUser.password)
    if (!checkPassword){
        return res.status(400).send({error: [{message:'Bad credential !!!'}]})
    }
    
    const token = jwt.sign({
        id: foundUser._id
    },
    process.env.SECRET_KEY,
    {expiresIn: "1h"}
    );

    res.status(200).send({message:'Login successfully...',user:foundUser, token});

} 
catch (error) {
    res.status(400).send({message: "Cannot login user !!!"})

}
}

exports.getAll = async (req, res) =>{
    try{
        const userList = await User.find();
        res
        .status(200)
        .send({message: "User list ...", userList});
    } catch (error){
        res
        .status (400)
        .send ({message:"Can not get user list"} , error);
    }
}

exports.supprim = async (req, res) =>{
    try{
        const {_id} = req.params;
        await User.findOneAndDelete({_id});
        res.status(200).send({message: "User deleted ..."});
    }catch(error){
        res
            .status(400)
            .send({message:"Can not delete User !!! ", error});
    }
}