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
    let query = `SELECT * FROM bookranker.book
                ORDER BY book.title ASC`
    sql.query(query, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });   
};

Book.findTopThree = function (result) {
    let query = `SELECT votes.bookId, book.title, book.author, AVG(votes.stars) AS average
                FROM votes
                INNER JOIN book ON book.bookId = votes.bookId
                GROUP BY votes.bookId
                ORDER BY average DESC
                LIMIT 3;`
    sql.query(query, function (err, res) {
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