const express = require("express")

const router = express.Router()

const projectController = require("../controllers/projectController")

router.post("/", projectController.create)
router.get("/", projectController.getProjects)
router.get("/:projectId", projectController.getProject)
router.patch("/:projectId", projectController.updateProject)
router.delete("/:projectId", projectController.deleteProject)

module.exports = router



