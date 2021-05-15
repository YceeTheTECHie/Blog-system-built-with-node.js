const models = require('../models');
const validator = require("fastest-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signUp = async(req,res) => {
    const {firstname,lastname,email,password} = req.body;
  
    try{     
            const userAlreadyExist = await models.User.findOne({ where: { email } })
            if(userAlreadyExist) {
                res.status(409).json({
                    status:false,
                    message : "Email already exists!"
                })
                return;
            }
            const user = {
                firstname,
                lastname,
                email,
                password
            }
            // creating a scheme for data validation
            const schema = {
                firstname : {type:"string",optional:false,max:100,trim:true,trimLeft:true,trimRight:true,empty:false,pattern:"^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$"},
                lastname : {type:"string",optional:false,max:100,trim:true,trimLeft:true,trimRight:true,empty:false,pattern:"^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$"},
                email : {type:"email", optional:false,empty:false,trim:true},
                password: {type:"string",optional:false,empty:false,min:7},
            }
            const v =  new validator();
            const validatorResponse = await v.validate(user,schema)
            if (validatorResponse !== true) {
                res.status(400).json({
                    message : "Validation failed",
                    error : validatorResponse
                })
                return;
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);  
            const newuserObject = {firstname,lastname,email,password: hashedPassword}
            const newUser = await models.User.create(newuserObject); 
            if(newUser) res.status(201).json({status:true, message: "user created successfully!"}) 
    } 
    catch(error){
            res.status(500).json({
                status: false,
                message : "Oga, E Be like say your village people dey your matter",
            })
    }
        
    
        
}

module.exports = {
    signUp
}


