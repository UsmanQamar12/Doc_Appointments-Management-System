const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllUsersController,
  getAllDoctorController,
  changeAccountStatusController,
} = require("../controllers/adminCtrl");

const router = express.Router();

// GET METHOD || USERS
router.get("/getAllUsers", authMiddleware, getAllUsersController);

// GET METHOD || DOCTORS
router.get("/getAllDoctors", authMiddleware, getAllDoctorController);

// POST ACCOUNT STATUS
router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);

module.exports = router;
