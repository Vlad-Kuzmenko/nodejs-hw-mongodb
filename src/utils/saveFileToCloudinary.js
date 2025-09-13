import fs from "node:fs/promises";
import cloudinary from "./cloudinary.js";

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.uploader.upload(file.path, {
    folder: "Photos",
    use_filename: true,
  });
  await fs.unlink(file.path);
  return response.secure_url;
};
