import { createWriteStream } from 'streamsaver';

const polyfillWritableStream = async (options?: SaveFilePickerOptions) => {
  if (window.showSaveFilePicker) {
    const newHandle = await window.showSaveFilePicker(options);
    const writableStream = await newHandle.createWritable();

    return writableStream;
  }

  const writableStream = createWriteStream(options?.suggestedName || 'images.zip');
  return writableStream;
}

export default polyfillWritableStream;
