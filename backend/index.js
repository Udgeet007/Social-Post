const express = require('express');
const app = express();
const port = 8990;
const cors = require('cors');

const connection = require('./db'); //connectToDB ... function
connection();
const userRouter = require('./routes/userRoutes');
app.use(cors());
app.use(express.json());

app.set('view engine', 'ejs');
app.get('/',(req,res)=>{
  res.send('Har Har Mahadev!')
});

app.use('/api/users',userRouter);

// app.post("/create",(req,res)=>{
//   const {name,email,password} = req.body;

// })


app.listen(port, ()=>{
  console.log(`Server is running on port:${port}`);
})