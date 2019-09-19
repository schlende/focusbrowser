import { ipcMain, BrowserWindow, BrowserView } from "electron";
import { View } from "~/electron/view";

export class ViewManager {
  private window: BrowserWindow;
  private views: Map<number, View> = new Map<number, View>();

  constructor(window: BrowserWindow) {
    this.window = window;

    ipcMain.on('create-browser-view', (event, arg) => {
      const view = new View(window, arg);

      this.views.set(view.webContents.id, view);

      event.returnValue = view.webContents.id;
    })

    ipcMain.on('destroy-browser-view', (event, arg) => {
      let view: View = this.getView(arg);
      if (view) {

        if (this.window.getBrowserView() === view) {
          this.window.setBrowserView(null);
        }

        view.destroy();
      }
    })

    ipcMain.on('set-selected-browser', (event, arg) => {
      let view: View = this.getView(arg);
      if (view) {
        this.window.setBrowserView(view);
      }
    })

    ipcMain.on(`browserview-call`, async (e, data) => {
      const view = this.views.get(data.viewId);
      if (view) {
        let scope: any = view;

        if (data.scope && data.scope.trim() !== '') {
          const scopes = data.scope.split('.');
          for (const s of scopes) {
            scope = scope[s];
          }
        }

        let result = scope.apply(view.webContents, data.args);

        if (result instanceof Promise) {
          result = await result;
        }

        if (data.callId) {
          this.window.webContents.send(
            `browserview-call-result-${data.callId}`,
            result,
          );
        }
      }
    });

  }


  private getView = (id: number) => {
    return this.views.get(id);
  }
}