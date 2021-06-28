import express from 'express';

const router = express.Router();

// User routes
router.get('/api/users', (req, res) => res.send('ALL USERS'))

// Auth routes
router.post('/api/login', (req, res) => res.send('Logged in'));

export default router;