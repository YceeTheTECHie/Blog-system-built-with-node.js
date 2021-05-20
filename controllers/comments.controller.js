const validator = require("fastest-validator");
const models = require("../models");

const save = (req,res) => {
    const {content,postId} = req.body;
    const comment = {
        postId,
        content,    
        userId : 1
    }
    // creating a scheme for data validation
    const schema = {
        content : {type:"string", optional:false,max:500},
        postId: {type:"number",optional:false}
    }

    const v = new validator();
    const validatorResponse = v.validate(comment,schema);

    if (validatorResponse !== true) {
        res.status(400).json({
            message : "Validation failed",
            error : validatorResponse
        })
    }
    else{ models.Comment.create(comment).then(result => {
            res.status(201).json({
                status : true,
                message : "commment added successfully",
                comment : result
            })
    }).catch(error => {
        res.status(500).json({
            status : false,
            message : "Oops!, something went wrong",
            post: error
        })
    
    })
} }
   

const show = (req,res,next) => {
    const id = req.params.id;
    models.Comment.findByPk(id).then(result => {
        if (result != 0)res.status(200).json(result)
        else{
            res.status(404).json({
                message: "Comment not found!"
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

// const index = (req,res,next) => {
//     models.Comment.findAll().then(result => {
//         if(result != 0)res.status(200).json(result)
//         else{
//             res.status(200).json({
//                 message : "You have not created any Post yet!"
//             })
//         }
//     })
//     .catch(error => {
//         res.status(500).json({
//             status : false,
//             message : "Oops!, something went wrong",
//         })
//         return next(error);

//     })
// }

const update = (req,res,next) => {
    const {content,postId} = req.body;
    const id = req.params.id;
    const updatedComment = {
        content,
        postId
    }

    const userId = 1;

      // creating a scheme for data validation
      const schema = {
        postId: {type:"number",optional:false},
        content : {type:"string", optional:false,max:500},
    }

    const v = new validator();
    const validatorResponse = v.validate(updatedComment,schema);

    if (validatorResponse !== true) {
        res.status(400).json({
            message : "Validation failed",
            error : validatorResponse
        })
    }

    models.Comment.update(updatedComment, {where : {id:id,userId:userId}})
    .then(result => {
        res.status(200).json({
            status : true,
            message : "comment updated successfully",
            comment : updatedComment
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

const destroy = (req,res) => {
    const id = req.params.id;
    const userId = 1;
    models.Comment.destroy({where : {id,userId}})
    .then(result => {
        if (result != 0){
        res.status(200).json({
            message : "comment deleted successfully",
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
            });;

    });
}

module.exports =  {
    save,
    show,
    update,
    // showPost,
    // index,
    // update,
    destroy

}