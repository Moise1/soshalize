import Post from '../models/Post';

class PostController {

    static async CreatePost(req, res) {
        const newPost = new Post(req.body);
        try {
            const savedPost = await newPost.save();
            return res.status(201).json(savedPost);
        } catch (error) {
            if (error) return res.status(500).json(error.message);
        }
    }

    static async EditPost(req, res) {
        const { id } = req.params;
        const { userId } = req.body;

        try {
            const post = await Post.findById(id);
            if (post.userId === userId) {
                await post.updateOne({ $set: req.body });
                return res.status(200).json('Post successfully updated.');
            } else {
                return res.status(403).json('You can only edit your post.')
            }

        } catch (error) {
            if (error) return res.status(500).json(error.message);
        }
    }

    static async FetchSinglePost(req, res) {
        const { id } = req.params;

        try {
            const post = await Post.findById(id);
            if (!post) return res.status(404).json('Post not found.');

            return res.status(200).json({message: 'Your Post', post});

        } catch (error) {
            if (error) return res.status(500).json(error.message);
        }
    }


    static async TimelinePosts(req, res){

        const {userId} = req.body;
        try {
            const currentUser = await Post.findById(userId);
            const userPosts = await Post.find({userId: currentUser._id});
            const friendPosts = await  Promise.all(currentUser.following.map(friendId => {
               return Post.find({userId: friendId})
            }));
            return res.status(200).json([...userPosts, ...friendPosts])
        } catch (error) {
            if(error) return res.status(500).json(error.message)
        }
    }

    static async LikeOrDislikePost(req, res) {
        const { id } = req.params;
        const { userId } = req.body;

        try {
            const post = await Post.findById(id);
            if (!post.likes.includes(userId)) {
                await post.updateOne({ $push: {likes: userId} });
                return res.status(200).json('Like successfully added.');
            } else {
                await post.updateOne({ $pull: {likes: userId} });
                return res.status(200).json('Post disliked');
            }

        } catch (error) {
            if (error) return res.status(500).json(error.message);
        }
    }

    static async DeletePost(req, res) {
        const { id } = req.params;
        const { userId } = req.body;

        try {
            const post = await Post.findById(id);
            if (!post) {
                return res.status(404).json('Post not found')
            };
            if (post.userId === userId) {
                await Post.findByIdAndDelete(id);
                return res.status(200).json('Post successfully deleted.');
            } else {
                return res.status(403).json('You can only delete your post.')
            }

        } catch (error) {
            if (error) return res.status(500).json(error.message);
        }
    }
}

export default PostController;