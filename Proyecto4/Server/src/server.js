import express from 'express'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5005

// Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url)
// Get the directory name from the file path
const __dirname = dirname(__filename)

//Middleware y habilitando cors
app.use(cors({
  origin: 'http://localhost:5173', // frontend Vite
  credentials: true
}))


app.use(express.json())

// Serves the HTML file from the /public directory
app.use(express.static(path.join(__dirname, '../public')))


// Serving up the HTML file from the /public directory
// Regresando el html a http://localhost:5003/
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Routes
app.use('/auth', authRoutes)
app.use('/todos',authMiddleware ,todoRoutes)

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`)
})