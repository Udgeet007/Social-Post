const express = require('express');
const { createPost, deletePost, getAllPost, updatePost, getYourPost, getfriendPost, commentPost } = require('../controllers/postController');
const checkToken = require('../middleware/checkToken');
const router = express.Router();


router.post('/create',checkToken ,createPost);
router.put('/update/:_id', updatePost);
router.delete('/delete/:_id', deletePost);
router.get('/getAllPost', getAllPost);
router.get('/getYourPost', checkToken, getYourPost);
router.get('/getFriendPost/:_id', getfriendPost);
router.post('/comment/:postId',checkToken, commentPost); 


module.exports = router;