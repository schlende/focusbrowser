
const IPFS = require('ipfs');


class IPFSNode {
  private ipfsNode: any;

  constructor() {
  }

  public async loadIPFSSite(address: string) {
    return new Promise(async (resolve, reject) => {
      if (!this.ipfsNode) {
        try {
          this.ipfsNode = await IPFS.create();
          const id = await this.ipfsNode.id();
          console.log("Node ready " + id);
        } catch (err) {
          console.error(err);
          reject(err);
        }
      }

      const resp: any = await this.ipfsNode.get(address);
      debugger;
      
    })
  }
}

const ipfsNode = new IPFSNode()
export default ipfsNode;