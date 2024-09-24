// TaskStore.ts
import { autorun, makeAutoObservable } from "mobx";
import axios from "axios";
import { projectStore } from "./ProjectStore";

class TaskStore {
  tasks = [];
  selectedTask = null;
  gettingTasksLoading = true;
  getTaskError = null;
  baseUrl = process.env.REACT_APP_BASE_URL;
  apiKey = process.env.REACT_APP_API_KEY;

  constructor() {
    makeAutoObservable(this);
  }

  addTask(task) {
    this.tasks.push(task);
    this.createTasks(task);
  }

  async createTasks(task) {
    this.gettingTasksLoading = true;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(`${this.baseUrl}tasks`, 
        {
          name: task.name,
          description: task.description,
          project_id: task.project_id
        },
        {
        headers: {
          "x-api-key":
            `${this.apiKey}`,
          Authorization: `Bearer ${token}`,
        },
      });

      const project = await projectStore.getAllProjects(projectStore.selectedProject.id);
      this.tasks = project.tasks;

    } catch (err) {
      if (err.response) {
        this.getTaskError =
          "Error: " + (err.response.data.message || err.message);
      } else if (err.request) {
        this.getTaskError = "No response received from the server";
      } else {
        this.getTaskError = "Request failed: " + err.message;
      }
    } finally {
      this.gettingTasksLoading = false;
    }
  }


  updateTasks(tasks) {
    this.tasks = tasks;
  }

  setSelectedTask(task) {
    this.selectedTask = task.id;
  }

  getSelectedTask() {
    return this.tasks.find((task) => task.id === this.selectedTask) || null;
  }

  updateSelectedTask(task) {
    this.selectedTask = task.id;
  }

  async getAllTasks() {
    this.gettingTasksLoading = true;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${this.baseUrl}tasks`, {
        headers: {
          "x-api-key":
            `${this.apiKey}`,
          Authorization: `Bearer ${token}`,
        },
      });

      this.tasks = response.data.data;
    } catch (err) {
      if (err.response) {
        this.getTaskError =
          "Error: " + (err.response.data.message || err.message);
      } else if (err.request) {
        this.getTaskError = "No response received from the server";
      } else {
        this.getTaskError = "Request failed: " + err.message;
      }
    } finally {
      this.gettingTasksLoading = false;
    }
  }

  toggleTaskSelection(taskId) {
    this.tasks = this.tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            status: task.status === "completed" ? "pending" : "completed",
          }
        : task
    );
  }

  getTaskById(taskId) {
    return this.tasks.find((task) => task.id === taskId) || null;
  }

  async updateTaskStatus(taskId, newStatus) {
    this.gettingTasksLoading = true;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${this.baseUrl}tasks/status`,
        {
          task_id: taskId
        },
        {
          headers: {
            "x-api-key":
              `${this.apiKey}`,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      projectStore.getAllProjects();
    } catch (err) {
      if (err.response) {
        this.getTaskError =
          "Error: " + (err.response.data.message || err.message);
      } else if (err.request) {
        this.getTaskError = "No response received from the server";
      } else {
        this.getTaskError = "Request failed: " + err.message;
      }
    } finally {
      this.gettingTasksLoading = false;
    }
  }
}

export const taskStore = new TaskStore();
