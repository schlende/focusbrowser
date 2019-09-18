import { BrowserWindow, App, BrowserView } from 'electron';
import { resolve, join } from 'path';

export default class Main {
  static mainWindow: BrowserWindow;
  static application: App;

  private static onWindowAllClosed() {
    Main.application.quit();
  }

  private static onClose() {
    // Dereference the window object. 
    Main.mainWindow = null;
  }

  private static onReady() {
    Main.mainWindow = new BrowserWindow({ 
      width: 1000, 
      height: 800,
      webPreferences: {
        plugins: true,
        nodeIntegration: true,
        contextIsolation: false,
        javascript: true,
      }
    });

    let view = new BrowserView();
    Main.mainWindow.setBrowserView(view);
    view.setBounds({ x: 0, y: 50, width: 1000, height: 750 });
    view.setAutoResize({
      width: true,
      height: true,
    } as any);
    view.webContents.loadURL('https://google.com')

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