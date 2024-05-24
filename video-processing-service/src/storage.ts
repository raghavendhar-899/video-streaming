import { Storage } from "@google-cloud/storage";
import fs from "fs";
import Ffmpeg from "fluent-ffmpeg";


const storage = new Storage();

const rawVideoBucketName = "raw-videos-899";
const processedVideoBucketName = "processed-videos-899";

const localRawVideoPath = "./raw-videos";
const localProcessedVideoPath = "./processed-videos";

// create local directories to save raw and processed video
export function setupDirectories() {
    ensureDirectoryExists(localRawVideoPath);
    ensureDirectoryExists(localProcessedVideoPath);
}

export async function downloadVideo (rawVideoName: string) {
    await storage.bucket(rawVideoBucketName).file(rawVideoName).download({
        destination: `${localRawVideoPath}/${rawVideoName}`
    })

    console.log(
        `Video ${rawVideoName} downloaded successfully from bucket ${rawVideoBucketName}`
    );
}

export function processVideo (rawVideoName: string, processedVideoName: string) {
    return new Promise<void>((resolve, reject) => {
    //Use Ffmpeg to process the video
  Ffmpeg(`${localRawVideoPath}/${rawVideoName}`)
  .outputOption("-vf", "scale=-1:360") // Converting to 360p
  .on("end", () => {
    console.log("Video processed successfully");
    resolve();
  })
  .on("error", (err) => {
    console.log(err.message);
    reject(err);
  })
  .save(`${localProcessedVideoPath}/${processedVideoName}`);
    });
}

export async function uploadVideo (processedVideoName: string) {
    const bucket = storage.bucket(processedVideoBucketName);
    await bucket.upload(`${localProcessedVideoPath}/${processedVideoName}`, {
        destination: processedVideoName
    })

    await bucket.file(processedVideoName).makePublic();

    console.log(
        `Video ${processedVideoName} uploaded successfully to bucket ${processedVideoBucketName}`
    );
}

export async function deleteRawVideo (rawVideoName: string) {
    deleteVideo(`${localRawVideoPath}/${rawVideoName}`);
}

export async function deleteProcessedVideo (processedVideoName: string) {
    deleteVideo(`${localProcessedVideoPath}/${processedVideoName}`);
}

function deleteVideo (filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(filePath)) {
            console.log(`File ${filePath} does not exist`);
            resolve();
            return;
        }
        else {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(`Error deleting file ${filePath}: ${err.message}`);
                    reject(err);
                }
                else {
                    console.log(`File ${filePath} deleted successfully`);
                    resolve();
                }
            });
        }
    })
}

function ensureDirectoryExists (directoryPath: string) {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
        console.log(`Directory ${directoryPath} created successfully`);
    }
}

