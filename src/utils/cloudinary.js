import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // 
    fs.unlinkSync(localFilePath)
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath)//removes locally saved temporary file is the upload task failed!   
    return null
  }
};
const deleteFromCloudinary = async (public_id) => {
  try {
    if (!public_id) return null;
    const result = await cloudinary.uploader.destroy(public_id);
    return result;
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    return null;
  }
};

export {uploadOnCloudinary,deleteFromCloudinary}
