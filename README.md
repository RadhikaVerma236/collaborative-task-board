# Collaborative Task Board

A full-stack Kanban task management application designed for teams
to create, assign, track, and manage tasks collaboratively.

## Features

- JWT authentication and role-based authorization
- Kanban task management
- Create, edit, delete, and assign tasks
- Task priorities and due dates
- Search and filtering
- My Tasks dashboard
- Activity logs with cursor-based pagination
- Real-time task updates using Socket.IO
- API rate limiting
- Optimistic UI updates
- Responsive Material UI interface

## Tech Stack

### Frontend
- React.js
- JavaScript
- Material UI
- React Router
- Axios

### Backend
- Node.js
- Express.js
- Socket.IO
- JWT

### Database
- MongoDB
- Mongoose

## Project Structure

client/   → React frontend
server/   → Node.js/Express backend

## Getting Started

### Clone the repository

git clone <your-repository-url>

### Install dependencies

cd client
npm install

cd ../server
npm install

### Environment Variables

Create a `.env` file in the server directory and add the required
environment variables.

### Run the application

Start the backend and frontend development servers separately.

## Future Improvements

- ...
