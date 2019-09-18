import { app, BrowserWindow } from 'electron';
import Main from './main';

app.setName("Focus Browser");

Main.main(app, BrowserWindow);