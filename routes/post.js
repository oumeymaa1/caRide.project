const express = require ("express");
const { add, edit, supprim, getAll, getOne} = require("../controllers/post");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.post ('/add',isAuth, add)
router.put ("/:_id", edit)
router.delete("/:_id", supprim)
router.get("/all", getAll)
router.get("/:id", getOne)



module.exports = router; 