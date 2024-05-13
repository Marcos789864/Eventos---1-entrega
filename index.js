import express from"express"; 
import cors from"cors";
import ProvinceRouter from"./src/controllers/province-controller.js"

const app =express(); 
const port=3000; 
app.use(cors()); 
app.use(express.json());


app.use("/api/province",ProvinceRouter); 
 app.listen(port,()=>{ console.log(`Exampleapplisteningonport${port}`) 
})


app.get('/api/province', (req,res) => {

    

})

app.get('/api/province/{id}', (req,res) => {


    
})

app.post('/api/province', (req,res) => {


})

app.put('/api/province', function (req,res) 
{


})

app.delete('/api/province/{id}', (req,res) => {


})

