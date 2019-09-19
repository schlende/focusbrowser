import { observable, computed, action } from 'mobx';
import { ITab } from "~/browserui/models/tab";
const Electron = require('electron').remote;

class BrowserSession{
  public tabs: ITab[] = observable.array([], { deep: false });

  private get _window(){
    return Electron.BrowserWindow.getAllWindows()[0];
  }

  @observable
  private _selectedTab: ITab;

  @computed
  public get selectedTab(){
    return this._selectedTab;
  }

  public set selectedTab(tab: ITab){
    this._window.setBrowserView(tab.browserView);
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
  }
}

const browserSession = new BrowserSession()
export default browserSession;