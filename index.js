const express = require('express');
const cors = require('cors');
const ProblemController = require("./controllers/ProblemController")

require('dotenv').config();

const PORT = 8080;
const HOST = '0.0.0.0';
const API_PREFIX = '/api';

const app = express();

app.use(express.json());
app.use(cors());

app.get(`${API_PREFIX}/problems/`, ProblemController.getProblems);

app.listen(process.env.PORT ?? PORT, HOST, () => {
	console.log(`Running on http://${HOST}:${PORT}`);
});


