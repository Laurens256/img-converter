export const downloadFile = (data: Blob | string, filename: string) => {
  const href = data instanceof Blob ? URL.createObjectURL(data) : data;
  Object.assign(document.createElement('a'), {
    href,
    download: filename
  }).click();
  URL.revokeObjectURL(href);
};
