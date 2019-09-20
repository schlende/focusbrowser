import { observable, computed } from "mobx";
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

    this.projectState = ProjectState.Planning;
  }

  @observable
  public name: string;

  @observable
  public currentTask: string = '';

  @observable
  public remainingTime: number = 0;

  @observable
  private _projectState: ProjectState;

  public set projectState(state:ProjectState){
    if(state == ProjectState.Browsing){
      this._browserSession.visible = true;
    }else{
      this._browserSession.visible = false;
    }

    this._projectState = state;
  }

  @computed
  public get projectState(){
    return this._projectState;
  }

  private _browserSession: BrowserSession;

  private _interval: number = undefined;

  public get browserSession(){
    return this._browserSession;
  }

  public startSession(seconds: number){
    this.remainingTime = seconds;
    this.projectState = ProjectState.Browsing;
    this._interval = setInterval(() => {
      this.remainingTime -= 1;
      if(this.remainingTime <= 0){
        this.finish();
      }
    }, 1000);
  }

  public finish(){
    this.projectState = ProjectState.Planning;
    this.currentTask = '';
    if(this._interval){
      clearInterval(this._interval);
      this._interval = undefined;
    }
  }
}