const express = require ("express");
const { register, login, getAll, supprim  } = require("../controllers/user");
const { registerValidation, validation, loginValidation } = require("../middleware/validator");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.post ('/register', registerValidation(), validation, register)

router.post ('/login', loginValidation(), validation, login)

router.get('/current', isAuth, (req,res) =>{
    res.send (req.user);
})
router.get("/all", getAll)
router.delete("/:_id", supprim)


module.exports = router; 