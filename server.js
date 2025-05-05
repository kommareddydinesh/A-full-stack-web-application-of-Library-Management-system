const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "dinesh06012006",
    database: "library_rc"
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database");
    }
});

// Get all books
app.get("/books", (req, res) => {
    db.query("SELECT * FROM books", (err, result) => {
        if (err) res.status(500).json({ error: "Database error" });
        else res.json(result);
    });
});

// Get all members
app.get("/members", (req, res) => {
    db.query("SELECT * FROM members", (err, result) => {
        if (err) res.status(500).json({ error: "Database error" });
        else res.json(result);
    });
});

// Get borrow records
app.get("/borrowRecords", (req, res) => {
    const sql = `
        SELECT br.id, m.name AS member_name, b.title AS book_title, br.borrow_date, br.return_date
        FROM borrow_records br
        JOIN members m ON br.member_id = m.id
        JOIN books b ON br.book_id = b.id
    `;
    db.query(sql, (err, result) => {
        if (err) res.status(500).json({ error: "Database error" });
        else res.json(result);
    });
});

// Add a new book
app.post("/books", (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) return res.status(400).json({ error: "Title and Author required" });

    const sql = "INSERT INTO books (title, author) VALUES (?, ?)";
    db.query(sql, [title, author], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({ message: "Book added successfully", id: result.insertId });
    });
});

// Add a new member
app.post("/members", (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Member name required" });

    const sql = "INSERT INTO members (name) VALUES (?)";
    db.query(sql, [name], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({ message: "Member added successfully", id: result.insertId });
    });
});

// Borrow a book
app.post("/borrowBook", (req, res) => {
    const { bookId, memberId } = req.body;
    if (!bookId || !memberId) return res.status(400).json({ error: "Book ID and Member ID required" });

    const sql = "INSERT INTO borrow_records (book_id, member_id, borrow_date) VALUES (?, ?, NOW())";
    db.query(sql, [bookId, memberId], (err) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json({ message: "Book borrowed successfully" });
    });
});

// Return a book
app.post("/returnBook", (req, res) => {
    const { bookId, memberId } = req.body;
    if (!bookId || !memberId) return res.status(400).json({ error: "Book ID and Member ID required" });

    const sql = "UPDATE borrow_records SET return_date = NOW() WHERE book_id = ? AND member_id = ? AND return_date IS NULL";
    db.query(sql, [bookId, memberId], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (result.affectedRows === 0) return res.status(400).json({ error: "No active borrow record found" });
        res.json({ message: "Book returned successfully" });
    });
});

// Start Server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
