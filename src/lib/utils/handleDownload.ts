import { type UploadedFile } from '$lib/types';
import { downloadFile, convertImages } from '$lib/utils';
import { Zip, ZipPassThrough } from 'fflate';
import { polyfillWritableStream } from '$lib/polyfills';

export const handleDownload = async (
  files: UploadedFile[],
  counterCallback?: (count: number | null) => void
) => {
  const imageGenerator = convertImages(files);

  const writableStream = await polyfillWritableStream({
    startIn: 'downloads',
    suggestedName: 'images.zip'
  });

  if (files.length > 1) {
    try {
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
          };
        }
      });

      rs.pipeTo(writableStream);

      let index = 0;
      for await (const convertedImage of imageGenerator) {
        const file = new ZipPassThrough(convertedImage.filename);
        zip.add(file);

        const reader = convertedImage.blob.stream().getReader();
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            file.push(new Uint8Array(0), true);
            break;
          }
          file.push(value);
        }
        reader.cancel();
        index++;
        counterCallback && counterCallback(index);
      }
      zip.end();
    } catch (e) {
      throw e;
    }
  } else {
    for await (const convertedImage of imageGenerator) {
      const filename =
        convertedImage.filename.split('/').pop() || convertedImage.filename;
      downloadFile(convertedImage.blob, filename);
    }
  }
};
