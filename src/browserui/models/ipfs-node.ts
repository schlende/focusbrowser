
const IPFS = require('ipfs');


class IPFSNode{
  private ipfsNode: any;

  constructor(){
    this.setupIpfs();
  }

  public async loadIPFSSite(address:string, callback: (response: string) => any){
    address = 'QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A';
    // address = 'QmWcLKHWqrRB95zQnb4vX8RRgoGsVm5YAUHyZyiAw4mCMQ';
    
    // this.ipfsNode.get(address, (error: any, files: any) => {
    //   console.log("Got a response");
    //   debugger;
    // });

    const resp: string = await this.ipfsNode.cat(address);
    callback(resp)
  }

  private async setupIpfs(){
    try {
      this.ipfsNode = await IPFS.create();
      const id = await this.ipfsNode.id();
    } catch (err) {
      console.error(err)
    }
  }
}

const ipfsNode = new IPFSNode()
export default ipfsNode;