import { imageTypes, type UploadedFile } from '$lib';

const convertImages = async function* (inputArr: UploadedFile[]) {
  for (const input of inputArr) {
    const filenameParts = input.file.name.split('.');
    const filename = filenameParts.slice(0, filenameParts.length - 1).join('.');
    const outputExt = input.output;

    const image = new Image();
    image.src = URL.createObjectURL(input.file);

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = (e) => {
        console.error(e);
        reject(e);
      };
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get 2d context');
    }

    const scaledWidth = Math.round(image.width * input.resolutionMultiplier.width);
    const scaledHeight = Math.round(image.height * input.resolutionMultiplier.height);

    canvas.width = scaledWidth;
    canvas.height = scaledHeight;
    ctx.drawImage(image, 0, 0, scaledWidth, scaledHeight);

    // TODO: quality here
    const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(blob => resolve(blob), imageTypes[outputExt].mimeType));
    URL.revokeObjectURL(image.src);

    if (!blob) {
      throw new Error('Could not create blob');
    }

    yield {
      filename: `${filename}.${outputExt}`,
      blob
    }
  }
};

export default convertImages;
