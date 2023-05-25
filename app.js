const express = require('express')

const app = express();
const tasks = require('./routes/task');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middlewares/notFound')

app.use(express.static('./public'))
app.use(express.json());


// app.get('/', (req,res)=>{
//    res.send('hello bibin, hello travelOn')
// })
app.use('/api/v1/tasks', tasks);

app.use(notFound)

const port = process.env.PORT || 3000 ;

const start = async () => {
   try {
      await connectDB(process.env.MONGO_URI);
      app.listen(port, console.log(`server is listening port ${port}`));
   } catch (error) {
      console.log(error);
   }
};

start();
