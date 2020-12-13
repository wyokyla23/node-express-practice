// @ts-ignore
require('dotenv').config();
import Express from 'express'
import cors from 'cors'
import todosRoutes from './routes/todos'

const app = Express();
export const port = 4000;

app.use(Express.json()); // Used to parse json bodies
app.use(Express.urlencoded({ extended: true }));
app.use(cors() as any)
app.use('/todos', todosRoutes);

app.listen(port, () => console.log(`listening on port ${port}`));
