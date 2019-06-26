const express = require ('express')
const server = express()

server.use(express.json())

//  start count the requests
let requests = 0

// constant to store projects
const projects = []

// middleware to check project exists
function checkProjectExists(req, res, next) {
    const { id } = req.params
    const project = projects.find( project => project.id == id)

    if (!project) {
        return res.status(400).json( {
            error: "Project not foud"
        })
    }

    return next()
}

// middleware to log the number of request
function logRequest(req, res, next) {
    requests++

    console.log(`Number of requests: ${ requests }`)

    return next()
}

// making logRequest a global middleware
server.use(logRequest)

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
server.put('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params
    const { title} = req.body

    const project = projects.find( project => project.id == id)
    project.title = title

    return res.json(project)
})

// route to delete a project
server.delete('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params

    const index = projects.findIndex( project => project.id == id)
    projects.splice(index, 1)

    return res.send()
})

// route to store a new task in a project
server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
    const { id } = req.params
    const { title } = req.body

    const project = projects.find(project => project.id == id)
    project.tasks.push(title)

    return res.json(project)
})


server.listen(3000)