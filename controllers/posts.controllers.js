const models = require("../models");

const createPosts = (req,res) => {
    const post = {
        title : req.body.title,
        content : req.body.content,
        imageUrl : req.body.imageUrl,
        categoryId : req.body.category_id,
        userId : 1
    }

    models.Post.create(post).then(result => {
            res.status(201).json({
                message : "posts created successfully",
                post : result
            })
    }).catch(error => {
        res.status(500).json({
            message : "Oops!, something went wrong",
            post: error
        })
    })
} 

const showPost = (req,res) => {
    const id = req.params.id;
    models.Post.findByPk(id).then(result => {
        res.status(200).json(result)
    }).catch(error => {
        res.status(500).json({
            message : "Oops!, something went wrong",
        })
    })
}

const index = (req,res) => {
    models.Post.findAll().then(result => {
        res.status(200).json(result)
    }).catch(error => {
        res.status(500).json({
            message : "Oops!, something went wrong",
        })
    })
}

module.exports =  {
    createPosts,
    showPost,
    index

}