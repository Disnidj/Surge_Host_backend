const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require('../models/user.js');

var jwtSecret = "mysecrettoken";

const authUser =  async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-Password");
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
}

const loginUser = async (req, res) => {
  

    const { Email, Password } = req.body;

    try {
        // See if user exists
        let user = await User.findOne({ Email });
 
        if (!user) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Invalid Credentials 2" }] });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);
   
        if (!isMatch) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Invalid Credentials 3" }] });
        }

        //Return jsonwebtoken
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(payload, jwtSecret, { expiresIn: "1 days" }, (err, token) => {
            if (err) throw err;
            res.json({ token , user: user.name , userRole: user.userRole });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};


 const getUsers = async (req, res) => { 
    try {
        const users = await User.find();
                 
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


 const getUser = async (req, res) => { 
    const { id } = req.params;

    try {
        const users = await User.findById(id);
        
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



 const createUser = async (req, res) => {
    const { firstName, lastName, ID, Email, dateOfBirth , PhoneNumber, Password, accountType, status, userRole } = req.body;

    try {
        // See if user exists
        let user = await User.findOne({ Email });

        if (user) {
            res.status(400).json({ errors: [{ msg: " User is already exists" }] });
        }
        user = new User({
            firstName, 
            lastName, 
            ID, 
            Email, 
            dateOfBirth, 
            PhoneNumber, 
            Password, 
            accountType,
            status, 
            userRole
            
        });

        //Encrypt Password
        const salt = await bcrypt.genSalt(10);

        user.Password = await bcrypt.hash(Password, salt);

        await user.save();

        res.status(201).json(user );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


 const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, ID, Email, dateOfBirth , PhoneNumber, Password, accountType, userRole ,status } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

    const updatedUser = { firstName, lastName, ID, Email, dateOfBirth , PhoneNumber, Password, accountType, userRole ,status , _id:id};

    await User.findByIdAndUpdate(id, updatedUser, { new: true });

    res.json(updatedUser);
}


 const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await User.findByIdAndRemove(id);

    res.json({ message: "User deleted successfully." });
}

const getUsersByID = async (req, res) => {
    let id = req.params;
    console.log("ID", id.id);
  
    try {
      const users = await User.findOne({ ID: id.id });
  
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
  }


module.exports ={getUsers,getUser ,deleteUser , createUser , updateUser  , authUser , loginUser, getUser , getUsersByID};