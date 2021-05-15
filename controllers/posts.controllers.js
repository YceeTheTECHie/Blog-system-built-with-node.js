const validator = require("fastest-validator");
const models = require("../models");

const createPosts = (req,res, next) => {
    const {title,content,imageUrl,category_id} = req.body;
    const post = {
        title,
        content,
        imageUrl,
        categoryId :category_id,
        userId : 1
    }
    // creating a scheme for data validation
    const schema = {
        title : {type:"string",optional:false,max:100 },
        content : {type:"string", optional:false,max:500},
        imageUrl : {type:"string", optional:true},
        categoryId: {type:"number",optional:false}
    }

    const v = new validator();
    const validatorResponse = v.validate(post,schema);

    if (validatorResponse !== true) {
        res.status(400).json({
            message : "Validation failed",
            error : validatorResponse
        })
    }
    models.Post.create(post).then(result => {
            res.status(201).json({
                status : true,
                message : "posts created successfully",
                post : result
            })
    }).catch(error => {
        res.status(500).json({
            status : false,
            message : "Oops!, something went wrong",
            post: error
        })
        return next(error);
    })
} 

const showPost = (req,res,next) => {
    const id = req.params.id;
    models.Post.findByPk(id).then(result => {
        if (result != 0)res.status(200).json(result)
        else{
            res.status(404).json({
                message: "Post not found!"
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            status : false,
            message : "Oops!, something went wrong",
        })
        return next(error);

    })
}

const index = (req,res,next) => {
    models.Post.findAll().then(result => {
        if(result != 0)res.status(200).json(result)
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
        })
        return next(error);

    })
}

const update = (req,res,next) => {
    const id = req.params.id;
    const updatedPost = {
        title : req.body.title,
        content : req.body.content,
        imageUrl : req.body.imageUrl,
        categoryId : req.body.category_id,
    }

    const userId = 1;

      // creating a scheme for data validation
      const schema = {
        title : {type:"string",optional:false,max:100 },
        content : {type:"string", optional:false,max:500},
        imageUrl : {type:"string", optional:true},
        categoryId: {type:"number",optional:false}
    }

    const v = new validator();
    const validatorResponse = v.validate(updatedPost,schema);

    if (validatorResponse !== true) {
        res.status(400).json({
            message : "Validation failed",
            error : validatorResponse
        })
    }

    models.Post.update(updatedPost, {where : {id:id,userId:userId}})
    .then(result => {
        res.status(200).json({
            status : true,
            message : "post updated successfully",
            post : updatedPost
        })
    })
    .catch(error => {
        res.status(500).json({
            status : false,
            message : "something went wrong"

        })
        return next(error);

    })

}

const destroy = (req,res,next) => {
    const id = req.params.id;
    const userId = 1;
    models.Post.destroy({where : {id,userId}})
    .then(result => {
        if (result != 0){
        res.status(200).json({
            message : "Posts deleted successfully",
            id
        });}
        else{
            res.status(404).json({
                message : "Post not found"
            });
        }
    })
    .catch(error => {
        console.log(error);
            res.status(500).send({
                message: error.message || "INTERNAL SERVER ERROR"
            });

        return next(error);

    });
}

module.exports =  {
    createPosts,
    showPost,
    index,
    update,
    destroy,

}