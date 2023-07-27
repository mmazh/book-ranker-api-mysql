
const Book = require('../db/models/book.model');

exports.findAll = function(req, res) {
  Book.findAll(function(err, employee) {
    if (err) res.send(err);
    res.send(employee);
  });
};


exports.create = function(req, res) {
    const newBook = new Book(req.body);
    Book.create(newBook, function(err, book) {
        if (err) res.send(err);
        res.json({ error:false, data:book });
    });
};
