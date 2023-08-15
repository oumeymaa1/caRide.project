const express = require ("express");
const { register, login } = require("../controllers/admin");
const { loginValidation, validation, registerValidation } = require("../middleware/validator");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

router.post ('/register', registerValidation(), validation, register)

router.post ('/login', loginValidation(), validation, login)

router.get('/current', isAdmin, (req,res) =>{
    res.send (req.admin);
})


module.exports = router; 

