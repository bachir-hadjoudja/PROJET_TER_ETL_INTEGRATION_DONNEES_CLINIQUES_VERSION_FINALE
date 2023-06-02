require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const fileRoutes = require("./routes/files");
const userRoutes = require("./routes/user");

const multer  = require('multer')

const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "pdf") {
    cb(null, true);
  } else {
    cb(new Error("Not a PDF File!!"), false);
  }
};
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "/home/bachir/Bureau/S8/HAI823I TER/scripts/input");
      cb(null, "/home/bachir/Bureau/S8/HAI823I TER/scripts");
  },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      console.log(24,file);

      cb(null, 'CIUSS_TKFH_2019.xlsx');
  },
});

const upload = multer({
  storage: multerStorage
});
// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
// app.use('/api/workouts', workoutRoutes)
app.use("/api/user", userRoutes);
app.use("/api/files", fileRoutes);
app.use("/", upload.single('file'), (request, response) => {
  console.log("request.file", request.file)
  response.json({message: request.file})
  
});
// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });