import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploaderService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  public async uploadImage(image: string): Promise<string> {
    const base64 = image.replace(/^data:image\/\w+;base64,/, '');
    const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64}`);
    return result.secure_url;
  }
}
