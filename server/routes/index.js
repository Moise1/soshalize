import express from 'express';
import UserController from '../controllers/Users';
import PostController from '../controllers/Posts';


const router = express.Router();

// User routes
router.post('/signup', UserController.Signup)
router.post('/login', UserController.Login);
router.get('/users', UserController.FetchUsers);
router.get('/users/:id', UserController.FindUser);
router.put('/users/:id/follow', UserController.FollowUser);
router.put('/users/:id/unfollow', UserController.UnfollowUser);
router.put('/users/:id/edit', UserController.EditUser);
router.delete('/users/:id', UserController.DeleteUser);


// Post routes
router.post('/posts', PostController.CreatePost);
router.get('/posts/timeline', PostController.TimelinePosts);
router.get('/posts/:id', PostController.FetchSinglePost);
router.put('/posts/:id/edit', PostController.EditPost);
router.put('/posts/:id/like-or-dislike', PostController.LikeOrDislikePost);
router.delete('/posts/:id', PostController.DeletePost);



export default router;