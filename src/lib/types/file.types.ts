const imageTypeTests = [
  { mimeType: 'image/webp', extension: 'webp', base64: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA' },
  { mimeType: 'image/jpeg', extension: 'jpg', base64: '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA='},
  { mimeType: 'image/png', extension: 'png', base64: 'R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs'},
  { mimeType: 'image/apng', extension: 'apng', base64: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAFoEvQfAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAACGFjVEwAAAABAAAAALQt6aAAAAAaZmNUTAAAAAAAAAABAAAAAQAAAAAAAAAAAAEAZAEAAS3nuwAAAAxJREFUeJxiYIAAAAAAAP//35uwWgAAAAZJREFUAwAACAABz3YKQAAAAABJRU5ErkJggg==' },
  { mimeType: 'image/bmp', extension: 'bmp', base64: 'Qk06AAAAAAAAADYAAAAoAAAAAQAAAAEAAAABABgAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==' },
  { mimeType: 'image/avif', extension: 'avif', base64: "AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A"},
  { mimeType: 'image/gif', extension: 'gif', base64: 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' },
  { mimeType: 'image/tiff', extension: 'tiff', base64: 'SUkqAA4AAACAAAAQEAARAAABAwABAAAAAQAAAAEBAwABAAAAAQAAAAIBAwACAAAACAAIAAMBAwABAAAABQAAAAYBAwABAAAAAQAAAAoBAwABAAAAAQAAABEBBAABAAAACAAAABIBAwABAAAAAQAAABUBAwABAAAAAgAAABYBAwABAAAAAQAAABcBBAABAAAABQAAABwBAwABAAAAAQAAACkBAwACAAAAAAABAD0BAwABAAAAAgAAAD4BBQACAAAAEAEAAD8BBQAGAAAA4AAAAFIBAwABAAAAAgAAAAAAAACF61EAAACAAMP1qAAAAAACzcxMAAAAAAHNzEwAAACAAM3MTAAAAAACj8L1AAAAABA3GqAAAAAAAiuHCgAAACAA' },
  { mimeType: 'image/x-icon', extension: 'ico', base64: 'AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABILAAASCwAAAAAAAAAAAABxbGj/cWxo/3FsaP9xbGj/cWxo/3FsaP9xbGj/cWxo/3FsaP9xbGj/cWxo/3FsaP9xbGj/cWxo/3FsaP9xbGj/ODIr/zgyK/84Miv/ODIr/zgyK/84Miv/ODIr/zgyLP84Miz/ODIr/zgyK/84Miv/ODIr/zgyK/84Miv/ODIr/0I8Nv9CPDb/Qjw2/0I8Nv9CPDb/QTs3/0E7OP9BOzf/QTs4/0E7Of9CPDb/Qjw2/0I8Nv9CPDb/Qjw2/0I8Nv9AOjT/QDo0/0A6NP9AOjT/QDo1/0I7L/9DPSr/Qjws/0M9Kv9FPib/QTsy/0A6Nf9AOjT/QDo0/0A6NP9AOjT/QDo0/0A6NP9AOjT/Pzk2/0I8Lv85M0v/Kyd1/xMRw/8SEMf/IyCP/z04PP9BOzL/QDo1/0A6NP9AOjT/QDo0/0A6NP9AOjT/QDo1/0I8L/88NkL/DgzT/xEPyv8AAP//AAD+/wIC+f8gHZj/Qjsv/0A6NP9AOjT/QDo0/0A6NP9AOjT/QDo0/0E6Mv8/OTj/Hxyd/xUTvf8IB+b/Cgne/xcVtf8VE73/BAPz/yIflP9EPib/Pzk3/0A6NP9AOjT/QDo0/0A6Nf9CPC3/NjFT/x0aov8cGqX/EhDG/xEPy/8CAfr/AAD+/wAA//8MC9n/QTsy/0A6NP9AOjT/QDo0/0A6NP8/OTb/Qz0q/zAsZv8YFbP/JCGM/woJ4f8EA/P/BQTx/wYG6/8JCOT/GBaz/z85Nv9AOjP/QDo0/0A6NP9AOjT/QDo1/0E7Mf88NkH/FBK//yQhi/8YFrL/EA7N/xMRwv8UEr//DQzV/xgWsv9CPCz/QDo2/0A6NP9AOjT/QDo0/0A6NP8/OTf/RD4m/x4bn/8RD8j/FhS5/wkI4v8AAP//AAD+/wAA//8tKXH/Qz0p/z85N/9AOjT/QDo0/0A6NP9AOjT/QDo0/0A6M/8/OTb/KSV7/wQD8/8ODdP/ExHE/xQSwP8qJnr/Qz0q/z85Nv9AOjT/QDo0/0A6NP9AOjT/QDo0/0A6NP9AOjX/QDoz/0M9Kv82MVT/JiKH/y0ocf9AOjT/RD4o/z85Nv9AOjT/QDo0/0A6NP9AOjT/QDo0/0A6NP9AOjT/QDo0/0A6Nf8/OTb/Qjwt/0U+JP9EPSj/QDo0/z85N/9AOjT/QDo0/0A6NP9AOjT/QDo0/0A6NP9AOjT/QDo0/0A6NP9AOjT/QDo0/0A6Nv8/OTf/Pzk3/0A6Nf9AOjT/QDo0/0A6NP9AOjT/QDo0/0A6NP9AOjT/QDo0/0A6NP9AOjT/QDo0/0A6NP9AOjT/QDo0/0A6NP9AOjT/QDo0/0A6NP9AOjT/QDo0/0A6NP9AOjT/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' },
  { mimeType: 'image/heif', extension: 'heic', base64: 'AAAAGGZ0eXBoZWljAAAAAG1pZjFoZWljAAAC/G1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAHBpY3QAAAAAAAAAAAAAAAAAAAAADnBpdG0AAAAAAAIAAAAYaWRhdAAAAAAAAQABAAAAAAABAAEAAABgaWxvYwEAAABEQAAEAAEAAAAAAAADHAABAAAAAAAAACIAAgABAAAAAAAAAAEAAAAAAAAACAADAAAAAAAAAz4AAQAAAAAAAAAgAAQAAQAAAAAAAAABAAAACAAAAAgAAABiaWluZgAAAAAABAAAABVpbmZlAgAAAQABAABodmMxAAAAABVpbmZlAgAAAAACAABncmlkAAAAABVpbmZlAgAAAQADAABodmMxAAAAABVpbmZlAgAAAAAEAABncmlkAAAAAbFpcHJwAAABhGlwY28AAAB2aHZjQwEDcAAAAAAAAAAAAB7wAPz9+PgAAA8DIAABABhAAQwB//8DcAAAAwCQAAADAAADAB66AkAhAAEAKkIBAQNwAAADAJAAAAMAAAMAHqAggQWW6q6a5uBAQMCAAAADAIAAAAMAhCIAAQAGRAHBc8GJAAAAFGlzcGUAAAAAAAAAQAAAAEAAAAAUaXNwZQAAAAAAAAABAAAAAQAAABBwaXhpAAAAAAMICAgAAABxaHZjQwEECAAAAAAAAAAAAB7wAPz8+PgAAA8DIAABABdAAQwB//8ECAAAAwCf+AAAAwAAHroCQCEAAQAmQgEBBAgAAAMAn/gAAAMAAB7AggQWW6q6a5sCAAADAAIAAAMAAhAiAAEABkQBwXPBiQAAABRpc3BlAAAAAAAAAEAAAABAAAAAFGlzcGUAAAAAAAAAAQAAAAEAAAAOcGl4aQAAAAABCAAAACdhdXhDAAAAAHVybjptcGVnOmhldmM6MjAxNTphdXhpZDoxAAAAACVpcG1hAAAAAAAAAAQAAQKBAgACAgOEAAMChQYABAMHiIkAAAA2aXJlZgAAAAAAAAAOZGltZwACAAEAAQAAAA5kaW1nAAQAAQADAAAADmF1eGwABAABAAIAAABKbWRhdAAAAB4oAa8FEhJM4PoDvef+6D6IWYCvu2VYo5lcYJNTt4AAAAAcKAGuCiQkGcDhnoA/9bdzylCzhNKQp7VBQJa1Aw==' },
] as const;

type ImageData = {
  mimeType: typeof imageTypeTests[number]['mimeType'];
  extension: typeof imageTypeTests[number]['extension'];
};

export const supportedImageOutputTypes = imageTypeTests.map(({ mimeType, extension }) => {
  const url = document.createElement('canvas').toDataURL(mimeType);
  if (url.startsWith(`data:${mimeType}`)) {
    return { mimeType, extension }
  }
}).filter(Boolean) as ImageData[];

export const supportedImageInputTypes = await (async () => {
  const inputTypes = await Promise.all(
    imageTypeTests.map(async ({ mimeType, extension, base64 }) => {
      const url = `data:${mimeType};base64,${base64}`;
      const image = new Image();
      image.src = url;
      const supported = await new Promise<boolean>((resolve) => {
        image.onload = () => resolve(true);
        image.onerror = () => resolve(false)
      });

      return supported ? { mimeType, extension } : null;
    })
  );
  return inputTypes.filter(Boolean) as ImageData[];
})();

export type SupportedImageOutputExtension = (typeof supportedImageOutputTypes)[number]['extension'];
export type SupportedImageInputExtension = (typeof supportedImageInputTypes)[number]['extension'];
export type SupportedImageOutputMimeType = (typeof supportedImageOutputTypes)[number]['mimeType'];
export type SupportedImageInputMimeType = (typeof supportedImageInputTypes)[number]['mimeType'];

export type UploadedFile = {
  file: File;
  output: SupportedImageOutputExtension;
  resolutionMultiplier: {
    width: number;
    height: number;
  };
};