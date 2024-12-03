import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config(); // Load .env file


// Automatically uses CLOUDINARY_URL from the environment
cloudinary.config();

export default cloudinary;