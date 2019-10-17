//imports needed for this function
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const recursive = require('recursive-fs');
const basePathConverter = require('base-path-converter');

export const pinDirectoryToIPFS = (directory:string, pinataApiKey:string, pinataSecretApiKey:string) => {
    const url:string = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const src:string = directory;
    
    //we gather the files from a local directory in this example, but a valid readStream is all that's needed for each file in the directory.
    recursive.readdirr(src, function (err:any, dirs:any, files:any) {
        let data = new FormData();
        files.forEach((file: Blob) => {
            //for each file stream, we need to include the correct relative file path
            data.append(`file`, fs.createReadStream(file), {
                filepath: basePathConverter(src, file)
            })
        });
    
        const metadata = JSON.stringify({
            name: 'testname',
            keyvalues: {
                exampleKey: 'exampleValue'
            }
        });
        data.append('pinataMetadata', metadata);
    
        return axios.post(url,
            data,
            {
                maxContentLength: 'Infinity', //this is needed to prevent axios from erroring out with large directories
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                    'pinata_api_key': pinataApiKey,
                    'pinata_secret_api_key': pinataSecretApiKey
                }
            }
        ).then(function (response:any) {
            console.log("Upload complete");
            //handle response here
        }).catch(function (error:any) {
            //handle error here
        });
    });
};