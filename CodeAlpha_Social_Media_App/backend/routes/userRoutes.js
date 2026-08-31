import express from 'express';
import { followUser, getUserProfile, getUsers, updateUserProfile } from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getUsers);
router.put('/profile', protect, updateUserProfile);
router.get('/:id', getUserProfile);
router.put('/:id/follow', protect, followUser);

export default router;
