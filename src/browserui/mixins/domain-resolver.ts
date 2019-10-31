

import ipfsNode from '../models/ipfs-node';
import { hostname } from 'os';
import axios from 'axios';
import { BrowserSettings, IPFSContentMethod } from '~/browserui/models/browser-settings';

export class DomainResolver {
  private CLOUDFLARE_CDN_BASE: string = 'https://cloudflare-ipfs.com/ipfs/';
  private INFURA_CDN_BASE: string = 'https://ipfs.infura.io/ipfs/';

  private browserSettings: BrowserSettings;

  constructor(browserSettings: BrowserSettings) {
    this.browserSettings = browserSettings;
  }

  public resolve(url: string) {
    return new Promise((resolve, reject) => {
      let destUrl: string = undefined;
      let showUrl: string = undefined;

      if (!url.includes('.')) {
        url = "https://www.google.com/search?q=" + url;
      } else if (!/^https?:\/\//i.test(url)) {
        url = url.replace('ipfs://', '');
        url = 'http://' + url + "/";
      }

      let hostnameParts = new URL(url).hostname.split('.');
      let extension = hostnameParts[hostnameParts.length - 1];
      let domain = hostnameParts[hostnameParts.length - 2];

      if (extension == 'zil') {
        showUrl = url.replace('http://', 'ipfs://');

        this.resolveZil(domain).then((zilResult) => {
          if (zilResult) {
            destUrl = this.cdnBaseUrl + zilResult + "/";
          } else {
            if (showUrl.indexOf('ipfs://brad.zil') != -1) {
              destUrl = this.cdnBaseUrl + "QmefehFs5n8yQcGCVJnBMY3Hr6aMRHtsoniAhsM1KsHMSe/";
            } else if (showUrl.indexOf('ipfs://matt.zil') != -1) {
              destUrl = this.cdnBaseUrl + "QmUD69diRF8jwju2k4b9mD7PaXMjtMAKafqascL18VKvoD/";
            } else {
              destUrl = this.cdnBaseUrl + "QmWcLKHWqrRB95zQnb4vX8RRgoGsVm5YAUHyZyiAw4mCMQ/";
            }
          }

          resolve({ url: showUrl, dest: destUrl });
        });
      } else {
        resolve({ url: undefined, dest: url });
      }
    });
  }

  public resolveZil(domain: string) {
    let resolveFrom = 'https://unstoppabledomains.com/api/v1/' + domain + '.zil'
    return new Promise((resolve, reject) => {
      axios.get(resolveFrom).then((response) => {
        if (response.data['ipfs'] && response.data.ipfs['html']) {
          console.log(response.data.ipfs.html);
          resolve(response.data.ipfs.html);
        } else {
          console.log('No valid API response returned');
          resolve(undefined);
        }
      });
    });
  }

  public get cdnBaseUrl() {
    switch (this.browserSettings.ipfsContentMethod) {
      case IPFSContentMethod.CloudflareCDN:
        return this.CLOUDFLARE_CDN_BASE;
      case IPFSContentMethod.InfuraAPI:
        return this.INFURA_CDN_BASE;
    }

    return this.CLOUDFLARE_CDN_BASE;
  }
}