import { observable, computed, action } from 'mobx';
import browserSession from '~/browserui/models/browser-session';
import { ipcRenderer } from 'electron';

export class ITab {

  constructor(id: number, url: string) {
    this.id = id;
    this._url = url;

    this.buildBrowserView();
  }

  @observable
  public id: number;

  @observable
  public viewId: number;

  @observable
  public title: string = 'New tab';

  @observable
  public loading = false;

  @observable
  public urlBarValue = '';

  @computed
  public get isSelected() {
    return false;
  }

  public goBack() {
    this.browserViewCall('webContents.goBack');
  }

  public goForward() {
    this.browserViewCall('webContents.goForward');
  }

  public reload() {
    this.browserViewCall('webContents.reload');
  }

  @observable
  private _url = '';

  public set url(url: string) {
    if(this.url === url){
      return;
    }

    if (!url.includes('.')) {
      url = "https://www.google.com/search?q=" + url;
    } else if (!/^https?:\/\//i.test(url)) {
      url = 'http://' + url;
    }

    this.browserViewCall('webContents.loadURL', url);
  }

  public get url() {
    return this._url;
  }

  public buildBrowserView() {
    if (!this.viewId) {
      this.viewId = ipcRenderer.sendSync('create-browser-view', this._url);

      ipcRenderer.on(`view-url-updated-${this.viewId}`, (event, url: string) => {
        this._url = url;
        this.urlBarValue = url;
      });

      ipcRenderer.on(`view-title-updated-${this.viewId}`, (event, title: string) => {
        this.title = title;
      });

      ipcRenderer.on(`navigate-done-${this.viewId}`, (event, url:string) => {
        this._url = url;
        this.urlBarValue = url;
      })
    }
  }

  public destroyBrowserView() {
    if (this.viewId) {
      ipcRenderer.send('destroy-browser-view', this.viewId);
      this.viewId = null;
    }
  }

  private browserViewCall(call: string, ...args: any[]) {
    ipcRenderer.send(`browserview-call`, {
      viewId: this.viewId,
      scope: call,
      args
    });
  }
}