const express = require("express");
const { createFile, getFiles } = require("../controllers/filesController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all file routes
router.use(requireAuth);

// GET all files
router.get("/", getFiles);

// POST a new file
router.post("/", createFile);

module.exports = router;
