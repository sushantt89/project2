// Importing necessary modules from 'multer' and 'path' packages.
import multer, { StorageEngine } from 'multer';
import path from 'path';

// Setting up the storage configuration for Multer using diskStorage.
const storage: StorageEngine = multer.diskStorage({
  // Setting the destination where uploaded files will be stored.
  destination: (req, file, cb) => {
    // The 'cb' is a callback function. Here we define the path to the 'uploads' directory.
    // We use 'path.join' to ensure the path is correctly formed for the current operating system.
    cb(null, path.join(__dirname, '../uploads/')); // Adjust path to the `uploads` directory inside `src`
  },
  // Setting the filename for the uploaded file.
  filename: (req, file, cb) => {
    // Generating a unique suffix using the current timestamp and a random number.
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // Constructing the filename by combining the field name, the unique suffix, and the original file extension.
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Creating an upload middleware using the storage configuration defined above.
const upload = multer({ storage: storage });

// Exporting the upload middleware to be used in other parts of the application.
export default upload;
