import express from 'express'
import userController from '../controller/userController.js';

const router = express.Router()

router.post('/ans', userController.ansQuestion);
router.post('/create', userController.createUser);
router.get('/leader', userController.getLeaderboard);

export default router