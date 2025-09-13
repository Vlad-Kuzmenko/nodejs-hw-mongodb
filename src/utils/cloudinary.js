import { v2 as cloudinary } from "cloudinary";
import { getEnvVar } from "./getEnvVar.js";
import { CLOUDINARY } from "../constants/index.js";

cloudinary.config({
  secure: true,
  cloud_name: getEnvVar(CLOUDINARY.CLOUD_NAME),
  api_key: getEnvVar(CLOUDINARY.API_KEY),
  api_secret: getEnvVar(CLOUDINARY.API_SECRET),
});

export default cloudinary;
