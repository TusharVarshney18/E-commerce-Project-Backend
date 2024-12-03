import { v2 as cloudinary } from 'cloudinary';

// Automatically uses CLOUDINARY_URL from the environment
cloudinary.config();

export default cloudinary;