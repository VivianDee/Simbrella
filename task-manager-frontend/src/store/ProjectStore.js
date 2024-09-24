import { autorun, makeAutoObservable } from "mobx";
import axios from "axios";
import { toast } from "react-toastify";
import { taskStore } from "./TaskStore";

class ProjectStore {
  projects = [];
  gettingProjectsLoading = false;
  selectedProject = null;
  getProjectError = null;
  baseUrl = process.env.REACT_APP_BASE_URL;
  apiKey = process.env.REACT_APP_API_KEY;

  constructor() {
    makeAutoObservable(this);
    autorun(() => {
      this.getAllProjects();
    });
  }

  addProject(project) {
    this.projects.push(project);
    this.createProjects(project);
  }

  async createProjects(proj) {
    this.gettingProjectsLoading = true;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(`${this.baseUrl}projects`, 
        {
          name: proj.name,
          description: proj.description,
        },
        {
        headers: {
          "x-api-key":
            `${this.apiKey}`,
          Authorization: `Bearer ${token}`,
        },
      });

      await projectStore.getAllProjects();

    } catch (err) {
      if (err.response) {
        this.getPtojectError =
          "Error: " + (err.response.data.message || err.message);
      } else if (err.request) {
        this.getPtojectError = "No response received from the server";
      } else {
        this.getPtojectError = "Request failed: " + err.message;
      }
    } finally {
      this.gettingProjectsLoading = false;
    }
  }

  setSelectedProject(project) {
    this.selectedProject = project;
  }

  getSelectedProject() {
    return this.projects.find((project) => project.id === this.selectedProject) || null;
  }

  getProjectById(taskId) {
    return this.projects.find((project) => project.id === taskId) || null;
  }

  async getAllProjects(projectId = null) {
    this.gettingProjectsLoading = true;
    const token = localStorage.getItem("token");
    try {
      const url = projectId
        ? `${this.baseUrl}projects/${projectId}`
        : `${this.baseUrl}projects`;

      const response = await axios.get(url, {
        headers: {
          "x-api-key":
            `${this.apiKey}`,
          Authorization: `Bearer ${token}`,
        },
      });

      if (projectId) {
        return response.data.data;
      }

      this.projects = response.data.data;
    } catch (err) {
      if (err.response) {
        this.getProjectError =
          "Error: " + (err.response.data.message || err.message);
      } else if (err.request) {
        this.getProjectError = "No response received from the server";
      } else {
        this.getProjectError = "Request failed: " + err.message;
      }
    } finally {
      this.gettingProjectsLoading = false;
    }
  }
}

export const projectStore = new ProjectStore();
