import express from "express";
// import Ffmpeg from "fluent-ffmpeg";
import { setupDirectories } from "./storage";

setupDirectories();

const app = express();
app.use(express.json());


app.post("/process-video", (req, res) => {
  //Get path of the input video file from the request body
  const inputVideoPath = req.body.inputFilePath;
  const outputVideoPath = req.body.outputFilePath;

  if (!inputVideoPath || !outputVideoPath) {
    return res.status(400).send("Invalid input");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});