const express = require('express');
const app = express();
const port = 8990;
const cors = require('cors');

const connection = require('./db'); //connectToDB ... function
connection();
let userRouter = require('./routes/userRoutes');
let postRouter = require('./routes/postRoutes');
let messageRouter = require('./routes/messageRoutes');

app.use(cors());
app.use(express.json({limit: '100mb'}));

app.set('view engine', 'ejs');
app.get('/',(req,res)=>{
  res.send('Har Har Mahadev!')
});

app.use('/api/users',userRouter);
app.use('/api/posts', postRouter);
app.use('/api/message', messageRouter);


// app.post("/create",(req,res)=>{
//   const {name,email,password} = req.body;

// })


app.listen(port, ()=>{
  console.log(`Server is running on port:${port}`);
})