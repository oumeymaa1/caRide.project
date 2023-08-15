const jwt = require("jsonwebtoken")



const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers ["authorization"]
        if (!token) {
            return res.status(401).send({errors: [{message: "not authorized"}]})
        }
        const decoded = jwt.verify( token, process.env.SECRET_KEY)
        const foundAdmin = await Admin.findOne({_id : decoded.id})
    
        if (!foundAdmin) { 
        return res.status(401).send({errors: [{message: "Not authorized !!!"}]});
        }
        req.admin = foundAdmin
        next ();
    } catch (error) {
        return res.status(401).send({errors: [{message:"Not authorized !!!"}]});
    }
    }
    
    module.exports = isAdmin; 