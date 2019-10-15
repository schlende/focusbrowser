

import ipfsNode from '../models/ipfs-node';
import { hostname } from 'os';
import axios from 'axios';

export class DomainResolver {
  constructor() {

  }

  public static resolve(url: string) {
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

        DomainResolver.resolveZil(domain).then((zilResult) => {
          if(zilResult){
            destUrl = "https://cloudflare-ipfs.com/ipfs/" + zilResult + "/";
          }else{
            if (url.indexOf('ipfs://raw.zil') != -1) {
              ipfsNode.loadIPFSSite(url, (response: string) => {
                console.log("Got IPFS response: " + response);
                destUrl = 'data:text,' + encodeURI(response);
              });
            } else if (url.indexOf('ipfs://brad.zil') != -1) {
              destUrl = "https://cloudflare-ipfs.com/ipfs/QmefehFs5n8yQcGCVJnBMY3Hr6aMRHtsoniAhsM1KsHMSe/";
            } else if (url.indexOf('ipfs://matt.zil') != -1) {
              destUrl = "https://cloudflare-ipfs.com/ipfs/QmUD69diRF8jwju2k4b9mD7PaXMjtMAKafqascL18VKvoD/";
            } else {
              destUrl = "https://cloudflare-ipfs.com/ipfs/QmWcLKHWqrRB95zQnb4vX8RRgoGsVm5YAUHyZyiAw4mCMQ/";
            }
          }
        
          resolve({ url: showUrl, dest: destUrl });
        });
      }else{
        resolve({ url: undefined, dest: url});
      }
    });
  }

  public static resolveZil(domain: string) {
    let resolveFrom = 'https://unstoppabledomains.com/api/record/zil?label=' + domain;
    return new Promise((resolve, reject) => {
      axios.get(resolveFrom).then((response) => {
        if (response.data.ipfs['html']) {
          console.log(response.data.ipfs.html);
          resolve(response.data.ipfs.html);
        } else {
          console.log('No valid API response returned');
          resolve(undefined);
        }
      });
    });
  }
}