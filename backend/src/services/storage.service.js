const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMGKIT_PUBLIC_KEY,
  privateKey: process.env.IMGKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMGKIT_URL_ENDPOINT,
});

async function uploadFiles(file,fileName){
    const result= await imagekit.upload({
        file:file,
        fileName:fileName
    })

    return result;
}
module.exports={
    uploadFiles
}