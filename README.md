

# 🕒 Timesheet Management System

A full-stack MERN application for managing tasks and timesheets.  
This role-based system allows **managers** to assign tasks and **associates** to submit their actual working hours.

---

## 🚀 Features

- 🔐 Role-based authentication: `manager` and `associate`
- 🧑‍💼 Managers can:
  - Assign tasks to associates
  - View all submitted timesheets
- 👩‍💻 Associates can:
  - View assigned tasks
  - Submit actual hours
- 🖥️ Clean UI with Tailwind CSS
- 🧠 MongoDB integration with Mongoose

---

## 🧱 Project Structure

```

timesheet-assignment/
├── client/       # React frontend
└── server/       # Node.js + Express backend

````

---

## ⚙️ Local Development Setup

---

### 🔹 Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/timesheet-assignment.git
cd timesheet-assignment
````

---

### 🔹 Step 2: Install & Run the Backend (Server)

```bash
cd server
npm install
```

#### ➕ Create `.env` in `/server` with the following:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

> Example:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/timesheet-db?retryWrites=true&w=majority
```

#### ▶️ Run the Backend

```bash
npm run dev
```

Server will start at:
📍 `http://localhost:5000`

---

### 🔹 Step 3: Install & Run the Frontend (Client)

Open a new terminal in the root project folder:

```bash
cd client
npm install
```

#### ▶️ Run the React App

```bash
npm start
```

Frontend will run at:
📍 `http://localhost:3000`

---

## 🧪 Roles & Test Flow

You can register users from the signup page:

### 👩‍💼 Manager

* Assign tasks to associates
* View submitted timesheets

### 👩‍🔧 Associate

* View assigned tasks
* Submit actual working hours (only once)

---

## 📄 API Overview

| Method | Route                             | Role      | Purpose               |
| ------ | --------------------------------- | --------- | --------------------- |
| POST   | `/api/auth/register`              | All       | Register user         |
| POST   | `/api/auth/login`                 | All       | Login + receive token |
| GET    | `/api/auth/users`                 | Manager   | List all users        |
| GET    | `/api/associate/my-tasks`         | Associate | Get assigned tasks    |
| POST   | `/api/associate/submit-timesheet` | Associate | Submit timesheet      |
| POST   | `/api/manager/assign-task`        | Manager   | Assign task           |
| GET    | `/api/manager/timesheets`         | Manager   | View all timesheets   |

---

## 🖼 UI Pages

| Route        | Role      | Description                      |
| ------------ | --------- | -------------------------------- |
| `/signup`    | All       | Sign up (choose role)            |
| `/`          | All       | Login page                       |
| `/manager`   | Manager   | Assign tasks + view submissions  |
| `/associate` | Associate | View tasks + submit actual hours |

---

## 💡 Additional Notes

* All API routes are **JWT-protected**
* Role access is validated via middleware
* Tailwind CSS is used for styling
* Backend uses `nodemon` for live-reloading

---

## 👤 Author

**Shreyansh Deep**
📧 Shreyanshdeep4@gmail.com
🌐 LinkedIn - https://www.linkedin.com/in/shreyansh-deep-a8b933145/

---

## 📝 License

This project is created as a technical assignment and demo only.

````
