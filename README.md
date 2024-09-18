# Task Management Application

## Overview

This project is a feature-rich task management application designed to help teams and individuals manage tasks, projects, and team collaborations efficiently. It supports real-time updates, notifications, and user management, with both frontend and backend integrations.

## Technologies Used

- **Frontend**: TailwindCSS
- **Backend**: PHP Laravel
- **Database**: MySQL
- **Real-time Updates**: WebSocket
- **Version Control**: Git, GitHub
- **Deployment**: Vercel (Frontend), Cloud service (Backend: AWS, DigitalOcean)

## Features

1. **User Authentication**: Registration, login, and logout functionalities with secure password hashing.
2. **Task Management**: CRUD operations (Create, Read, Update, Delete) for tasks, with the ability to assign tasks to users.
3. **Project Management**: Manage multiple projects and assign tasks to projects.
4. **Team Management**: Assign users to projects, and manage teams.
5. **Real-time Updates**: WebSocket integration for real-time task updates.
6. **Notifications**: Email notifications for task changes or updates.

## Prerequisites

- PHP & Composer (for Laravel backend)
- MySQL (for database)
- Git (for version control)

## Setup Instructions

### Frontend (React)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/task-management-app.git
   cd task-management-app/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   - Create a `.env.local` file in the root of your frontend project.
   - Add your environment variables:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:5000
     ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Visit the application**: Open `http://localhost:3000` to view the app.

### Backend (PHP Laravel)

1. **Clone the backend repository**:
   ```bash
   git clone https://github.com/yourusername/task-management-app-backend.git
   cd task-management-app-backend
   ```

2. **Install dependencies**:
   - **Laravel**:
     ```bash
     composer install
     ```

3. **Set up database**:
   - **MySQL**: Create a MySQL database and update the `.env` file accordingly.

4. **Configure environment variables**:
    - **Laravel**, update `.env` with your MySQL credentials:
     ```env
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=task_management_db
     DB_USERNAME=root
     DB_PASSWORD=yourpassword
     ```

5. **Run migrations**:
   - For **Laravel**:
     ```bash
     php artisan migrate
     ```

6. **Run the backend server**:
- For **Laravel**:
     ```bash
     php artisan serve
     ```

7. **Check API**: The backend API should be running on `http://localhost:8000`.

### WebSocket Server (for real-time updates)

1. **Set up WebSocket**:
   - The WebSocket server is integrated into the backend (Laravel). No additional setup is required.

2. **Start the WebSocket server**:
   The WebSocket server will automatically start with the backend.

## API Endpoints

### User Authentication
- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Log in a user.
- **POST** `/api/auth/logout`: Log out a user.

### Task Management
- **POST** `/api/tasks`: Create a new task.
- **GET** `/api/tasks`: Retrieve all tasks.
- **GET** `/api/tasks/:id`: Retrieve a specific task.
- **PUT** `/api/tasks/:id`: Update a task.
- **DELETE** `/api/tasks/:id`: Delete a task.

### Project Management
- **POST** `/api/projects`: Create a new project.
- **GET** `/api/projects`: Retrieve all projects.
- **GET** `/api/projects/:id`: Retrieve a specific project.
- **PUT** `/api/projects/:id`: Update a project.
- **DELETE** `/api/projects/:id`: Delete a project.

### Team Management
- **POST** `/api/teams`: Create a new team.
- **GET** `/api/teams`: Retrieve all teams.
- **POST** `/api/teams/:team_id/users`: Assign a user to a team.

## Deployment

1. **Frontend**:
   - Deploy the frontend to Vercel by connecting your GitHub repository.
   
2. **Backend**:
   - Deploy the backend to .
   
3. **CI/CD Pipeline**:
   - Set up GitHub Actions for continuous integration and deployment.

## License

This project is licensed under the MIT License.

## Contact

If you have any questions or need further clarification, feel free to reach out to me at vdagbue@gmail.com.