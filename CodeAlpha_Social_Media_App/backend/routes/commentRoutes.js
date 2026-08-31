import express from 'express';
import { createComment, getCommentsForPost } from '../controllers/commentController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:postId', getCommentsForPost);
router.post('/', protect, createComment);

export default router;
