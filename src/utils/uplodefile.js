import { config } from 'dotenv';
config();
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.YOUR_CLOUD_NAME,
  api_key: process.env.YOUR_API_KEY,
  api_secret: process.env.YOUR_API_SECRET,
});

/**
 * Uploads all files from a local folder to Cloudinary with folderName as prefix.
 * @param {string} folderPath - Local folder path.
 * @param {string} folderName - Cloudinary folder prefix.
 * @returns {Promise<Array>} - Array of upload results.
 */
export async function uploadFolderToCloudinary(folderPath, folderName) {
  const files = fs.readdirSync(folderPath);
  const uploadResults = [];
  for (const file of files) {
    const filePath = path.join(folderPath, file);
    if (!fs.lstatSync(filePath).isFile()) continue;
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: folderName,
        use_filename: true,
        unique_filename: false,
      });
      uploadResults.push(result);
    } catch (err) {
      let sizeInfo = '';
      try {
        const stats = fs.statSync(filePath);
        sizeInfo = `, size: ${stats.size} bytes`;
      } catch {}
      console.warn(
        `Skipped invalid file: ${file} in ${folderName}${sizeInfo} (${err.message})`
      );
    }
  }
  return uploadResults;
}

// Fix for ES module scope (__dirname not available)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.resolve(__dirname, '../../public');

Promise.all([
  uploadFolderToCloudinary(
    path.join(publicDir, 'generalPics'),
    'my_cloud_folder_generalPics'
  ),
  uploadFolderToCloudinary(
    path.join(publicDir, 'reelsFiles'),
    'my_cloud_folder_reelsFiles'
  ),
  uploadFolderToCloudinary(
    path.join(publicDir, 'videoFiles'),
    'my_cloud_folder_videoFiles'
  ),
])
  .then(results => {
    const [generalPics, reelsFiles, videoFiles] = results;

    // Optional: sanitize fields
    const sanitize = arr =>
      arr.map(item => ({
        public_id: item.public_id,
        secure_url: item.secure_url,
        resource_type: item.resource_type,
        format: item.format,
        width: item.width,
        height: item.height,
        created_at: item.created_at,
        original_filename: item.original_filename,
      }));

    const uploadResults = {
      generalPics: sanitize(generalPics),
      reelsFiles: sanitize(reelsFiles),
      videoFiles: sanitize(videoFiles),
    };

    console.log('Upload Results:', JSON.stringify(uploadResults, null, 2));

    fs.writeFileSync(
      path.join(publicDir, 'uploadResults.json'),
      JSON.stringify(uploadResults, null, 2)
    );

    process.exit(0);
  })
  .catch(err => {
    console.error('Error uploading files to Cloudinary:', err);
    process.exit(1);
  });
