const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')


const userRoutes = require("./routes/userRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/users", userRoutes)

const PORT = process.env.PORT || 3000;
const MONGOOSE_URL = "mongodb://hotel:hotel@ac-ft9kwfv-shard-00-00.qaaw7tk.mongodb.net:27017,ac-ft9kwfv-shard-00-01.qaaw7tk.mongodb.net:27017,ac-ft9kwfv-shard-00-02.qaaw7tk.mongodb.net:27017/?ssl=true&replicaSet=atlas-mduu9m-shard-0&authSource=admin&retryWrites=true&w=majority"

mongoose.connect(MONGOOSE_URL, {useNewUrlParser: true})
.then(()=> app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
}))
.catch(err=>{
    console.log(err)
})