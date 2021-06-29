import express from 'express';
import cors from 'cors';
import Promise from 'bluebird';
import bodyParser from 'body-parser';
import { Logger } from './utils'
import routes from './routes';

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(routes.example);
app.use(routes.parser);

app.get('/', async (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    Logger(`Example app listening on port ${port}!\n ________________________\n|                        |\n| http://localhost:${port}/ |\n|________________________|\n`);
});