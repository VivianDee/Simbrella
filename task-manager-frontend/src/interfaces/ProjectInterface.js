/**
 * @typedef {Object} User
 * @property {number} id - Unique identifier for the user.
 * @property {string} first_name - User's first name.
 * @property {string} last_name - User's last name.
 * @property {string} name - Full name of the user.
 * @property {string} email - User's email address.
 * @property {string} account_type - Type of account the user holds.
 */
const createUser = (id, first_name, last_name, name, email, account_type) => ({
    id,
    first_name,
    last_name,
    name,
    email,
    account_type,
  });

  /**
 * @typedef {Object} Task
 * @property {number} id - Unique identifier for the task.
 * @property {string} name - Name of the task.
 * @property {string} description - Detailed description of the task.
 * @property {number} project_id - The project the task belongs to.
 * @property {string} status - Status of the task (e.g., 'in-progress', 'completed').
 * @property {number} assigned_to - ID of the user the task is assigned to.
 * @property {string} created_at - Timestamp of task creation.
 */
const createTask = (id, name, description, project_id, status, assigned_to, created_at) => ({
    id,
    name,
    description,
    project_id,
    status,
    assigned_to,
    created_at,
  });

  /**
 * @typedef {Object} Project
 * @property {number} id - Unique identifier for the project.
 * @property {string} name - Name of the project.
 * @property {string} description - Detailed description of the project.
 * @property {number} team_id - ID of the associated team.
 * @property {Team} team - Team information associated with the project.
 * @property {Task[]} tasks - List of tasks in the project.
 */
const createProject = (id, name, description, team_id, team, tasks) => ({
    id,
    name,
    description,
    team_id,
    team,
    tasks,
  });

  /**
 * @typedef {Object} Team
 * @property {number} id - Unique identifier for the team.
 * @property {string} name - Name of the team.
 * @property {User[]} users - List of users in the team.
 */
const createTeam = (id, name, users) => ({
    id,
    name,
    users,
  });


  /**
 * @typedef {Object} ProjectApiResponse
 * @property {boolean} status - Indicates if the request was successful.
 * @property {number} statusCode - HTTP status code of the response.
 * @property {string} message - Response message.
 * @property {Project} data - Project data returned from the API.
 * @property {string|null} error - Error message if an error occurred.
 */
const createProjectApiResponse = (status, statusCode, message, data, error = null) => ({
    status,
    statusCode,
    message,
    data,
    error,
  });
  

