import express from 'express';
import cors from 'cors';

import { config } from 'dotenv';
import ProblemController from './controllers/ProblemController';
import CheckListController from './controllers/CheckListController';

config();

const PORT = 8080;
const HOST = '0.0.0.0';
const API_PREFIX = '/api';

const app = express();

app.use(express.json());
app.use(cors());

app.get(`${API_PREFIX}/problems/`, ProblemController.getProblems);
app.get(`${API_PREFIX}/checklist/`, CheckListController.getCheckList);
app.get(`${API_PREFIX}/checklist/tags/`, CheckListController.getCheckListTags);

app.listen(process.env.PORT ?? PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on http://${HOST}:${PORT}`);
});
