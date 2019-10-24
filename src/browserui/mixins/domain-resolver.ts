

import ipfsNode from '../models/ipfs-node';
import { hostname } from 'os';
import axios from 'axios';
import { Namicorn } from 'namicorn';

const namicorn = new Namicorn();

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
        // DomainResolver.resolveZilBlockchain(domain).then((zilResult) => { })

        DomainResolver.resolveZil(domain).then((zilResult) => {
          if (zilResult) {
            destUrl = "https://cloudflare-ipfs.com/ipfs/" + zilResult + "/";
          } else {
            if (showUrl.indexOf('ipfs://brad.zil') != -1) {
              destUrl = "https://cloudflare-ipfs.com/ipfs/QmefehFs5n8yQcGCVJnBMY3Hr6aMRHtsoniAhsM1KsHMSe/";
            } else if (showUrl.indexOf('ipfs://matt.zil') != -1) {
              destUrl = "https://cloudflare-ipfs.com/ipfs/QmUD69diRF8jwju2k4b9mD7PaXMjtMAKafqascL18VKvoD/";
            } else {
              destUrl = "https://cloudflare-ipfs.com/ipfs/QmWcLKHWqrRB95zQnb4vX8RRgoGsVm5YAUHyZyiAw4mCMQ/";
            }
          }

          if (destUrl && showUrl) {
            resolve({ url: showUrl, dest: destUrl });
          } else {
            reject("Bad show / dest url");
          }
        });


      } else {
        resolve({ url: undefined, dest: url });
      }
    });
  }

  public static resolveZilBlockchain(domain: string) {
    return new Promise((resolve, reject) => {

      let dmn = 'resolver.eth';

      namicorn.address(dmn, 'ETH')
        .then((response:any) => {
          console.log(dmn, ' resolves to', response)
        }).catch(console.error)
    })
  }

  public static resolveZil(domain: string) {
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
}