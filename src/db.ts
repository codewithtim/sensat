import { createConnection } from 'mysql2/promise';

export interface IDb {
  query(sql: string, params: Array<any>): Promise<any>
}

export default class Db implements IDb {
  async query(sql: string, params: Array<any>): Promise<any> {
    try {
      const connection = await createConnection({
        host: process.env.HOST,
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DB_NAME,
        port: Number(process.env.PORT),
      });
      const res = await connection.execute(sql, params)
      await connection.end()
      return res
    } catch (err: any) {
      console.log('Opps something went wrong :(', err)
    }
  }
}

