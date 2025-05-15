const express = require("express")

const router = express.Router()

const projectController = require("../controllers/projectController")

router.post("/", projectController.create)
router.get("/", projectController.getProjects)
router.get("/:id", projectController.getProject)
// router.patch("/:id", projectController.updateProject)
// router.delete("/:id", projectController.deleteProject)

module.exports = router



