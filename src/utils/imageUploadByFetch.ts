import { getPublicId } from "./getPublicId";

const uploadImage = async (file: File, thumbnail: string) => {
  try {
    let user_photo: string = thumbnail;
    const fileData = new FormData();
    fileData.append("file", file || thumbnail);

    const publicId = getPublicId(user_photo);
    

    if (publicId !== "false") {
      // distroy old file
      const des = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/file/replace/${publicId}`,
        {
          method: "POST",
          body: fileData,
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // }
        }
      );

      const resdes = await des.json();
      if (resdes?.url) {
        user_photo = resdes.url;
      }
    } else {
      console.log("file", fileData);
      
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/file/upload`,
        {
          method: "POST",
          body: fileData,
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // }
        }
      );
      const data = await res.json();

      user_photo = data.url;
    }
    return { url: user_photo };
  } catch (error) {
    console.log(error);
  }
};

export default uploadImage;
