import express from 'express';
import { login } from '../controllers/auth.js';

const router = express.Router(); // Allows express to configure routes

router.post('/login', login); // instead of app.use() -- like smaller express app

export default router;