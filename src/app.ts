import express, { Request, Response, Application } from 'express';
import ReadingsDomain from './domain/readings-domain';

export default ({ readingsDomain }: { readingsDomain: ReadingsDomain }): Application => {
  const app = express()

  app.get('/readings/:box_id/:from/:to', async (req: Request, res: Response) => {
    const { box_id, from, to } = req.params;
    const data = await readingsDomain.get({ box_id, from: new Date(from), to: new Date(to) })
    return res.json(data)
  })

  return app
};
