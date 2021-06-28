import express from 'express';
import UserController from '../controllers/Users';

const router = express.Router();

// User routes
router.post('/api/signup', UserController.Signup)

// Auth routes
router.post('/api/login', (req, res) => res.send('Logged in'));

export default router;