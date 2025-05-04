const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const ObjectId=require("mongodb")

const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://vk:123@todo.eu6eao1.mongodb.net/todo").then(()=>console.log("db connected")).catch(()=>console.log("db failed"))

const Task=mongoose.model("Task",{task:String,color:String},"task")


app.get("/tasklist",(req,res)=>{
    Task.find().then((retData)=>res.send(retData)).catch(()=>console.log("Cannot get data"))
})

app.post("/addtask",(req,res)=>{
   var eTask=req.body.eTask
    console.log(eTask)
    const newTask= new Task(
        {
            task:eTask
        }
    )
    console.log(newTask)
    newTask.save().then(()=>res.send(newTask)).catch(()=>console.log("save err"))
})

app.post("/removetask",(req,res)=>{
    var task= req.body.task
    Task.deleteOne({task:task}).then((retData)=>console.log(`Deleted ${task}`))
    Task.find().then((retData)=>console.log(retData))
    
})



app.listen(5000,()=>{
    console.log("startedddd")
})