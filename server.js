const express = require("express")
const path = require("path")
const {open} = require("sqlite")
const sqlite3 = require("sqlite3")

const dbPath = path.join(__dirname, "doctors.db")
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())

let db

const initializeDbAndServer = async (request, response) => {
    try{
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        })

        app.listen(4000, () => {
            console.log("DB connected server is running at post 4000 successfully!")
        })
    }
    catch(error){
        console.log("Error: ", error)
        process.exit(1)
    }
}

initializeDbAndServer()


// API-1

app.get("/doctors", async (request, response) => {
    const getAllDoctorsQuery = `
        SELECT
            *
        FROM doctors 
    `
    const doctors = await db.all(getAllDoctorsQuery)
    response.send(doctors)
})