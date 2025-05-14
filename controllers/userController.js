
const userService = require("../services/userService")

exports.register = (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fileds are required!" })
    }
    try {
        const user = userService.register(username, email, password)
        return res.status(201).json({ user, message: "Registered successfully!" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

exports.login = (req, res) => {
    const { email, password } = req.body
    if (!email && !password) {
        return res.status(400).json({ message: "All fields are required" })
    }
    try {
        const { token, foundUser } = userService.login(email, password)
        
        return res.status(200).json({ token, message: "Successfully logged in" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

exports.getUser = (req, res) => {
    const { id } = req.params
    try {
        const user = userService.getUserById(id)
        return res.status(200).json(user)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

exports.getUsers = (req, res) => {
    try {
        const users = userService.getAllUsers()
        return res.status(200).json(users)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

exports.updateUser = (req, res) => {
    const { id } = req.params // URL'dan id ni olish
    const { username, email, password } = req.body // body'dan malumotlarni olish
    try {
        const updatedUser = userService.updateUserById(id, username, email, password)
        return res.status(200).json({ user: updatedUser, message: "User updated" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

exports.deleteUser = (req, res) => {
    const { id } = req.params
    try {
        const isDeleted = userService.deleteUserById(id)
        return res.status(200).json({ message: "Deleted successfully" }) // muvaffaqiyatli o‘chirildi
    } catch (err) {
        return res.status(500).json({ message: err.message }) // xato bo‘lsa 500
    }
}