import express from"express"; 
import cors from"cors";
import ProvinceRouter from"./src/controllers/province-controller.js"

constapp =express(); constport=3000; 
app.use(cors()); 
MiddlewaredeCORS. app.use(express.json());

app.use("/api/province",ProvinceRouter); 
 app.listen(port,()=>{ console.log(`Exampleapplisteningonport${port}`) 
})