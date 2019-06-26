const express = require ('express')
const server = express()

server.use(express.json())

// constant to store projects
const projects = []

// route to store a project
server.post('/projects', (req, res) => {
    const { id, title } = req.body
    const project = {
        id,
        title,
        tasks: []
    }

    projects.push(project)

    return res.json(project)
})

// route to list all projects
server.get('/projects', (req, res) => {
    return res.json(projects)
})

// route to update a project
server.put('/projects/:id', (req, res) => {
    const { id } = req.params
    const { title} = req.body

    const project = projects.find( project => project.id == id)
    project.title = title

    return res.json(project)
})

// route to delete a project
server.delete('/projects/:id', (req, res) => {
    const { id } = req.params

    const index = projects.findIndex( project => project.id == id)
    projects.splice(index, 1)

    return res.send()
})

// route to store a new task in a project
server.post('/projects/:id/tasks', (req, res) => {
    const { id } = req.params
    const { title } = req.body

    const project = projects.find(project => project.id == id)
    project.tasks.push(title)

    return res.json(project)
})


server.listen(3000)