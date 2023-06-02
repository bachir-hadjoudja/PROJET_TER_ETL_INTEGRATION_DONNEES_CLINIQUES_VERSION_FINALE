const File = require("../models/filesModal");
const mongoose = require("mongoose");

// get all workouts
const getFiles = async (req, res) => {
  const user_id = req.user._id;

  try {
    const files = await File.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve files" });
  }
};

const createFile = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Please provide a title" });
  }

  // if (emptyFields.length > 0) {
  //   return res
  //     .status(400)
  //     .json({ error: "Please fill in all the fields", emptyFields });
  // }

  // add doc to db
  try {
    const user_id = req.user._id;
    const newFile = await File.create({ title, user_id });
    res.status(200).json(newFile);
  } catch (error) {
    res.status(500).json({ error: "Failed to create file" });
  }
};

module.exports = {
  createFile,
  getFiles,
};
