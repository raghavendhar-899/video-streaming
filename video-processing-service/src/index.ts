import express from "express";
// import Ffmpeg from "fluent-ffmpeg";
import { deleteProcessedVideo, deleteRawVideo, downloadVideo, processVideo, setupDirectories, uploadVideo } from "./storage";

setupDirectories();

const app = express();
app.use(express.json());


app.post("/process-video", async (req, res) => {
    // Get the bucket and filename from the Cloud Pub/Sub message
  let data;
  try {
    const message = Buffer.from(req.body.message.data, 'base64').toString('utf8');
    data = JSON.parse(message);
    if (!data.name) {
      throw new Error('Invalid message payload received.');
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send('Bad Request: missing filename.');
  }
  const inputFileName = data.name;
  const outputFileName = `processed-${inputFileName}`;

//   Download the raw video from Cloud storage
  await downloadVideo(inputFileName);

// Convert video to 360p
try {
    await processVideo(inputFileName, outputFileName);
} catch (error) {
    // Delete video if process failed
    await Promise.all([ // awaits in parallel
      deleteRawVideo(inputFileName),
      deleteProcessedVideo(outputFileName),
    ]);
  console.error(error);
  return res.status(500).send('Internal Server Error: failed to process video.');
}

// upload processed video to google cloud
await uploadVideo(outputFileName);

await Promise.all([ // awaits in parallel
      deleteRawVideo(inputFileName),
      deleteProcessedVideo(outputFileName),
    ]);

  // Return a success response
  res.status(200).send('Video uploaded successfully.');

});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});