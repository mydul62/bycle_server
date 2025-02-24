import express from 'express';
import cors from 'cors'
import router from './app/routes';
import { errorHandler } from './app/middlewares/globalerrorhandler';
import { notFoundError } from './app/middlewares/notFound';
const app = express()
app.use(express.json());
app.use(cors({    origin: ["http://localhost:5173","https://bycle-zone.vercel.app"],
  credentials: true }));
  
  
// app.use(cors({    origin: ["http://localhost:5173"],
//   credentials: true }));

app.use('/api', router);
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(errorHandler);

app.use(notFoundError);
export default app;

