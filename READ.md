# 📚 Library Management System
A full-stack web application to manage books, members, and borrow/return operations in a library. Built using React (frontend), Node.js with Express (backend), and MySQL (database).

## 🚀 Features
- Add new books and members
- Borrow and return books
- View all books, members, and borrowing records
- Dynamic updates with real-time data fetching

## 🛠️ Technologies Used
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Styling:** CSS (index.css)

## 📂 Project Structure
DBMS_PRJ/
│
├── backend/                  # Node.js backend (Express + MySQL)
│   ├── node_modules/
│   ├── server.js             # Main backend server file
│   ├── package.json          # Backend dependencies
│
├── Frontend/
│   └── frontend/             # React frontend
│       ├── dist/             # Build output (after production build)
│       ├── node_modules/
│       ├── public/
│       ├── src/
│       │   ├── assets/       # Assets like images
│       │   ├── App.jsx       # Main React app logic
│       │   ├── App.css       # Styling for App component
│       │   ├── index.css     # Global styles
│       │   ├── main.jsx      # App entry point
│       ├── package.json      # Frontend dependencies
│       ├── vite.config.js    # Vite configuration
│       └── README.md         # Frontend README
│
├── .gitignore
└── README.md                 # Project root README (this file)

## ✅ Step-by-Step Implementation
/client → React frontend
/server → Node.js + Express backend
/database → SQL scripts for tables and sample data

1️⃣ Set Up MySQL Database
🏗️ Create Tables
Use a tool like MySQL Workbench or the CLI to run SQL commands.

2️⃣ Set Up Backend (Node.js + Express)
📦 Install Dependencies:
cd backend
npm init -y
npm install express mysql cors

3️⃣ Set Up React Frontend
🧱 Create Project:
cd Frontend
npm create vite@latest frontend --template react
cd frontend
npm install

## 🧠 Code Structure
App.jsx — handles UI and logic
fetch() — used to connect to backend routes
▶️ Run React App:
npm run dev


## 🔗 How They Connect
| Component         | Role                                | Connects To                 |
| ----------------- | ----------------------------------- | --------------------------- |
| React (Frontend)  | Collects user input & displays data | Makes API calls to Express  |
| Express (Backend) | Processes API requests              | Talks to MySQL & sends JSON |
| MySQL (DB)        | Stores books, members, and records  | Queried by backend          |


**Configure Backend (server.js)**
Update MySQL connection settings inside server.js:****
const connection = mysql.createConnection({
  host: "localhost",
  user: "your_mysql_user",
  password: "your_mysql_password",
  database: "library_db",
});

**Install backend dependencies and start server:**
npm install
node server.js
------Server will run on http://localhost:5000/-------

**Run React Frontend**
npm install
npm start / npm run dev
----App will open in your browser at http://localhost:3000/-----

## ✅ Final Test
Start backend: node server.js
Start frontend: npm run dev
Open browser at: http://localhost:5173/ or your Vite port
Try adding books, members, borrowing, and returning!

**🧪 API Endpoints**
| Method | Route          | Description            |
| ------ | -------------- | ---------------------- |
| GET    | /books         | Get all books          |
| POST   | /books         | Add a new book         |
| GET    | /members       | Get all members        |
| POST   | /members       | Add a new member       |
| GET    | /borrowRecords | Get all borrow records |
| POST   | /borrowBook    | Borrow a book          |
| POST   | /returnBook    | Return a book          |

**📸 UI Preview**
The UI includes sections to:
Add Book 📘
Add Member 👤
Borrow / Return Book 🔄
View Books, Members, and Borrow Records 📜

**📌 Future Enhancements**
Add book search and filtering
Track overdue books
Member login/authentication
