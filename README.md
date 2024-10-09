# Task Management Application

## Overview

This project is a feature-rich task management application designed to help teams and individuals manage tasks, projects, and team collaborations efficiently. It supports real-time updates, notifications, and user management, with both frontend and backend integrations.

## Technologies Used

- **Frontend**: React, Bootstrap
- **Backend**: PHP Laravel
- **Database**: MySQL
- **Real-time Updates and Stae Management**: Mobex
- **Version Control**: Git, GitHub
- **Deployment**: Vercel

## Features

1. **User Authentication**: Registration, login, and logout functionalities with secure password hashing.
2. **Task Management**: CRUD operations (Create, Read, Update, Delete) for tasks, with the ability to assign tasks to users.
3. **Project Management**: Manage multiple projects and assign tasks to projects.
4. **Team Management**: Assign users to projects, and manage teams.
5. **Notifications**: Email notifications for task changes or updates.

## Prerequisites

- PHP & Composer (for Laravel backend)
- MySQL (for database)
- Git (for version control)

## Setup Instructions

### Frontend (React)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/VivianDee/Simbrella.git
   cd task-manager-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   - Create a `.env` file in the root of your frontend project.
   - Add your environment variables:
     ```env
     REACT_APP_BASE_URL=http://127.0.0.1:8000/api/
     REACT_APP_API_KEY=sk_test_4eC39HqLyjWDarjtT1zdp7dc_8b5kR9QwA2mK7X6YvJ0zLf3Gp1N8cT4Ue9G7O2W8P9H0yR1tQ6xF3L5Vb2Z9J7U
     ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Visit the application**: Open `http://localhost:3000` to view the app.

### Backend (PHP Laravel)

1. **Clone the repository**:
   ```bash
    git clone https://github.com/VivianDee/Simbrella.git
   cd backend
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
     TASK_MAIL_MAILER=smtp
     TASK_MAIL_HOST=smtp.gmail.com
     TASK_MAIL_PORT=587
     TASK_MAIL_USERNAME=taskmanager398@gmail.com
     TASK_MAIL_PASSWORD=**********
     TASK_MAIL_ENCRYPTION=ssl
     TASK_MAIL_FROM_ADDRESS=taskmanager398@gmail.com
     TASK_MAIL_FROM_NAME="TASK MANAGER"
     API_KEY=sk_test_4eC39HqLyjWDarjtT1zdp7dc_8b5kR9QwA2mK7X6YvJ0zLf3Gp1N8cT4Ue9G7O2W8P9H0yR1tQ6xF3L5Vb2Z9J7U
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


## API Endpoints

### User Authentication
- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Log in a user.
- **POST** `/api/auth/logout`: Log out a user.

### Task Management
- **POST** `/api/tasks`: Create a new task.
- **GET** `/api/tasks`: Retrieve all tasks.
- **GET** `/api/tasks/:id`: Retrieve a specific task.
- **PUT** `/api/tasks/`: Update a task.
- **DELETE** `/api/tasks/:id`: Delete a task.

### Project Management
- **POST** `/api/projects`: Create a new project.
- **GET** `/api/projects`: Retrieve all projects.
- **GET** `/api/projects/:id`: Retrieve a specific project.
- **PUT** `/api/projects/`: Update a project.
- **DELETE** `/api/projects/:id`: Delete a project.

### Team Management
- **POST** `/api/teams`: Create a new team.
- **GET** `/api/teams`: Retrieve all teams.
- **POST** `/api/teams/:team_id/users`: Assign a user to a team.

## Deployment

   - Deployed to Vercel by connecting GitHub repository.

## License

This project is licensed under the MIT License.

## Contact

If you have any questions or need further clarification, feel free to reach out to me at vdagbue@gmail.com.
