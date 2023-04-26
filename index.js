const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const auth = require('./routes/auth')
const dotenv = require('dotenv')
dotenv.config()



// middleware
app.use(express.json())

//routes
app.use('/api/v1',auth)





const port = 3001

const start = async ()=>{
  try{
    await connectDB(process.env.MONGO_URI)
    app.listen(port,()=>{
        console.log(`Listen at http://localhost:${port}`)
    })
    
  }catch(err){
      console.log(err)
  }
}

start()

