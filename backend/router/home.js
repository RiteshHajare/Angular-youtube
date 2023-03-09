const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
let User = require('../model/user');
const app = express();
const router = express.Router();
var jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/tokenVerify');


router.route('/signup').post((req,res)=>{

  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        if(!err){
          const user = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash
          });

          const token = jwt.sign({ email:req.body.email }, process.env.Private_Key);

          user.save().then(()=>{
            res.json({success:true, message:"Success",token,username:req.body.username});
          },(err)=>{
            res.json({success:false, message:err});
          })
        }else console.log(err);
      });
  });
})


router.route("/login").post(async(req,res)=>{
  const {email,password} = req.body;

  const user = await User.findOne({email});
  if(user){
    bcrypt.compare(password, user.password, function(err, result) {
      if(err)  console.log(err);
      if(result){
        const token = jwt.sign({ email:req.body.email }, process.env.Private_Key);
        res.json({success:result,token,message:"Successfully LoggedIn",username:user.username});
      }else res.json({success:result,message:" LogIn Failed"});
    });
  }else res.json({success:false,message:"User doesnt exists"});
})


router.post('/uploadimg',verifyToken,(req,res)=>{
  const{url} = req.body;
  console.log(req.email);
  if(req.email){
    User.findOne({email:req.email}).then((user)=>{
      user.videos.push({video:url});
      user.save().then(()=>{
        res.json({success:true,message:"video Successfully saved"});
      })

    })
  }else res.json({success:false,message:"Err in saving video"})

});

router.get('/allvideos',async(req,res)=>{
    var allVideos=[];
    await User.find({}).then((users)=>{
      users.forEach(user=>{
        user.videos.forEach(video=>{
          allVideos.push({user:user.username,video:video.video,videoId:video._id,comments:video.comments});
        })
      })
    })

    res.json({success:true,videos:allVideos})
});

router.post('/uploadcomment',verifyToken,(req,res)=>{
  const{comment,videoId,myself} = req.body;

  User.find({}).then(users=>{
    users.forEach(user=>{
      user.videos.forEach(video=>{
        if(video._id==videoId) {
          // console.log(video._id," ",videoId);
          video.comments.push({user:myself ,comment});
          user.save().then(()=>{
            res.json({success:true,message:"comment posted."});
          },(err)=>{
             res.json({success:false,message:"Video not found"});
          })
        }
      })
    })

  })


});


module.exports = router;
