require('dotenv').config();
const express = require('express')
const cors = require('cors')
const server = express()

server.use(express.json()) // this allows us to show json elements in the browser

server.use(cors()) // This allows us to connect a front end to this server

let dogs = [
    {
        id: 1,
        breed: ' German Shepard',
        imageUrl: 'https://en.wikipedia.org/wiki/German_Shepherd#/media/File:German_Shepherd_-_DSC_0346_(10096362833).jpg'
    }
]

let dogId = 2

// Makes sure the server is up and running

server.get('/', (req, res) => {
    res.json({ message: 'Server is running'})
})


// Gets all Dogs saved to the server

server.get('/dogs', (req, res) => {
    try {
        res.status(200).json(dogs)
    }
    catch {
        res.status(500).json({ errorMessage: "Can not get Dogs"})
    }
})

server.get('/dogs/:id', (req, res) => {
    const { id } = req.params
    const findDogById = dog => {
        return dog.id == id
    }
    const foundDog = dogs.find(findDogById)
    if (!foundDog) {
        res.status(400).json({ errorMessage: "Can not find a Dog with that ID"})
    } else {
        res.json(foundDog)
    }
})

// Adds new dogs to the server

server.post('/dogs', (req, res) => {
    const newDog = req.body
    if(!(newDog.breed)) {
        res.status(400).json({ errorMessage: "Please provide a breed type "})
    } try {
        const notNew = dogs.find(dog => dog.breed === req.body.breed)
        if(!notNew) {
            newDog.id = dogId++
            dogs.push(newDog)
            res.status(201).json(newDog)
        } else {
            res.status(400).json({ errorMessage: "Dog is already in server"})
        }
    }
    catch {
        res.status(500).json({ errorMessage: "Dang, I can not seem to add that Dog to the server"})
    }
})

// Delete a dog :(

    server.delete('/dogs/:id', (req, res)=> {
        const { id } = req.params
        const findDogById = dog => {
            return dog.id == id
        }
        const foundDog = dogs.find(findDogById)
        if (!foundDog) {
    
            res.status(400).json({ errorMessage: 'Can not find a dog with that ID'})
        } else {
            dogs = dogs.filter((dog)=>{
                return dog.id != id
            })
            res.json({deleted: foundDog})
        }
    })


// const PORT = 5000

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server is on port: ${PORT}`)
})

