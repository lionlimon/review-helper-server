import { Request, Response } from 'express';
import Problem from '../models/Problem';
import Controller from './Controller';

type GetProblemsParameters = Request<object, object, object, { title: string, tags: string[] }>;

export default class ProblemController extends Controller {
  static async getProblems({ query: { title, tags } }: GetProblemsParameters, res: Response) {
    const result = await Problem.list({ title, tags });

    res.json(ProblemController.prepareForJson(result));
  }
}
