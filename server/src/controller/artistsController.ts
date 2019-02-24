import {getRepository, getConnection} from 'typeorm';
import {Request, Response, NextFunction} from "express";
import { Artist } from "../entity/Artist";

class artistsController {

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json(await getRepository(Artist).find());
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      let artist: Artist = new Artist();
      artist = req.body;
      artist.user = req.user;
      await getRepository(Artist).save(artist);
      return res.status(201).json(artist);
    } catch (error) {
      next(error);
    }
  }

}
export default new artistsController();