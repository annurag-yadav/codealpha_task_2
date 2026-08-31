import express from 'express';
import {
  createPost,
  deletePost,
  getFeedPosts,
  getPostById,
  getUserPosts,
  likePost,
} from '../controllers/postController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/feed', protect, getFeedPosts);
router.get('/user/:userId', getUserPosts);
router.get('/:id', getPostById);
router.post('/', protect, createPost);
router.put('/:id/like', protect, likePost);
router.delete('/:id', protect, deletePost);

export default router;
