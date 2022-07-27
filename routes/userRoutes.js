// impor dependancies
const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");
const { check }= require("express-validator");
const {getUsers, getUser, deleteUser, createUser, updateUser, authUser, loginUser}= require("../Controller/userController");

var jwtSecret = "mysecrettoken";


router.post("/createUser",createUser);
router.get("/getAllUsers",getUsers);
router.get("/getUserById/:id",getUser);
router.delete("/deleteUser/:id",deleteUser);
router.patch("/updateUserById/:id",updateUser);



router.get("/auth", auth,authUser);

router.post(
	"/signin",
	[
		check("email", "Please include a valid email").isEmail(),
		check("password", "Password is required").exists(),
	],
	loginUser);


module.exports = router;