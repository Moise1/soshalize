import express from 'express';
import UserController from '../controllers/Users';

const router = express.Router();

// User routes
router.post('/api/v1/signup', UserController.Signup)
router.post('/api/v1/login', UserController.Login);
router.get('/api/v1/users/:id', UserController.FindUser);
router.put('/api/v1/users/edit/:id', UserController.EditUser);
router.delete('/api/v1/users/:id', UserController.DeleteUser);

export default router;