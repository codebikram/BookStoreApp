const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Comments = require('../models/Comments');

// get the fav books
router.get('/getcomments/:title', fetchuser, async (req, res) => {
  try {
    const comments = await Comments.findOne({ title: req.params.title });
    if (comments) {
      res.status(200).json({ success: true, comments });
    } else {
      res.status(404).json({ success: false, message: 'not found' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

//  add the comments
router.post('/addcomments', fetchuser, async (req, res) => {
  try {
    let { title, comments } = req.body;
    const comment = await Comments.findOne({ title });
    const user = await Comments.findOne({ user: req.user.id });
    if (!comment && !user) {
      const commentData = await Comments.create({
        user: req.user.id,
        title,
        comments,
      });
      res.json({ success: true, commentData });
    } else if (user && comment) {
      comment.comments.push(comments);
      const commentData = await comment.save();
      res.json({ success: true, commentData });
    } else {
      const commentData = await Comments.create({
        user: req.user.id,
        title,
        comments,
      });
      res.json({ success: true, commentData });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
