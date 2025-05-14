const express = require("express")

const router = express.Router()

const userController = require("../controllers/userController")

router.post("/register", userController.register)
router.post("/login", userController.login)
router.get("/:id", userController.getUser)
router.get("/", userController.getUsers)
router.patch("/:id", userController.updateUser)
router.delete("/:id", userController.deleteUser)
// router.post("/:projectId/:memberId", userController.addMemberToProject)

module.exports = router