const Admin = require("../models/Admin");
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');


exports.register = async (req, res) =>{
    try {
        const {name, email, password} = req.body
        const foundAdmin = await Admin.findOne({email})
        if (foundAdmin) {
            return res.status(400).send({message:'Email already exists'})
        }

        const saltRounds = 10;
        const hashpassword = await bcrypt.hash(password, saltRounds);

        const newAdmin = new Admin ({...req.body}) ;

        newAdmin.password = hashpassword;   

        await newAdmin.save()

        const token = jwt.sign({
            id: newAdmin._id
        },
        process.env.SECRET_KEY,
        {expiresIn: "1h"}
        );

        res.status(200).send({message:'registered successfully...', admin: newAdmin, token }) 

    }catch (error){
        res.status(400).send({message: "Cannot register admin"});
 
    }
}

exports.login = async (req, res) =>{
    try {
        const {email, password} = req.body;
        const foundAdmin = await Admin.findOne({email})
        if (!foundAdmin) {
            return res.status(400).send({error: [{message:'Bad credential !!!'}]})
        }
        const checkPassword = await bcrypt.compare (password, foundAdmin.password)
        if (!checkPassword){
            return res.status(400).send({error: [{message:'Bad credential !!!'}]})
        }

        const token = jwt.sign({
            id: foundAdmin._id
        },
        process.env.SECRET_KEY,
        {expiresIn: "1h"}
        );
        res.status(200).send({message:'Login successfully...',admin:foundAdmin, token});

    } catch (error) {  
        res.status(400).send({message: "Cannot login admin !!!"})     
    }
};
