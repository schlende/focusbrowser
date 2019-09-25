import { BrowserView, BrowserWindow, ipcMain } from "electron";

export class View extends BrowserView {
  private window: BrowserWindow;
  private static blacklist = ["trump", "news.ycombinator.com", "youtube.com"];
  public favicon = '';

  constructor(window: BrowserWindow, url: string) {
    super({
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        // partition: incognito ? 'view_incognito' : 'persist:view',
        plugins: true,
        additionalArguments: [`--window-id=${window.id}`],
        nativeWindowOpen: true,
        webSecurity: true,
        javascript: true,
      }
    });

    let incognito: boolean = false;
    this.window = window;

    let newBounds = this.window.getBounds();
    this.window.setBrowserView(this);

    this.setBounds({ x: 0, y: 80, width: newBounds.width, height: newBounds.height - 80 });
    this.setAutoResize({
      width: true,
      height: true,
    } as any);

    this.webContents.loadURL(url);
    this.window.setBrowserView(null);

    this.webContents.addListener('did-finish-load', () => {
      this.window.webContents.send(
        `view-url-updated-${this.webContents.id}`,
        this.webContents.getURL()
      );
    });

    this.webContents.addListener('page-title-updated', (e, title) => {
      this.window.webContents.send(
        `view-title-updated-${this.webContents.id}`,
        title,
      );
    });

    // this.webContents.openDevTools();

    ipcMain.on('load-new-url', (event, url) => {
      console.log("Will navigate to " + url);

      let blacklistterms = View.blacklist.map(term => url.includes(term));
      let inlist = blacklistterms.includes(true);

      if (inlist != true) {
        this.webContents.loadURL(url);
      }
    }); 

    this.webContents.addListener('will-navigate', (event, url) => {
      console.log("Will navigate to " + url);
      let blacklistterms = View.blacklist.map(term => url.includes(term));
      let inlist = blacklistterms.includes(true);

      if (inlist == true) {
        event.preventDefault();
      }
    });

    this.webContents.addListener('did-navigate', (event, url) => {
      this.window.webContents.send(
        `navigate-done-${this.webContents.id}`,
        url,
      );
    });


    this.webContents.addListener('did-stop-loading', () => {
      this.updateNavigationState();
      this.window.webContents.send(
        `view-loading-${this.webContents.id}`,
        false,
      );
    });

    this.webContents.addListener('found-in-page', (e, result) => {
      // this.window.findWindow.webContents.send('found-in-page', result);
    });

    this.webContents.addListener('did-start-loading', () => {
      this.updateNavigationState();
      this.window.webContents.send(`view-loading-${this.webContents.id}`, true);
    });

    this.webContents.addListener(
      'page-favicon-updated',
      async (e, favicons) => {
        this.favicon = favicons[0];

        this.window.webContents.send(
          `browserview-favicon-updated-${this.webContents.id}`,
          this.favicon,
        );
      },
    );

  }

  public updateNavigationState() {
    if (this.isDestroyed()) return;
    this.window.webContents.send('update-navigation-state', {
      canGoBack: this.webContents.canGoBack(),
      canGoForward: this.webContents.canGoForward(),
    });
  }
}