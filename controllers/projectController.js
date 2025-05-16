const projectService = require("../services/projectService")

exports.create = (req, res) => {
    const { title, description, status, deadline, ownerId } = req.body
    if (!title || !description || !status || !deadline) {
        return res.status(400).json({ message: "All fields are required!" })
    }
    try {
        const project = projectService.createProject(title, description, status, deadline, ownerId)
        return res.status(201).json({ message: "Project created!", project })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

exports.getProjects = (req, res) => {
    const { ownerId } = req.body
    try {
        const projects = projectService.getAllProjects(ownerId)
        return res.status(200).json(projects)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

exports.getProject = (req, res) => {
    const { ownerId } = req.body
    const { projectId } = req.params
    try {
        const project = projectService.getProject(ownerId, projectId)
        return res.status(200).json(project)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

exports.deleteProject = (req, res) => {
    const { ownerId } = req.body
    const { projectId } = req.params
    try {
        const project = projectService.deleteProject(ownerId, projectId)
        return res.status(200).json(project)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

exports.updateProject = (req, res) => {
    const { projectId } = req.params
    const { title, description, status, deadline, ownerId } = req.body 
    try {
        const updateProject = projectService.updateProjectById( title, description, status, deadline, ownerId, projectId)
        return res.status(200).json({ project: updateProject, message: "Project updated" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}