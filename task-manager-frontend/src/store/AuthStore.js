// src/store/AuthStore.js
import { autorun, makeAutoObservable } from "mobx";
import axios from "axios";

class AuthStore {
  user = null;
  token = localStorage.getItem("token") || null;
  userError = null;
  asignee = null;
  baseUrl = process.env.REACT_APP_BASE_URL;
  apiKey = process.env.REACT_APP_API_KEY;


  constructor() {
    makeAutoObservable(this);
    autorun(() => {
      this.fetchUserData();
    });
  }

  setUser(user) {
    this.user = user;
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem("token", token);
  }

  logout() {
    return this.clearAuth();
  }

  async clearAuth() {
    try {
      const response = await axios.post(
        
        `${this.baseUrl}auth/logout`,
        {},
        {
          headers: {
            "x-api-key":
              `${this.apiKey}`,
            Authorization: `Bearer ${this.token}`,
          },
        }
      );

      this.user = null;
      this.token = null;
      localStorage.removeItem("token");

      return "Logged out"

    } catch (err) {
      this.userError = err.response ? err.response.data.message : err.message;
      return null;
    }
  }

  async fetchUserData() {
    if (!this.token) return;

    try {
      const response = await axios.get(`${this.baseUrl}user`, {
        headers: {
          "x-api-key":
            `${this.apiKey}`,
          Authorization: `Bearer ${this.token}`,
        },
      });
      this.setUser(response.data.data);
    } catch (err) {
      this.userError = err.response ? err.response.data.message : err.message;
      this.clearAuth();
    }
  }

  async getUserById(userId) {
    try {
      const response = await axios.get(
        `${this.baseUrl}user/${userId}`,
        {
          headers: {
            "x-api-key":
              `${this.apiKey}`,
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      return response.data.data;
    } catch (err) {
      this.userError = err.response ? err.response.data.message : err.message;
      return null;
    }
  }
}

export const authStore = new AuthStore();
