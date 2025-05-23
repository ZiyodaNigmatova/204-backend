const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
const { users } = require('../config/database');

exports.register = (username, email, password) => {
    const userName = users.find(user => user.username === username)
    if (userName == "undefined") {
        throw new Error("Usernmae already taken!")
    }
    const userEmail = users.find(user => user.email === email)
    if (userEmail == "undefined") {
        throw new Error("Email already registered, Please login!")
    }

    const user = {
        id: uuidv4(),
        username,
        email,
        password,
        ownedProjects: [],
        participatedProjects: [],
        created_at: Date(),
        updated_at: Date()
    }
    users.push(user)
    return { ...user }
}

const secret_key = "bubiznibirinchimartaishlatyapkanjwttoken"
exports.login = (email, password) => {
    try {
        const foundUser = users.find(user => user.email === email && user.password == password)

        const token = jwt.sign({ email: foundUser.email, username: foundUser.username }, secret_key, { expiresIn: "1h" })
        if (!token) throw new Error("Error in generating token")
        return { token, foundUser }
    } catch (err) {
        throw new Error("Email or Password incorrect")
    }
}

exports.getUserById = (id) => {
    try {
        const user = users.find(user => user.id === id)
        return user
    } catch (err) {
        throw new Error("User not found")
    }
}

exports.getAllUsers = () => {
    return users
}

exports.updateUserById = (id, username, email, password) => {
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) {
        throw new Error("User not found")
    }

    const updatedUser = {
        ...users[userIndex],
        username: username || users[userIndex].username,
        email: email || users[userIndex].email,
        password: password || users[userIndex].password,
        update_at: Date()
    }

    users[userIndex] = updatedUser
    return { ...users[userIndex] }
}

exports.deleteUserById = (id) => {
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) {
        throw new Error("User not found!")
    }
    users.splice(userIndex, 1)
    return true
}

exports.addMemberToProject = (projectId, memberId, ownerId) => {
    const user = users.find(user => user.id === ownerId)
    if(!user){
        throw new Error("Project owner not found!")
    }
    const member = users.find(user => user.id === memberId)
    if(!member){
        throw new Error("Member not found!")
    }
    const project = user.ownedProjects.find(project => project.id === projectId)
    if(!project){
        throw new Error("Project not found!")
    }
    try{
        project.members.push({id : memberId})
        member.participatedProjects.push({project})
        return true
    }catch(error){
        throw new Error("Failed to add member to project")
    }
    
}