import { observable, computed, action } from 'mobx';
import browserSession, { BrowserSession } from '~/browserui/models/browser-session';
import { ipcRenderer } from 'electron';

export class ITab {

  constructor(url: string, session: BrowserSession) {
    this._session = session;
    this._url = url;

    this.buildBrowserView();
  }

  private _session: BrowserSession;

  @observable
  public id: number;

  @observable
  public viewId: number;

  @observable
  public title: string = 'New tab';

  @observable
  public loading = false;

  @observable
  public favicon = '';

  @observable
  public urlBarValue = '';

  @computed
  public get selected(){
    return this._session.selectedTab == this;
  }

  @computed
  public get collapsable(){
    return this._session.tabs.length > 1;
  }

  @computed
  public get isIconSet() {
    return this.favicon !== '' || this.loading;
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
    console.log("Setting url to " + url);
    if(this.url === url){
      return;
    }

    if (!url.includes('.')) {
      url = "https://www.google.com/search?q=" + url;
    } else if (!/^https?:\/\//i.test(url)) {
      url = 'http://' + url;
    }

    ipcRenderer.send(`load-new-url-${this.viewId}`, url);
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

      ipcRenderer.on(`view-loading-${this.viewId}`, (event, yesno) => {
        this.loading = yesno;
      });

      ipcRenderer.on(`browserview-favicon-updated-${this.id}`,
        async (e, favicon: string) => {
          this.favicon = favicon;
        },
      );
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