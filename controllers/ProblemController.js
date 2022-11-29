const Problem = require('../models/Problem');
const Controller = require('./Controller');

class ProblemController extends Controller {
	static async getProblems({ query: { title, tags } }, res) {
		const result = await Problem.list({ title, tags });

		res.json(super.prepareForJson(result));
	}
}

module.exports = ProblemController;
