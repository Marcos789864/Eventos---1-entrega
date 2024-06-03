import express from"express"; 
import cors from"cors";
import ProvinceRouter from"./src/controllers/province-controller.js"
import eventsRouter from "./src/controllers/events-controller.js"
import userRouter from "./src/controllers/user_controller.js"

const app =express(); 
const port=3000; 
app.use(cors()); 
app.use(express.json());

app.use("/api/province",ProvinceRouter); 
app.use("/api/events",eventsRouter);
app.use("/api/login",userRouter);

app.listen(port,()=>{ console.log(`Exampleapplisteningonport${port}`)})