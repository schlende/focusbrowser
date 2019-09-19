import { observable, computed, action } from 'mobx';
const Electron = require('electron').remote;

export class ITab {

  constructor(id:number, url:string){
    this.id = id;
    this.url = url;

    this.buildBrowserView();
  }

  @observable
  public id: number;

  @observable
  public title: string = 'New tab';

  @observable
  public loading = false;

  @observable
  public url = '';

  @computed
  public get isSelected() {
    return false;
  }
  
  public get browserView(){
    return this._browserView;
  }

  private _browserView: Electron.BrowserView;

  private get _window(){
    return Electron.BrowserWindow.getAllWindows()[0];
  }

  public buildBrowserView(){

    if(this._browserView != null){
      console.log("Being called multiple times");
      return;
    }

    const view = new Electron.BrowserView({
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        plugins: true,
        nativeWindowOpen: true,
        webSecurity: true,
        javascript: true,
      }
    });
    
    let newBounds = this._window.getBounds();
    this._window.setBrowserView(view);
  
    view.setBounds({ x: 0, y: 80, width: newBounds.width, height: newBounds.height - 80 });
    view.setAutoResize({
      width: true,
      height: true,
    } as any);
    view.webContents.loadURL(this.url);
  
    this._browserView = view;
  }

  public destroyBrowserView(){
    if(this._browserView != null){
      if (this._window.getBrowserView() === this._browserView) {
        this._window.setBrowserView(null);
      }
      this._browserView.destroy();
    }
  }
}