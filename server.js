//import dependancies
const express = require('express');
const mongoose = require('mongoose');
const bodyPaser=require('body-parser');
const app = express();
const cors=require('cors');

//import routs
const userRoutes = require ('./routes/userRoutes');
const noteRoutes = require ('./routes/noteRoutes');


//app middleware
app.use(bodyPaser.json());
app.use(cors());
app.use(express.json());

//rout middleware
app.use(userRoutes);
app.use(noteRoutes);

//port
const PORT = 8000;
const DB_URL='mongodb+srv://Disni:disni123@clusteruserrole.etmuf.mongodb.net/SurgeAssignment?retryWrites=true&w=majority'
//connect db
mongoose.connect(DB_URL)
.then(() => {
    console.log('DB connected');
})
.catch((err)=> console.log('DB connection error',err));

app.listen(PORT, ()=>{
    console.log(`App is running on ${PORT}`);
});











