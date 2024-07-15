export const getPublicId = (url: string): string => {
  console.log("index", url);

  if (url) {
    const lastSlashIndex: number = url.lastIndexOf("/");

    const lastDotIndex: number = url.lastIndexOf(".");

    const imageId: string = url.substring(lastSlashIndex + 1, lastDotIndex);

    return imageId;
  } else {
    return "false";
  }
};
