import {getRepository, getConnection} from 'typeorm';
import {Request, Response, NextFunction} from "express";
import { Record } from "../entity/Record";

class recordsController {

  async create(req: Request, res: Response, next: NextFunction) {
    let record: Record = new Record();
    record = req.body;
    record.user = req.user;
    if (!record.picture.startsWith('http') && !record.picture.startsWith('https')) {
      record.picture = 'https://recordsale.de/assets/record_placeholder-f3f829566497dc26b0abfae50ddeb5c7bc48fe1c58dc1c7fe62a26d64988b9c9.svg';
    }
    // record.artists = req.body.artists.map(a => ({id: a.value}) );
    await getRepository(Record).save(record);

    return res.status(201).json(record);
  }

  async getRecords(req: Request, res: Response, next: NextFunction) {
    try {
      const records = await getRepository(Record)
        .createQueryBuilder('records')
        .leftJoinAndSelect('records.user', 'users')
        .where('users.active = :active', { active: true })
        .orderBy('records.id', 'DESC')
        .getMany();

      return res.status(200).json(records);
    } catch (error) {
      next(error);
    }

  }

  async getSingleRecord(req: Request, res: Response, next: NextFunction) {
    try {
      const record = await getRepository(Record).findOne({ where: { id: req.params.id }, relations: ['user'] });

      return res.status(200).json(record);
    } catch (error) {
      console.log(error);
    }
  }

  async updateRecord(req: Request, res: Response, next: NextFunction) {

    let record = await getRepository(Record).findOne(req.params.id);
    record = req.body;
    // record.artists = req.body.artists.map(a => ({ id: a.value }));

    record = await getRepository(Record).save(record);

    return res.status(202).json(record);
  }

  async deleteRecord(req: Request, res: Response, next: NextFunction) {
    try {
      let record = await getRepository(Record).findOne(req.params.id);
      await record.remove();
      return res.status(200).json({'message': 'OK'});
    } catch (error) {
      next(error);
    }
  }


}

export default new recordsController();