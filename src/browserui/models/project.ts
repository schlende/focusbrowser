import { observable } from "mobx";
import { BrowserSession } from "~/browserui/models/browser-session";

export enum ProjectState {
  Planning,
  Browsing,
  Paused
}

export class Project {

  constructor(name: string){
    this.name = name;

    this._browserSession = new BrowserSession();
  }

  @observable
  public name: string;

  @observable
  public currentTask: string;

  @observable
  public projectState: ProjectState;

  private _browserSession: BrowserSession;

  public get browserSession(){
    return this._browserSession;
  }
}