const express = require('express')

const app = express();

const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')

const tasks = require('./routes/task');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middlewares/notFound')


app.use(rateLimit({
   windowMs: 15 * 60 * 1000, // 15 minutes
   max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}))


app.use(express.static('./public'))

app.use(helmet())
app.use(cors())
app.use(xss())


app.use(express.json());


// app.get('/', (req,res)=>{
//    res.send('hello bibin, hello travelOn')
// })
app.use('/api/v1/tasks', tasks);

app.use(notFound)

const port = process.env.PORT || 3000;

const start = async () => {
   try {
      await connectDB(process.env.MONGO_URI);
      app.listen(port, console.log(`server is listening port ${port}`));
   } catch (error) {
      console.log(error);
   }
};

start();
