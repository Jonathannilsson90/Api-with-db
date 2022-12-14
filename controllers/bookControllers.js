const book = require("../models/book");

exports.getAllBooks = async (req, res) => {
  try {
    res.json(await book.find());
  } catch (error) {
    res.json({ message: error });
  }
};

exports.getBookById = async (req, res) => {
  try {
    res.json(await book.findById(req.params.bookId));
  } catch (error) {
    res.json({ message: error });
  }
};

exports.createBook = async (req, res) => {
  try {
    const createbook = new book({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
    });

    res.json(await createbook.save());
  } catch (error) {
    res.json({ message: error });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    res.json(await book.deleteOne({ '_id': req.params.bookId }));
  } catch (error) {
    res.json({ message: error });
  }
};

exports.updateBook = async (req, res) => {
  try {
    res.json(
      await book.updateOne(
        { '_id': req.params.bookId },
        {
          $set: {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
          },
        }
      )
    );
  } catch (error) {
    res.json({ message: error });
  }
};
