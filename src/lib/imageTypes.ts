export const imageTypes = {
  webp: {
    mimeType: 'image/webp',
    extension: 'webp'
  },
  jpg: {
    mimeType: 'image/jpeg',
    extension: 'jpg'
  },
  png: {
    mimeType: 'image/png',
    extension: 'png'
  },
  bmp: {
    mimeType: 'image/bmp',
    extension: 'bmp'
  },
} as const;

export type ImageMimeType = typeof imageTypes[keyof typeof imageTypes]['mimeType'];
export type ImageExtension = typeof imageTypes[keyof typeof imageTypes]['extension'];
