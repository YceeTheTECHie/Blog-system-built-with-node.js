const validator = require("fastest-validator");
const models = require("../models");

const createPosts =  async (req,res) => {
    const {title,content,imageUrl,category_id} = req.body;
    const post = {
        title,
        content,
        imageUrl,
        categoryId :category_id,
        userId : req.userData.userId
    }
    // creating a scheme for data validation
    const schema = {
        title : {type:"string",optional:false,max:100 },
        content : {type:"string", optional:false,max:1000},
        imageUrl : {type:"string", optional:true},
        categoryId: {type:"number",optional:false}
    }

    const v = new validator();
    const validatorResponse =  v.validate(post,schema);

    if (validatorResponse !== true) {
        res.status(400).json({
            message : "Validation failed",
            error : validatorResponse
        })
    }   
    try {
        const category = await models.Category.findByPk(category_id);
        console.log(category);
        if(category == null){
                res.status(400).json({
                status : false,
                message : "Invalid Category id",
            })
        }
         else{
                const result = await models.Post.create(post);
                if(result){
                    res.status(201).json({
                    status : true,
                    message : "posts created successfully",
                    post : result
                })       
            }
        }
    }
   catch(error){
        res.status(500).json({
            status : false,
            message : "We encountered an error saving your post, try again later.",
            error
        })
   }     
        
        
} 
         

const showPost = (req,res) => {
    const id = req.params.id;
    models.Post.findByPk(id).then(result => {
        if (result == null)  res.status(404).json({ message: "Post not found!"})
        else{
          res.status(200).json(result)
        }
    })
    .catch(error => {
        res.status(500).json({
            status : false,
            message : "Oops!, something went wrong",
        })

    })
}

const index = (req,res) => {
    models.Post.findAll().then(result => {
        if(result != null)res.status(200).json(result)
        else{
            res.status(200).json({
                message : "You have not created any Post yet!"
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            status : false,
            message : "Oops!, something went wrong",
        });
    })
}

const update = async (req,res) => {
    const id = req.params.id;
    const {title,content,imageUrl,category_id} = req.body;
    const updatedPost = {
        title,
        content,
        imageUrl,
        categoryId:category_id
    }


    const userId = req.userData.userId;
      // creating a scheme for data validation
      const schema = {
        title : {type:"string",optional:false,max:100 },
        content : {type:"string", optional:false,max:1000},
        imageUrl : {type:"string", optional:true},
        categoryId: {type:"number",optional:false}
    }

    const v = new validator();
    const validatorResponse = await v.validate(updatedPost,schema);


    if (validatorResponse !== true) {
        res.status(400).json({
            message : "Validation failed",
            error : validatorResponse
        })
    }

    const PostId = await models.Post.findByPk(id);

    if(PostId == null) {
        res.status(400).json({
            status : false,
            message : "Post does not exist!",
        })
        return;
    }

    const userIdOnPost = await models.Post.findByPk(id);
    if(userId != userIdOnPost.userId){
                res.status(401).json({
                    status : false,
                    message : "Unauthorized",
                })
                return;
            }
    try {
        const category = await models.Category.findByPk(category_id);
        if(category == null){
                res.status(400).json({
                status : false,
                message : "Invalid Category id",
            })
        }
         else{
                const result = await models.Post.update(updatedPost, {where : {id,userId}});
                if(result){
                    res.status(200).json({
                        status : true,
                        message : "post updated successfully",
                        post : updatedPost
                    })
            }
        }
    }
    catch(error){
        res.status(500).json({
            status : false,
            message : "We encountered an error updating your post, try again later.",
        })
   }      
} 
         

const destroy = async (req,res) => {
    const id = req.params.id;
    const userId = req.userData.userId;
    // making sure only the right user can delete post
    const userIdOnPost = await models.Post.findByPk(id);
    if(userId != userIdOnPost.userId){
                res.status(401).json({
                    status : false,
                    message : "Unauthorized",
                })
                return;
            }

    try{
        const result = await models.Post.destroy({where : {id,userId}});
            if(result != 0 ){
                res.status(200).json({
                    message : "Post deleted successfully",
                });
            }
            else{
                res.status(404).json({
                    message : "Post not found"
                });
            }
    }
    catch{
            res.status(500).send({
                message: error.message || "INTERNAL SERVER ERROR"
            });
        }   
}

module.exports =  {
    createPosts,
    showPost,
    index,
    update,
    destroy,
}