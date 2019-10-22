import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserView } from "~/browserui/views/browser/BrowserView";
import browserSession, { BrowserSession } from "~/browserui/models/browser-session";
import { observer } from "mobx-react-lite";
import { Project, ProjectState } from "~/browserui/models/project";
import styled from "styled-components";
import { SessionStartView } from "~/browserui/views/browser/SessionStartView";
import { ipcRenderer } from 'electron';
import { pinDirectoryToIPFS } from '~/browserui/ipfs/ipfs-interface';

const { dialog } = require('electron').remote;
var fs = require('fs');

browserSession.visible = true;

const TopBar = styled('div') `
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  -webkit-app-region: drag;
`

function readFilesInDir(dir: string) {
  fs.readdir(dir, 'utf-8', (err: any, files: any) => {
    let promises: any = [];
    files.forEach((file: string) => {
      let path: string = dir + '/' + file;
      promises.push(new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err: any, data: any) => {
          if (err) {
            console.log("Error: " + err);
            reject();
          } else {
            console.log("Loaded " + path);
            resolve(data);
          }
        });
      }))
    });

    Promise.all(promises).then((values) => {
    });
  });
}

ipcRenderer.on('upload-new-version-of-mattdotzil', () => {
  dialog.showOpenDialog({ properties: ['openDirectory'] }).then(result => {
    let path: string = result.filePaths[0];
    pinDirectoryToIPFS(path, 'e0918a4dd848b1818dd1', '117bffc8df8722196db4b611047b33e764e3f3c3f6b5a22725e1afa3461e80dc');
  });
});


ReactDOM.render(
  <div>
    <TopBar />
    <BrowserView browserSession={browserSession} />
  </div>,
  document.getElementById("app")
);


