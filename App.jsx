import React, { useState, useEffect } from "react";
import "./index.css"; // Importing CSS for background styling

const App = () => {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [borrowRecords, setBorrowRecords] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "" });
  const [newMember, setNewMember] = useState({ name: "" });
  const [borrowData, setBorrowData] = useState({ bookId: "", memberId: "" });

  // Fetch books
  const fetchBooks = async () => {
    try {
      const res = await fetch("http://localhost:5000/books");
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  // Fetch members
  const fetchMembers = async () => {
    try {
      const res = await fetch("http://localhost:5000/members");
      const data = await res.json();
      setMembers(data);
    } catch (err) {
      console.error("Error fetching members:", err);
    }
  };

  // Fetch borrow records
  const fetchBorrowRecords = async () => {
    try {
      const res = await fetch("http://localhost:5000/borrowRecords");
      const data = await res.json();
      setBorrowRecords(data);
    } catch (err) {
      console.error("Error fetching borrow records:", err);
    }
  };

  // Add a new book
  const addBook = async () => {
    if (!newBook.title || !newBook.author) return alert("Title and Author required!");
    try {
      await fetch("http://localhost:5000/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });
      fetchBooks();
      setNewBook({ title: "", author: "" });
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  // Add a new member
  const addMember = async () => {
    if (!newMember.name) return alert("Member name required!");
    try {
      await fetch("http://localhost:5000/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMember),
      });
      fetchMembers();
      setNewMember({ name: "" });
    } catch (err) {
      console.error("Error adding member:", err);
    }
  };

  // Borrow a book
  const borrowBook = async () => {
    if (!borrowData.bookId || !borrowData.memberId) return alert("Book ID and Member ID required!");
    try {
      await fetch("http://localhost:5000/borrowBook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(borrowData),
      });
      fetchBorrowRecords();
      setBorrowData({ bookId: "", memberId: "" });
    } catch (err) {
      console.error("Error borrowing book:", err);
    }
  };

  // Return a book
  const returnBook = async () => {
    if (!borrowData.bookId || !borrowData.memberId) return alert("Book ID and Member ID required!");
    try {
      await fetch("http://localhost:5000/returnBook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(borrowData),
      });
      fetchBorrowRecords();
      setBorrowData({ bookId: "", memberId: "" });
    } catch (err) {
      console.error("Error returning book:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchMembers();
    fetchBorrowRecords();
  }, []);

  return (
    <div className="container">
      <h1>📚 Library Management System</h1>

      {/* Add Book */}
      <h2>Add Book</h2>
      <input type="text" placeholder="Title" value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} />
      <input type="text" placeholder="Author" value={newBook.author} onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} />
      <button onClick={addBook}>Add Book</button>

      {/* Add Member */}
      <h2>Add Member</h2>
      <input type="text" placeholder="Member Name" value={newMember.name} onChange={(e) => setNewMember({ name: e.target.value })} />
      <button onClick={addMember}>Add Member</button>

      {/* Borrow Book */}
      <h2>Borrow Book</h2>
      <input type="number" placeholder="Book ID" value={borrowData.bookId} onChange={(e) => setBorrowData({ ...borrowData, bookId: e.target.value })} />
      <input type="number" placeholder="Member ID" value={borrowData.memberId} onChange={(e) => setBorrowData({ ...borrowData, memberId: e.target.value })} />
      <button onClick={borrowBook}>Borrow Book</button>

      {/* Return Book */}
      <h2>Return Book</h2>
      <input type="number" placeholder="Book ID" value={borrowData.bookId} onChange={(e) => setBorrowData({ ...borrowData, bookId: e.target.value })} />
      <input type="number" placeholder="Member ID" value={borrowData.memberId} onChange={(e) => setBorrowData({ ...borrowData, memberId: e.target.value })} />
      <button onClick={returnBook}>Return Book</button>

      {/* Display Data */}
      <h2>📖 Books</h2>
      <ul>{books.map(book => <li key={book.id}>{book.title} by {book.author}</li>)}</ul>

      <h2>👤 Members</h2>
      <ul>{members.map(member => <li key={member.id}>{member.name}</li>)}</ul>

      <h2>📜 Borrow Records</h2>
      <ul>{borrowRecords.map(record => (
        <li key={record.id}>{record.member_name} borrowed "{record.book_title}" on {record.borrow_date} {record.return_date ? `(Returned: ${record.return_date})` : "(Not returned yet)"}</li>
      ))}</ul>
    </div>
  );
};

export default App;
