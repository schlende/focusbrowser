import { BrowserWindow, app, ipcMain } from 'electron';
import { join } from 'path';

export class PopupWindow extends BrowserWindow {
  protected appWindow: BrowserWindow;

  public constructor(appWindow: BrowserWindow, name: string, devtools = false) {
    super({
      frame: false,
      resizable: false,
      transparent: true,
      show: false,
      fullscreenable: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
      skipTaskbar: true,
      backgroundColor: '#00ffffff',
    });

    this.appWindow = appWindow;

    if (process.env.ENV === 'dev') {
      if (devtools) {
        this.webContents.openDevTools({ mode: 'detach' });
      }
      this.loadURL(`http://localhost:4444/${name}.html`);
    } else {
      this.loadURL(join('file://', app.getAppPath(), `build/${name}.html`));
    }

    ipcMain.on(`get-window-id-${this.id}`, e => {
      e.returnValue = this.appWindow.id;
    });

    this.setParentWindow(this.appWindow);
  }
}