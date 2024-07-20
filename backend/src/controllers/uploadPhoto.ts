// controllers/uploadController.ts

import { Request, Response } from 'express';



class uploadPhoto {
    public static uploadPhoto(req: Request, res: Response) {
        if (req.file) {
            console.log(req.file);
            res.send('File uploaded successfully.');
        } else {
            res.status(400).send('No file uploaded.');
        }
    }
}

export default uploadPhoto;


