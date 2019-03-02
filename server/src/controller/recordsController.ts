import {getRepository, getConnection} from 'typeorm';
import {Request, Response, NextFunction} from "express";
import { Record } from "../entity/Record";

class recordsController {

  async create(req: Request, res: Response, next: NextFunction) {
    let record: Record = new Record();
    record = req.body;
    record.user = req.user;
    record.artists = req.body.artists.map(a => ({id: a.value}) );
    await getRepository(Record).save(record);

    return res.status(201).json({});
  }

  async getRecords(req: Request, res: Response, next: NextFunction) {
    try {
      const records = await getRepository(Record).find({
        // where: {
        //   user: req.user
        // },
        relations: ['user'],
        order: {
          id: "DESC"
        }
      });
      return res.status(200).json(records);
    } catch (error) {
      next(error);
    }

  }

  async getSingleRecord(req: Request, res: Response, next: NextFunction) {
    try {
      const record = await getRepository(Record).findOne({ where: { id: req.params.id }, relations: ['artists'] });

      return res.status(200).json(record);
    } catch (error) {
      console.log(error);
    }
  }

  async updateRecord(req: Request, res: Response, next: NextFunction) {

    let record = await getRepository(Record).findOne(req.params.id);
    record = req.body;
    record.artists = req.body.artists.map(a => ({ id: a.value }));

    record = await getRepository(Record).save(record);

    return res.status(202).json(record);
  }

}

export default new recordsController();