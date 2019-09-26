import { BrowserWindow, App, BrowserView, Menu } from 'electron';
import { resolve, join } from 'path';
import { ViewManager } from '~/electron/view-manager';
import { getMainMenu } from '~/electron/mainmenu';
import { FindWindow } from '~/electron/window/findwindow';

export default class Main {
  static mainWindow: BrowserWindow;
  static application: App;
  static viewManager: ViewManager;

  private static onWindowAllClosed() {
    Main.application.quit();
  }

  private static onClose() {
    // Dereference the window object. 
    Main.mainWindow = null;
  }

  private static onReady() {
    Main.mainWindow = new BrowserWindow({ 
      frame: false,
      minWidth: 400,
      minHeight: 450,
      width: 1200, 
      height: 700,
      titleBarStyle: 'hiddenInset',
      webPreferences: {
        plugins: true,
        nodeIntegration: true,
        contextIsolation: false,
        javascript: true,
      }
    });

    this.viewManager = new ViewManager(Main.mainWindow);
    Menu.setApplicationMenu(getMainMenu(this.viewManager));

    // let find:FindWindow = new FindWindow(Main.mainWindow);
    // find.show();

    Main.mainWindow.on('closed', Main.onClose);
    Main.mainWindow.loadURL('http://localhost:3001');
    Main.mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
    // we pass the Electron.App object and the  
    // Electron.BrowserWindow into this function 
    // so this class has no dependencies. This 
    // makes the code easier to write tests for 
    Main.application = app;
    Main.application.on('window-all-closed', Main.onWindowAllClosed);
    Main.application.on('ready', Main.onReady);
  }
}