import { postModel } from "../models/post.model.js";


const create = async (req, res) => {
    const newPostReq = req.body

    try{
        const newPost = await postModel.createPost(newPostReq)

        return res.status(201).json([newPost])
    }catch(error){
        console.log(error);
    }
}

const allPosts = async (req, res) => {
    try{
        const posts = await postModel.findAllPosts()

        return res.status(200).json([posts])
    }catch(error){
        console.log(error)
    }
}

const findById= async (req, res) => {
    const { id } = req.params;

    try{
        const post = await postModel.findPostById(id)

        return res.status(200).json(post)
    }catch(error){
        console.log(error);
    }
}

const findByCreator = async (req, res) => {
    const { id } = req.params

    try{
        const deletedPost = postModel.removePost(id)

        return res.status(200).json(deletedPost);
    }catch(error){
        console.log(error)
    }
}

const remove = async (req, res) => {
    try{
        return res.status(200)
    }catch(error){
        console.log(error);
    }
}

const update = async (req, res) => {
    try{
        return res.status(200)
    }catch(error){
        console.log(error);
    }
}


export const postController = {
    create,
    allPosts,
    findById,
    findByCreator,
    remove,
    update   
}