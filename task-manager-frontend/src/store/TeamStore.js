
// TeamStore.ts
import { makeAutoObservable } from "mobx";

class TeamStore {
  teams = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTeam(team) {
    this.teams.push(team);
  }
}

export const teamStore = new TeamStore();
