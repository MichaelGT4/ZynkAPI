import express, { Router } from 'express';
import {
	getUser,
	getUserFriends,
	addRemoveFriends,
} from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// READ
router.get('/:id', getUser);
router.get('/:id/friends', verifyToken, getUserFriends);

// UPDATE
router.patch('/:id/:friendId', verifyToken, addRemoveFriends);

export default router;
