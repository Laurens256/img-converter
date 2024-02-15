import { type UploadedFile } from '$lib';
import { downloadFile, convertImages } from '$lib/utils';
import streamSaver from 'streamsaver';
import { Zip, ZipPassThrough } from 'fflate';

type ConvertedImage = {
  filename: string;
  dataURL: string;
};

const setUniqueFilenames = (inputArr: ConvertedImage[]): ConvertedImage[] => {
  const seenNames: Record<string, number> = {};

  const filenames = inputArr.map((file) => file.filename);
  const uniqueFilenames = filenames.reduce((acc, filename) => {
    const ext = filename.split('.').pop();
    const base = filename.split('.').slice(0, -1).join('.');
    const count = seenNames[filename] || 0;
    seenNames[filename] = count + 1;
    const newFilename = count > 0 ? `${base} (${count}).${ext}` : filename;
    return [...acc, newFilename];
  }, [] as string[]);

  return inputArr.map((file, i) => {
    return {
      ...file,
      filename: uniqueFilenames[i]
    };
  });
};

export const handleDownload = async (input: UploadedFile[]) => {
  const imageGenerator = convertImages(input);

  if (input.length > 1) {
    const zip = new Zip();
    const rs = new ReadableStream({
      start(controller) {
        zip.ondata = (err, dat, final) => {
          if (err) {
            controller.error(err);
          } else {
            controller.enqueue(dat);
            if (final) controller.close();
          }
        }
      }
    });

    rs.pipeTo(streamSaver.createWriteStream('images.zip'));

    for await (const convertedImage of imageGenerator) {
      const file = new ZipPassThrough(convertedImage.filename);
      zip.add(file);

      const reader = convertedImage.blob.stream().getReader();
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          file.push(new Uint8Array(0), true);
          break;
        };
        file.push(value);
      }
    }
    zip.end();
  } else {
    for await (const convertedImage of imageGenerator) {
      downloadFile(convertedImage.blob, convertedImage.filename);
    }
  }
};
