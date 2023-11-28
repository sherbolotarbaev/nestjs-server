import {
  Injectable,
  BadRequestException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.initSupabaseClient();
  }

  private initSupabaseClient() {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

    if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
      throw new Error('Supabase URL and Secret Key are required');
    }

    this.supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  private generateUniqueFileName(
    userId: number,
    originalFileName: string,
  ): string {
    const timestamp = Date.now();
    const fileExtension = originalFileName.split('.').pop();
    return `user-${userId}-photo-${timestamp}.${fileExtension}`;
  }

  private async uploadFile(
    bucket: string,
    filename: string,
    buffer: Buffer,
  ): Promise<string> {
    try {
      const { data } = await this.supabase.storage
        .from(bucket)
        .upload(filename, buffer, { upsert: true });

      return data.path;
    } catch (e) {
      console.error('Error uploading file to Supabase:', e.message);
      throw new ServiceUnavailableException('Failed to upload file');
    }
  }

  async uploadPhoto(
    userId: number,
    file: Express.Multer.File,
  ): Promise<string> {
    const maxSize = 15 * 1024 * 1024; // 15 MB

    if (file.size > maxSize) {
      throw new BadRequestException('File size exceeds the 15 MB limit');
    }

    const filename = this.generateUniqueFileName(userId, file.originalname);
    return this.uploadFile('/photos', filename, file.buffer);
  }

  async getUrl(bucket: string, filename: string) {
    if (!filename) return '';
    return `${process.env.SUPABASE_URL}/storage/v1/object/public${bucket}/${filename}`;
  }
}
