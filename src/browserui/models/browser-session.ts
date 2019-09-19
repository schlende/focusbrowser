import { observable, computed, action } from 'mobx';
import { ITab } from "~/browserui/models/tab";
import { ipcRenderer } from 'electron';
const Electron = require('electron').remote;

class BrowserSession{
  public tabs: ITab[] = observable.array([], { deep: false });

  private get _window(){
    return Electron.BrowserWindow.getAllWindows()[0];
  }

  @observable
  private _selectedTab: ITab;

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
    if(tab != null && tab.viewId){
      ipcRenderer.send('set-selected-browser', tab.viewId);
    }
    this._selectedTab = tab;
  }

  public addTab(url: string){
    let newTab = new ITab(this.tabs.length, url);
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