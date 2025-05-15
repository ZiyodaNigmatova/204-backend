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

exports.getProject = (ownerId, projectId) =>{
    const user = users.find(user => user.id === ownerId)
    
}