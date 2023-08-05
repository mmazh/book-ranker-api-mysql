require('dotenv').config();
var sql = require('../db');

var Book = function(book) {
    this.title = book.title;
    this.author = book.author;
};

Book.create = function (newBook, result) {    
    sql.query("INSERT INTO bookranker.book SET ?", newBook, function (err, res) {
        if (err) return result(err, null);
        result(200);
    });           
};

Book.findAll = function (result) {
    let query = `SELECT * 
                FROM bookranker.book
                ORDER BY book.title ASC`
    sql.query(query, function (err, res) {
        if (err) return result(null, err);
        result(null, res);
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
        if (err) return result(null, err);
        result(null, res);
    });
};

Book.delete = function (userId, bookId, result) {
    let superUsers = process.env.PRIVILEGED_USERS.split(', ');
    if (!superUsers.includes(userId.toString())) return result(403);
    let bookQuery = `DELETE FROM book
                    WHERE book.bookId=?`
    let votesQuery = `DELETE FROM votes
                    WHERE votes.bookId=?`
    sql.query(votesQuery, bookId, function (err, res) {
        if (err) return result(err, null);
        sql.query(bookQuery, bookId, function (err, res) {
            if (err) return result(err, null);
            result(200);
        });
    });
};

module.exports = Book;