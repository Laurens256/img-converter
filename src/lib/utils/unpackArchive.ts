import { unzip } from 'fflate';

// TODO: probably just use jsZip to get File instead of Uint8Array
const unpackArchive = async (zipFile: File) => {
  const zipBuffer = new Uint8Array(await zipFile.arrayBuffer());

  const files = await new Promise<File[]>(async (resolve, reject) => {
    unzip(zipBuffer, async (err, unzipped) => {
      if (err) {
        reject(err);
      }

      const filePromises = Object.entries(unzipped)
        .filter(([_, uint8Array]) => uint8Array.byteLength)
        .map(async ([filename, uint8Array]) => new File([uint8Array], filename));

      resolve(await Promise.all(filePromises));
    });
  });

  return files;
};

export default unpackArchive;
