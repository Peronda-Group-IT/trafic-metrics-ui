import { S3Client } from "@aws-sdk/client-s3";

const MINIO_USERNAME = process.env.MINIO_ROOT_USER;
const MINIO_PASSWORD = process.env.MINIO_ROOT_PASSWORD;
const MINIO_URL = process.env.MINIO_CLIENT_URL;

class MinIOClient {
  static instance;

  static getInstance() {
    if (!MinIOClient.instance) {
      MinIOClient.instance = new S3Client({
        endpoint: MINIO_URL,
        region: "us-east-1",
        credentials: {
          accessKeyId: MINIO_USERNAME,       // Change to your MinIO user
          secretAccessKey: MINIO_PASSWORD, // Change to your MinIO password
        },
        forcePathStyle: true, // Required for MinIO
      });
    }

    return MinIOClient.instance;
  }
}

export const minioClient = MinIOClient.getInstance();