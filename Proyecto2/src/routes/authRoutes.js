import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js'

const router = express.Router()

// Register a new user endpoint /auth/register
router.post('/register', async (req, res) => {
    const { username, password } = req.body

    // encrypt the password
    const hashedPassword = bcrypt.hashSync(password, 8)

    // save the new user and hashed password to the db
    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        })

        // now that we have a user, I want to add their first todo for them
        const defaultTodo = `Hello :) Add your first todo!`
        await prisma.todo.create({
            data: {
                task: defaultTodo,
                userId: user.id
            }
        })

        //create a token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })
    } catch (err){
        console.log(err.message)
        res.sendStatus(503)
    }
    
})

router.post('/login', async (req, res) => {

    const {username, password} = req.body

    try {
        const user = await prisma.user.findUnique({
            where: {
                username : username
            }
        })

        // if we cannot find a user associated with that username, return out from the function
        if (!user){ return res.status(404).send({ message: "User not found" })} // caso en el que no se encuentra usuario con username
        
        
        const passwordIsValid = bcrypt.compareSync(password, user.password) // comparando el password con el encriptado guardado

        // if the password does nor match, return out of the function
        if (!passwordIsValid){ return res.status(401).send({ message: "Invalid password"}) }

        // then we have a succesful authentication
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })
    } catch (err){
        console.log(err.message)
        res.sendStatus(503)
    }

})

export default router