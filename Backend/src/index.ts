import express, { Application } from 'express'
const app:Application = express()


app.listen(5000,()=>{
console.log(`Server is listening on http://localhost:5000`);
})
