import Post from '../models/Post.js';

/* CREATE */
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath }= req.body;
        const user = await User.findById(userId);
        const newPost = new Post ({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: [],
        });

        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);
    }
    catch (err) {
        res.status(409).json({ message: err.message });
    }
}

/* READ */
export const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(409).json({ message: err.message });
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}

/* UPDATE */
export const likePost = async (req, res) => {
    try {
        // Variable declarations
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        // Like logic
        if (isLiked) 
            posts.likes.delete(userId);
        else 
            posts.likes.set(userId, true);
        
        // Update the front end
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        // Send to the front-end
        res.status(200).json(updatedPost);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}