import { observable, computed, action } from 'mobx';


export class ITab {
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
}