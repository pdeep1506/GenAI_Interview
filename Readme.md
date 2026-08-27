# 🤖 GenAI Interview Platform

An AI-powered interview preparation platform that analyzes a candidate's **self-description, resume, and job description** to generate a personalized interview report using **Google Gemini AI**.

The application provides user authentication, resume upload, AI-powered interview analysis, and access to previously generated interview reports.

---
## Live Demo

**Frontend:**  
https://genai-hire.netlify.app

**Backend API:**  
https://genai-interview-backend.netlify.app

The application provides user authentication, resume upload, AI-powered interview analysis, and access to previously generated interview reports.

---
## 🚀 Features

### 🔐 Authentication

* User registration
* User login
* User logout
* Get currently authenticated user
* Protected routes using authentication middleware

### 📄 Resume & Job Description Analysis

Users can provide:

* Self-description
* Resume in PDF format
* Job description

The backend processes these inputs and sends the relevant information to Gemini AI to generate an interview analysis/report.

### 🤖 Gemini AI Integration

The application uses Google Gemini to generate an AI-powered interview report based on the candidate's:

* Skills
* Experience
* Resume
* Job description
* Self-description

### 📊 Interview Reports

Authenticated users can:

* Generate a new interview report
* View a specific interview report
* View all of their previous interview reports

### 🛡️ Protected APIs

Interview-related APIs require authentication using the `authUser` middleware.

---

## 🏗️ Project Architecture

The project consists of two applications:

```text
genai-interview/
│
├── frontend/
│   ├── ...
│   └── README.md
│
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── middlewares/
    │   ├── routes/
    │   ├── services/
    │   ├── models/
    │   └── server.js
    │
    ├── .env
    ├── package.json
    └── README.md
```

### Backend Flow

```text
Frontend
   │
   ▼
Express API
   │
   ├── Authentication
   │      └── authRouter
   │
   ├── Interview APIs
   │      └── interviewRouter
   │
   ├── Resume Upload
   │      └── uploadMiddleware
   │
   ├── Authentication Middleware
   │      └── authUser
   │
   ├── Gemini AI
   │      └── Generate Interview Report
   │
   └── MongoDB
          └── Store Users & Reports
```

---

## 🛠️ Tech Stack

### Frontend

* React
* JavaScript
* HTML
* CSS
* API integration with backend

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer / file upload middleware
* Google Gemini API

### AI

* Google Gemini

### Deployment

* Netlify

---

## 🔑 Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000
MONGO_PASSWORD=your_mongodb_password
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Google_GenAI_API_KEY=your_google_gemini_api_key
```

> ⚠️ Never commit your `.env` file to GitHub.

Add this to `.gitignore`:

```gitignore
.env
.env.local
node_modules/
```

---

## 🔐 Authentication APIs

### Register User

```http
POST /api/auth/register
```

Creates a new user account.

### Login User

```http
POST /api/auth/login
```

Authenticates an existing user.

### Logout User

```http
GET /api/auth/logout
```



### Get Current User

```http
GET /api/auth/get-me
```

Returns details of the currently authenticated user.

This endpoint is protected.

Authentication middleware: `authUser`

---

## 🤖 Interview APIs

### Generate Interview Report

```http
POST /api/interview
```

Generates a new AI-powered interview report.

**Authentication:** Required (`authUser`)

**Request:** uses `multipart/form-data`

Example fields:

```text
selfDescription
jobDescription
resume
```

The resume should be uploaded as a PDF file, in the `resume` field.

The backend uses:

```javascript
uploadMiddleware.single("resume")
```

to process the uploaded resume.

### Processing Flow

```text
User
 │
 ├── Self Description
 ├── Resume PDF
 └── Job Description
          │
          ▼
      Express API
          │
          ▼
    Authentication
          │
          ▼
    Resume Processing
          │
          ▼
      Gemini AI
          │
          ▼
  Interview Report
          │
          ▼
       MongoDB
```

---

### Get Interview Report

```http
GET /api/interview/report/:interviewId
```

Returns a specific interview report.

**Authentication:** Required

Example:

```text
GET /api/interview/report/64f123456789
```

---

### Get All Interview Reports

```http
GET /api/interview/
```

Returns all interview reports belonging to the currently authenticated user.

**Authentication:** Required

---

## 📋 API Summary

| Method | Endpoint                             | Authentication | Description                  |
| ------ | ------------------------------------ | --------------- | ---------------------------- |
| POST   | `/api/auth/register`                 | ❌              | Register a new user          |
| POST   | `/api/auth/login`                    | ❌              | Login user                   |
| GET    | `/api/auth/logout`                   | ❌*             | Logout user                  |
| GET    | `/api/auth/get-me`                   | ✅              | Get logged-in user           |
| POST   | `/api/interview`                     | ✅              | Generate AI interview report |
| GET    | `/api/interview/report/:interviewId` | ✅              | Get interview report         |
| GET    | `/api/interview/`                    | ✅              | Get all user reports         |

`*` Logout behavior depends on how authentication tokens are implemented.

---

## 🔒 Authentication

Protected routes use the `authUser` middleware.

The middleware verifies the user's authentication token before allowing access to protected resources.

Protected endpoints include:

```text
GET  /api/auth/get-me
POST /api/interview
GET  /api/interview/report/:interviewId
GET  /api/interview/
```

Users can only access their own interview reports.

---

## 📄 Resume Upload

The interview generation endpoint accepts a PDF resume using `multipart/form-data`.

The frontend sends the file as the `resume` field.

The backend handles the file using:

```javascript
uploadMiddleware.single("resume")
```

The uploaded resume is then processed as part of the AI interview analysis.

---

## 🧠 AI Interview Generation

The application integrates Google Gemini to analyze the candidate's information.

The AI receives relevant information such as:

```text
Candidate Self Description
        +
Resume
        +
Job Description
        ↓
     Gemini AI
        ↓
Interview Analysis
        ↓
Structured Interview Report
```

The generated report can be stored in MongoDB and retrieved later through the interview report APIs.

---

## 🗄️ Database

The application uses MongoDB to store application data.

Typical data includes:

* User accounts
* Authentication-related information
* Interview reports
* Candidate information
* AI-generated interview analysis

Make sure your MongoDB Atlas cluster is accessible from your deployed backend.

---

## 🧪 Testing the API

You can test the API using:

* Postman
* Thunder Client
* Insomnia
* Frontend application

Example flow:

```text
POST /api/auth/register
```

Then:

```text
POST /api/auth/login
```

After authentication:

```text
POST /api/interview
```

with:

```text
selfDescription
jobDescription
resume
```

Then retrieve reports using:

```text
GET /api/interview/
```

or:

```text
GET /api/interview/report/:interviewId
```

---

## 📁 Important Backend Routes

### Authentication Router

```javascript
app.use('/api/auth', authRouter);
```

Available endpoints:

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/logout
GET  /api/auth/get-me
```

### Interview Router

```javascript
app.use('/api/interview', interviewRouter);
```

Available endpoints:

```text
POST /api/interview
GET  /api/interview/
GET  /api/interview/report/:interviewId
```

---
