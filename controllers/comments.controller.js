const validator = require("fastest-validator");
const models = require("../models");

const save = (req,res) => {
    const {content,postId} = req.body;
    const comment = {
        postId,
        content,    
        userId : req.userData.userId
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
   

const show = async (req,res) => {
    const id = req.params.id;
    try{
        const result = await models.Comment.findByPk(id);
        if (result == null){res.status(404).json({message: "Comment not found!"});}
        else{
            res.status(200).json(result)
        }
    }
    catch(error){
        res.status(500).json({
            status : false,
            message : "Oops!, something went wrong",
        })
    }
}





const update = async (req,res) => {
    const {content,postId} = req.body;
    const id = req.params.id;
    const updatedComment = {
        content,
        postId
    }

    const userId = req.userData.userId;

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

// making sure only the right user can edit comment
    const userIdOnComment = await models.Comment.findByPk(id);
    if(userId != userIdOnComment.userId){
                res.status(401).json({
                    status : false,
                    message : "Unauthorized",
                })
                return;
            }

    try{
        const result = await models.Comment.update(updatedComment, {where : {id,userId}});
        if (result) {
            res.status(200).json({
                status : true,
                message : "comment updated successfully",
                comment : updatedComment
            })
        }
    }
    catch{
        res.status(500).json({
            status : false,
            message : "something went wrong"

        })
    }   

}

const destroy = async (req,res) => {
    const id = req.params.id;
    const userId = req.userData.userId;
    try{
        const result = await models.Comment.destroy({where : {id,userId}});
        if (result != 0) res.status(200).json({message : "comment deleted successfully" });
        else{
                        res.status(404).json({
                            message : "No comment found for this user!"
                        });
                    }
    }
    catch(error){
                     res.status(500).send({
                            message:"Oops, something went wrong"
                        });
    }

}
module.exports =  {
    save,
    show,
    update,
    destroy
}