const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const FavBooks = require('../models/FavBook');

// get the fav books
router.get('/fetchbooks', fetchuser, async (req, res) => {
  try {
    const books = await FavBooks.find({ user: req.user.id });
    res.json(books);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

//  add the books
router.post('/addfavbooks', fetchuser, async (req, res) => {
  try {
    let { title, authors, description, image, infoLink, language, viewLink } =
      req.body;
    // console.log(req.body);
    const match = await FavBooks.findOne({ title });
    // console.log(match);
    if (match) {
      throw Error('Book is Already save');
    }
    const booksData = await FavBooks.create({
      user: req.user.id,
      title,
      authors,
      description,
      image,
      infoLink,
      language,
      viewLink,
    });
    res.json({ success: true, booksData });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// update an existing books
router.put('/updatebooks/:id', fetchuser, async (req, res) => {
  try {
    let { title, authors, description, image, infoLink, language, viewLink } =
      req.body;
    //create a new note for update
    const newBook = {};
    if (title) {
      newBook.title = title;
    }
    if (description) {
      newBook.description = description;
    }
    if (authors) {
      newBook.authors = authors;
    }
    if (image) {
      newBook.image = image;
    }
    if (language) {
      newBook.language = language;
    }
    if (infoLink) {
      newBook.infoLink = infoLink;
    }
    if (viewLink) {
      newBook.viewLink = viewLink;
    }
    let book = await FavBooks.findById(req.params.id);
    if (!book) {
      return res.status(404).send('Not found ');
    }

    if (book.user.toString() !== req.user.id) {
      return res.status(401).send('Not Allowed ');
    }
    book = await FavBooks.findByIdAndUpdate(
      req.params.id,
      { $set: newBook },
      { new: true }
    );
    res.json({ success: true, book });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});
//  Delete an existing bokk
router.delete('/deletebooks/:id', fetchuser, async (req, res) => {
  try {
    //find the book to be Delete and Delete it
    let book = await FavBooks.findById(req.params.id);
    if (!book) {
      return res.status(404).send('Not found ');
    }
    //check the user is Delete his own notes
    if (book.user.toString() !== req.user.id) {
      return res.status(401).send('Not Allowed ');
    }
    book = await FavBooks.findByIdAndDelete(req.params.id);
    res.json({ success: true, book: book });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});
module.exports = router;
