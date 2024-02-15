import { writable, type Writable } from 'svelte/store';
import { type ImageExtension } from './imageTypes';

export type UploadedFile = {
  file: File;
  output: ImageExtension;
  resolutionMultiplier: {
    width: number;
    height: number;
  };
};

export const uploadedFiles: Writable<UploadedFile[]> = writable([]);
