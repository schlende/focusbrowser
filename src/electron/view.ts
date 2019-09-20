import { BrowserView, BrowserWindow } from "electron";

export class View extends BrowserView {
  private window: BrowserWindow;

  constructor(window: BrowserWindow, url:string) {
    let incognito:boolean=false;
    
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
      }});

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

    this.webContents.addListener('will-navigate', (event, url) => {
      const blacklist = ["trump", "news.ycombinator.com", "youtube.com"];
      let blacklistterms = blacklist.map(term => url.includes(term));
      let inlist = blacklistterms.includes(true);

      if(inlist == true){
        event.preventDefault();
      }
    });

    this.webContents.addListener('did-navigate', (event, url) => {
      this.window.webContents.send(
        `navigate-done-${this.webContents.id}`,
        url,
      );
    });


    // this.webContents.addListener(
    //   'certificate-error',
    //   (
    //     event: Electron.Event,
    //     url: string,
    //     error: string,
    //     certificate: Electron.Certificate,
    //     callback: Function,
    //   ) => {
    //     console.log(certificate, error, url);
    //     // TODO: properly handle insecure websites.
    //     event.preventDefault();
    //     callback(true);
    //   },
    // );
  }
}