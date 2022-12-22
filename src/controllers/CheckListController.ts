import { Request, Response } from 'express';
import CheckList from '../models/CheckList';
import Controller from './Controller';

type GetCheckListsParameters = Request<object, object, object, { title: string, tag: string }>;

export default class CheckListController extends Controller {
  static async getCheckList({ query: { tag } }: GetCheckListsParameters, res: Response) {
    const result = await CheckList.list({ tag });

    res.json(CheckListController.prepareForJson(result));
  }

  static async getCheckListTags(request: Request, res: Response) {
    const result = await CheckList.tags();

    res.json(CheckListController.prepareForJson(result));
  }
}
