import { observable, computed, action } from 'mobx';
import browserSession, { BrowserSession } from '~/browserui/models/browser-session';
import { ipcRenderer } from 'electron';
import ipfsNode from './ipfs-node';

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
      url = url.replace('ipfs://', '');
      url = 'http://' + url + "/";
    }

    let extension = new URL(url).hostname.split('.').pop();
    if(extension == 'zil'){
      url = url.replace('http://', 'ipfs://');

      if(url.indexOf('ipfs://raw.zil') != -1){
        ipfsNode.loadIPFSSite(url, (response:string) => {
          console.log("Got IPFS response: " + response);
          let encoded:string = 'data:text,' + encodeURI(response);
          ipcRenderer.send(`load-new-url-${this.viewId}`, encoded, url);
        });
      }else{
        let destUrl:string = "https://cloudflare-ipfs.com/ipfs/QmWcLKHWqrRB95zQnb4vX8RRgoGsVm5YAUHyZyiAw4mCMQ/";
        ipcRenderer.send(`load-new-url-${this.viewId}`, destUrl, url);
      }
    }else{
      ipcRenderer.send(`load-new-url-${this.viewId}`, url, undefined);
    }
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