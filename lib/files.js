'use server';

import {
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { minioClient } from "@/lib/minio-client";
import { revalidatePath } from "next/cache";

export async function uploadFile(formData) {
  const files = formData.getAll("file");
  const resourceType = formData.get("resourceType");
  const resourceCode = formData.get("resourceCode");
  const BUCKET = ""; // Set Up your bucket name here

  if (!files || files.length === 0) {
    throw new Error("No files uploaded.");
  }

  for (const file of files) {
    if (typeof file === "string") {
      console.error("Skipping invalid file entry.");
      continue;
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const key = `${resourceType}/${resourceCode}/${file.name}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    });

    try {
      await minioClient.send(command);
    } catch (error) {
      console.error(`Upload failed for ${file.name}:`, error);
      // Continue to next file, or return an error for the whole batch
      return { error: `Upload failed for ${file.name}` };
    }
  }

  return { success: true };
}

/**
 * Lists files in MinIO under the path: <resource>/<username>/<code>/
 * @param {string} bucket
 * @param {string} resourceType
 * @param {string} resourceCode
 * @returns {Promise<Array<{ key: string, url: string }>>}
 */
export async function listFilesFromMinIO(bucket = BUCKET, resourceType, resourceCode) {
  
    const MINIO_URL = process.env.MINIO_CLIENT_URL;
  
    const prefix = `${resourceType}/${resourceCode}/`;

  try {
    const command = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix,
    });

    const response = await minioClient.send(command);

    const files = (response.Contents || []).map(obj => ({
      key: obj.Key,
      url: `${MINIO_URL}/${bucket}/${obj.Key}`, 
    }));

    return files;
  } catch (err) {
    console.error("❌ Error listing files from MinIO:", err);
    return [];
  }
}

/**
 * Generates a temporary presigned download URL from MinIO
 * @param {string} bucket - Bucket name
 * @param {string} key - Full object key (e.g. actions/ADRIANLUQUE/1/file.txt)
 * @returns {Promise<string>} - Temporary presigned URL
 */
export async function generatePresignedUrl(bucket = BUCKET, key, download = false) {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
    ...(download && {
      ResponseContentDisposition: `attachment; filename="${key
        .split("/")
        .pop()}"`,
    }),
  });

  const signedUrl = await getSignedUrl(minioClient, command, {
    expiresIn: 60, // 60 seconds
  });

  return signedUrl;
}

export async function getFiles(resourceType, resourceCode) {
  return await listFilesFromMinIO(BUCKET, resourceType, resourceCode);
}

export async function getPresignedUrl(key, download = false) {
  try {
    const url = await generatePresignedUrl(BUCKET, key, download);
    return { url };
  } catch (err) {
    console.error("❌ Error generating presigned URL:", err);
    return { error: "Could not generate download link." };
  }
}

export async function deleteFile(key, pathToRevalidate) {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });

  try {
    await minioClient.send(command);
    revalidatePath(pathToRevalidate);
    return { success: true };
  } catch (error) {
    console.error("❌ Error deleting file from MinIO:", error);
    return { error: "Delete failed" };
  }
}
