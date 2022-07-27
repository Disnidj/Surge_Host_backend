const express = require('express');
const { request } = require('express');
const Notes = require('../models/notes');

const router = express.Router();

//save note

router.post('/note/save',(req,res)=>{

    let newNotes = new Notes(req.body);

    newNotes.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Note saved successfully"
        });
    });
});

//get all note
router.get('/allNotes',(req,res)=>{
    Notes.find().exec((err,Notes)=>{
        if(err){
            return res.status(400).json({
            error:err    
            });
        }
        return res.status(200).json({
            success:true,
            existingNotes:Notes
        });
    });
});

//get a specific note

router.get("/note/:id",(req,res)=>{
    let noteId = req.params.id;

    Notes.findById(noteId,(err,note)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }
        return res.status(200).json({
            success:true,
            note
        });
    });
});

//update notes

router.put('/note/update/:id',(req,res)=>{
    Notes.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,note)=>{
            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Succesfully"
            });
        }
    );
});


//delete notes

router.delete('/note/delete/:id',(req,res)=>{
    Notes.findByIdAndRemove(req.params.id).exec((err,deletedNote) => {

        if(err) return res.status(400).json({
            message:"Delete unsuccesful",err
        });

        return res.json({
            message:"Delete Succesfull",deletedNote
        });
    });
});

module.exports = router;