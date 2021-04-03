const express = require('express');
const router = express.Router();
const db = require('../_helpers/db');
const bcrypt = require("bcryptjs");
const config = require("../config.json")
module.exports = router;
// //Scehama import
const User = db.User;

router.post('/register', async (req ,res ,next)=>{
    const reqData = req.body;
      //  console.log(req.body)
    if(await User.findOne({email:reqData.email})){
        res.status(500).json('Errorr')
    }
  const user = new User(reqData);
  if(reqData.password){
    user.hash = bcrypt.hashSync(reqData.password, 10);  
  }
// save user
if(await user.save()){
    res.status(200).json('User save done')
};

});

router.post('/authenticate', async (req ,res ,next)=>{
  const reqData = req.body;

  if(await User.findOne({email:reqData.email , active:false})){
      res.status(500).json('User is not Activated pleas contact admin department')
  }else if(!(await User.findOne({email:reqData.email}))){
    res.status(500).json('There is no sufficient user in the system')
  }
  const FindUser = await User.findOne({email:reqData.email});
  if(FindUser.active == true){
    if(FindUser && bcrypt.compareSync(reqData.password, FindUser.hash)){
          const {hash , ...userWithoutHash} = user.toObject();
          const token = jwt.sign({sub:FindUser.id}, config.secret);
          return {
            ...userWithoutHash,
            token,
            errorStatus:false,
          }
          
    }
  }
  
const user = new User(reqData);
if(reqData.password){
  user.hash = bcrypt.hashSync(reqData.password, 10);  
}
// save user
if(await user.save()){
  res.status(200).json('User save done')
};

});

router.post('/login', async (req, res, next)=>{
  const reqData = req.body;

  if(await User.findOne({email:reqData.email})){
    res.status(500).json('Error')
  }
  const user = new User(reqData);
  if(reqData.password){
    user.hash = bcrypt.hashSync(reqData.password, 10);
  }
  if(await user.save()){
    res.status(200).json('User login done')
};

});



// exports.register = async (req ,res ,next)=>{
//     res.status(200).json({
//         message: "Here we are handling the get request for the products"
//     });
// }