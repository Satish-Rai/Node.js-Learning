import { Post } from "../models/post.model.js";

const createPost = async (req, res) => {
  try {
    const { name, description, age } = req.body;
    // const post = await Post.findOne({name});

    if (!name || !description || !age)
      return res.status(400).json({
        message: "All fields required.",
      });

    const post = await Post.create({ name, description, age });
    // console.log("post", post);

    res.status(201).json({
      message: "Post created successfully.",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find();
    // console.log('all posts', allPosts);
    if (!allPosts)
      return res.status(404).json({
        message: "No post found.",
      });

    res.status(200).json({
      message: "List of all posts",
      allPosts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};

const updatePost = async (req, res) => {
  try {
    // const { name, age, description } = req.body;
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Required data is missing",
      });
    }
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!post)
      return res.status(404).json({
        message: "Post not found.",
      });

    res.status(200).json({
      message: "Post updated.",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal sever error",
      error,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({
        message: "No record found to delete.",
      });

    res.status(200).json({
      message: "Post deleted succesfully.",
      deleted,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal sever error",
      error,
    });
  }
};

export { createPost, getAllPosts, updatePost, deletePost };
