import { RowDataPacket } from 'mysql2';
import Db from '../db'
export interface IReadingsQuery {
  box_id: string;
  from: Date;
  to: Date;
}

interface IBaseReadingRow extends RowDataPacket {
  box_id: string;
  sensor_id: string;
  name: string;
  unit: string;
  reading_ts: Date;

}

export interface IReadingRow extends IBaseReadingRow {
  reading: number;
}

export interface IAggregateReadingRow extends IBaseReadingRow {
  max_reading: number;
  min_reading: number;
  avg_reading: number;
}

export interface IReadings {
  get(params: IReadingsQuery): Promise<Array<IReadingRow>>
  aggregate(params: IReadingsQuery): Promise<Array<IAggregateReadingRow>>
}

export default class ReadingsDomain implements IReadings {
  db: Db
  constructor({ db }: { db: Db }) {
    this.db = db;
  }

  async get({ box_id, from, to }: IReadingsQuery): Promise<Array<IReadingRow>> {
    const [rows] = await this.db.query(
      `SELECT
        r.box_id,
        r.sensor_id,
        s.name,
        s.unit,
        r.reading,
        r.reading_ts
      FROM 
        sensors s
        JOIN readings r ON r.sensor_id = s.id
      WHERE
        r.box_id = ?
        AND r.reading_ts >= ?
        AND r.reading_ts <= ?
      `,
      [box_id, from, to])
    return rows
  }

  async aggregate({ box_id, from, to }: IReadingsQuery): Promise<Array<IAggregateReadingRow>> {
    const [rows] = await this.db.query(
      `SELECT
        r.box_id,
        r.sensor_id,
        s.name,
        s.unit,
        MAX(r.reading) as max_reading,
        MIN(r.reading) as min_reading,
        ROUND(AVG(r.reading),2) as avg_reading
      FROM
        sensors s
        JOIN readings r ON r.sensor_id = s.id
      WHERE
        r.box_id = ?
        AND r.reading_ts >= ?
        AND r.reading_ts <= ?
      GROUP BY r.box_id, r.sensor_id
      `,
      [box_id, from, to])
    return rows
  }
}