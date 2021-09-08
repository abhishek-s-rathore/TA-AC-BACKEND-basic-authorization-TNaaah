var express = require('express');
// var mongoose = require('mongoose');
var router = express.Router();
// var auth = require('../middlewares/auth');

var Blog = require('../models/Blog');
var Comment = require('../models/Comment');

router.get('/', function (req, res, next) {
  Blog.find({}, (err, blogs) => {
    if (err) return next(err);
    res.render('blogs', { blogs });
  });
});

router.get('/new', function (req, res, next) {
  res.render('newBlog');
});

router.post('/', function (req, res, next) {
  var data = req.body;
  // data.author = req.userId;
  Blog.create(data, (err, blog) => {
    if (err) return next(err);
    res.redirect('/blogs');
  });
});

router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  Blog.findById(id)
    .populate('comments')
    .populate('author', 'name email')
    .exec((err, blog) => {
      if (err) return next(err);
      res.render('blogDetails', { blog });
    });
});

router.get('/:id/delete', function (req, res, next) {
  var id = req.params.id;
  Blog.findByIdAndRemove(id, (err, blog) => {
    if (err) return next(err);
    res.redirect('/blogs');
  });
});

router.get('/:id/edit', function (req, res, next) {
  var id = req.params.id;
  Blog.findById(id, (err, blog) => {
    if (err) return next(err);
    res.render('editBlog', { blog });
  });
});

router.post('/:id', function (req, res, next) {
  var id = req.params.id;
  var data = req.body;
  Blog.findByIdAndUpdate(id, data, (err, updatedBlog) => {
    if (err) return next(err);
    res.redirect('/blogs/' + id);
  });
});

// Routes For Comments
router.post('/:id/comments', function (req, res, next) {
  var id = req.params.id;
  var data = req.body;
  data.blogId = id;
  // data.author = req.user._id;
  Comment.create(data, (err, comment) => {
    if (err) return next(err);
    Blog.findByIdAndUpdate(
      id,
      { $push: { comments: comment._id } },
      (err, updatedBook) => {
        if (err) return next(err);
        res.redirect('/blogs/' + id);
      }
    );
  });
});

// Routes For Reactions

router.get('/click/:id/likes', function (req, res, next) {
  var id = req.params.id;
  Blog.findByIdAndUpdate(id, { $inc: { likes: +1 } }, (err, updatedBlog) => {
    if (err) return next(err);
    res.redirect('/blogs/' + id);
  });
});

router.get('/click/:id/dislikes', function (req, res, next) {
  var id = req.params.id;
  Blog.findByIdAndUpdate(id, { $inc: { dislikes: +1 } }, (err, updatedBlog) => {
    if (err) return next(err);
    res.redirect('/blogs/' + id);
  });
});

router.get('/click/:id/flames', function (req, res, next) {
  var id = req.params.id;
  Blog.findByIdAndUpdate(id, { $inc: { flames: +1 } }, (err, updatedBlog) => {
    if (err) return next(err);
    res.redirect('/blogs/' + id);
  });
});

router.get('/click/:id/hearts', function (req, res, next) {
  var id = req.params.id;
  Blog.findByIdAndUpdate(id, { $inc: { hearts: +1 } }, (err, updatedBlog) => {
    if (err) return next(err);
    res.redirect('/blogs/' + id);
  });
});

router.get('/click/:id/applauses', function (req, res, next) {
  var id = req.params.id;
  Blog.findByIdAndUpdate(
    id,
    { $inc: { applauses: +1 } },
    (err, updatedBlog) => {
      if (err) return next(err);
      res.redirect('/blogs/' + id);
    }
  );
});

// router.use(auth.loggedInUser);

module.exports = router;
