var sql = require('../db');

var Book = function(book) {
    this.title = book.title;
    this.author = book.author;
};

Book.create = function (newBook, result) {    
    sql.query("INSERT INTO bookranker.book SET ?", newBook, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res.insertId);
        }
    });           
};

Book.findAll = function (result) {
    sql.query("Select * from bookranker.book", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });   
};

module.exports = Book;