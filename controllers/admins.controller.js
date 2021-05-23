const models = require('../models');
const validator = require("fastest-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signUp = async(req,res) => {
    const {firstname,lastname,email,password} = req.body;
    const role = "admin";
  
    try{     
            const userAlreadyExist = await models.Admin.findOne({ where: { email } })
            if(userAlreadyExist) {
                res.status(409).json({
                    status:false,
                    message : "Email already exists!"
                })
                return; 
            }
            const admin = {
                firstname,
                lastname,
                email,
                password,
            }
            // creating a scheme for data validation
            const schema = {
                firstname : {type:"string",optional:false,max:100,trim:true,trimLeft:true,trimRight:true,empty:false,pattern:"^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$"},
                lastname : {type:"string",optional:false,max:100,trim:true,trimLeft:true,trimRight:true,empty:false,pattern:"^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$"},
                email : {type:"email", optional:false,empty:false,trim:true},
                password: {type:"string",optional:false,empty:false,min:7},
            }
            const v =  new validator();
            const validatorResponse = await v.validate(admin,schema)
            if (validatorResponse !== true) {
                res.status(400).json({
                    message : "Validation failed",
                    error : validatorResponse
                })
                return;
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);  
            const newAdminObject = {firstname,lastname,email,password: hashedPassword,role}
            const newAdmin = await models.Admin.create(newAdminObject); 
            if(newAdmin) res.status(201).json({status:true, message: "Admin created successfully!"}) 
    } 
    catch(error){
            res.status(500).json({
                status: false,
                message : "Oga, E Be like say your village people dey your matter",
            })
    }
        
}


const login = async (req,res) => {
    const {email,password} = req.body;
    const user = {
        email,
        password
    }
    // creating a scheme for data validation
    const schema = {
        email : {type:"email", optional:false,empty:false,trimLeft:true,trimRight:true},
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
    else {
        try{
            const admin = await models.Admin.findOne({where:{email}});
            if(admin === null){
                res.status(400).json({
                    status: false,
                    message : "Invalid credentials! ",
                })
            }

            else{
                const passwordMatch = await bcrypt.compare(password,admin.password);
                if(passwordMatch){
                const token = await jwt.sign({
                    email:admin.email,
                    userId:admin.id
                }, process.env.JWT_KEY);   
                    if(token) res.status(200).json({status:true,message:"Admin Login Successfully",id:admin.id,token,firstname:admin.firstname,lastname:admin.lastname,email:admin.email})
                    else{
                        res.status(400).json({
                            status: false,
                            message : "something went wrong while logging you in!",
                        })
                    }
                }
            }
        }
        catch(error){
            res.status(500).json({
                status: false,
                message : "Oga, E Be like say your village people dey your matter",
            })
        }
}
    }
    
    const destroyPost = async (req,res) => {
        const id = req.params.id;
        const userId = req.userData.userId;
        const isAdmin = await models.Admin.findByPk(userId);     
        try
        {   if(isAdmin.role !== 'admin'){
                res.status(401).json({
                    message : "Unauthorized",
                });
                return;
             }
             const result = await models.Post.destroy({where:{id}});
             if (result != 0){ res.status(200).json({
                message : "Post deleted successfully",
                id
            });}
            else{
                res.status(404).json({
                    message : "Post not found"
                });
            }
        }
        catch(error){
            res.status(401).send({
                message:"Unauthorized"
            });
        }
    }

    const destroyUser = async(req,res) => {
        const id = req.params.id;
        const userId = req.userData.userId;
        const isAdmin = await models.Admin.findByPk(userId);     
        try
        {   if(isAdmin.role !== 'admin'){
                res.status(401).json({
                    message : "Unauthorized",
                });
                return;
             }
             const result = await models.User.destroy({where:{id}});
             if (result != 0){ res.status(200).json({
                message : "User deleted successfully",
                id
            });}                        
            else{
                res.status(404).json({
                    message : "User not found"
                });
            }
        }
        catch(error){
            res.status(401).send({
                message:"Unauthorized"
            });
        }
    }






    

module.exports = {
    signUp,
    login,
    destroyPost,
    destroyUser
}


