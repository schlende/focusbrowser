import { observable, computed, action } from 'mobx';
import { ITab } from "~/browserui/models/tab";
import { ipcRenderer } from 'electron';

export class BrowserSession{

  constructor(){
    this.addTab('https://google.com');

    ipcRenderer.on('update-navigation-state', (e, data) => {
      this.navigationState = data;
    });

    ipcRenderer.on('api-tabs-create', (e) => {
      this.addTab('https://google.com');
    });

    ipcRenderer.on('api-remove-tab', (e, id) => {
      console.log("Remove tab " + id);
      let tab:ITab = this.tabs.find(tab => tab.viewId === id);
      if(tab && this.tabs.length > 1){
        this.removeTab(tab);
      }
    })
  }

  public tabs: ITab[] = observable.array([], { deep: false });

  @observable
  public navigationState = {
    canGoBack: false,
    canGoForward: false,
  };

  @observable
  private _selectedTab: ITab;

  @observable
  private _visible: boolean = null;

  public set visible(visible: boolean){
    if(visible != this._visible){
      this._visible = ipcRenderer.sendSync('set-browser-visibility', visible);
    }
  }

  public get visible(){
    return this._visible;
  }

  @computed
  public get currentUrlBarValue(){
    if(this._selectedTab){
      return this._selectedTab.urlBarValue;
    }else{
      return '';
    }
  }

  @computed
  public get selectedTab(){
    return this._selectedTab;
  }

  public set selectedTab(tab: ITab){
    console.log("Setting selected tab");

    if(tab != null && tab.viewId){
      ipcRenderer.send('set-selected-browser', tab.viewId);
    }

    this._selectedTab = tab;
  }

  public addTab(url: string){
    let newTab = new ITab(url, this);
    this.tabs.push(newTab);
    this.selectedTab = newTab;
  }

  public removeTab(tab: ITab){
    var index = this.tabs.indexOf(tab);

    if (index > -1) {
       this.tabs.splice(index, 1);
    }

    tab.destroyBrowserView();

    if(tab === this.selectedTab && this.tabs.length > 0){
      this.selectedTab = this.tabs[this.tabs.length - 1];
    }

    if(this.tabs.length == 0){
      this.selectedTab = null;
    }
  }
}

const browserSession = new BrowserSession()
export default browserSession;