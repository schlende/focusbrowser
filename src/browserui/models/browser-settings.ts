
import { observable, computed, action } from 'mobx';

export enum DomainResolutionMethod {
  UnstoppableAPI,
  ZilliquaApi,
  DirectBlockchainLookup
}

export enum IPFSContentMethod {
  CloudflareCDN,
  InfuraAPI,
  DesignatedIPFSNode
}

export class BrowserSettings{
  constructor(){
    this.loadSettings();
  }

  @observable
  public domainResolutionMethod: DomainResolutionMethod;
  
  @observable
  public ipfsContentMethod: IPFSContentMethod;



  public loadSettings(){
    this.domainResolutionMethod = DomainResolutionMethod.UnstoppableAPI;
    this.ipfsContentMethod = IPFSContentMethod.CloudflareCDN;
  }

  public saveSettings(){
    
  }
}

