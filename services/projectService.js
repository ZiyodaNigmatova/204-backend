const { v4: uuidv4 } = require('uuid');
const { users } = require('../config/database');

exports.createProject = (title, description, status, deadline, ownerId) => {
    const user = users.find(user => user.id === ownerId)
    if (!user) {
        throw new Error("User not found!")
    }
    try {
        const project = {
            id: uuidv4(),
            title,
            description,
            status,
            deadline,
            members: [],
            ownerId,
            created_at: Date(),
            updated_at: Date()
        }
        user.ownedProjects.push(project)
        return { ...project }
    } catch (err) {
        throw new Error("Failed to create a project", err.message)
    }
}

exports.getAllProjects = (ownerId) => {
    const user = users.find(user => user.id === ownerId)
    if (!user) {
        throw new Error("User not found!")
    }
    return user.ownedProjects
}

exports.getProject = (ownerId, projectId) => {
    const user = users.find(user => user.id === ownerId)
    if (!user) {
        throw new Error("User not found!")
    }
    const project = user.ownedProjects.find(project => project.id === projectId)
    if (!project) {
        throw new Error("Project not found!")
    }
    return project
}

exports.deleteProject = (ownerId, projectId) => {
    const user = users.find(user => user.id === ownerId)
    if (!user) {
        throw new Error("User not found!")
    }
    const projectIndex = user.ownedProjects.findIndex(project => project.id === projectId)
    if (projectIndex === -1) {
        throw new Error("project not found!")
    }
    user.ownedProjects.splice(projectIndex, 1)
    return true
}


exports.updateProjectById = (title, description, status, deadline, ownerId, projectId) => {
    const userIndex = users.findIndex(user => user.id === ownerId)
    if (userIndex === -1) {
        throw new Error("User not found")
    }

    const projectIndex = users[userIndex].ownedProjects.findIndex(project => project.id === projectId)
    if (projectIndex === -1) {
        throw new Error("Project not found")
    }

    const updateProject = {
        ...users[userIndex].ownedProjects[projectIndex],
        title: title || users[userIndex].ownedProjects[projectIndex].title,
        description: description || users[userIndex].ownedProjects[projectIndex].description,
        status: status || users[userIndex].ownedProjects[projectIndex].status,
        deadline: deadline || users[userIndex].ownedProjects[projectIndex].deadline,
        updated_at: Date()
    }

    users[userIndex].ownedProjects[projectIndex] = updateProject
    return { ...users[userIndex].ownedProjects[projectIndex] }
}