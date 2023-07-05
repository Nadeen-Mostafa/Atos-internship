const express =require("express");
const examRouter=require("./Routes/exam_routes");
const app=express();

app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });
;app.use("/api/exams",examRouter)

app.listen(3000,()=> console.log("hello world app is runinng"));