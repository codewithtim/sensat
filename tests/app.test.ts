import expressApp from '../src/app'
import request from 'supertest'
import assert from 'assert'
import { IReadingsQuery, IReadings, IReadingRow } from '../src/domain/readings-domain'
import Db, { IDb } from '../src/db'

const getResult: Array<any> = [{
  box_id: 'Box-A1',
  sensor_id: 'Box-A1-TEMP',
  name: 'Ambient temperature',
  unit: 'ºC',
  reading: 5,
  reading_ts: new Date('2021-04-07T02:10:00.000Z')
},
{
  box_id: 'Box-A1',
  sensor_id: 'Box-A1-RH',
  name: 'Relative humidity',
  unit: 'percent',
  reading: 32,
  reading_ts: '2021-04-07T02:10:00.000Z'
}]

class MockDb implements IDb {
  async query(sql: string, params: any): Promise<any> {
    return
  }
}

class MockReadingsDomain implements IReadings {
  db: MockDb
  constructor({ db }: { db: MockDb }) {
    this.db = db;
  }
  async get({ box_id, from, to }: IReadingsQuery): Promise<Array<IReadingRow>> {
    return getResult
  }
  async aggregate({ box_id, from, to }: IReadingsQuery): Promise<Array<any>> {
    return getResult
  }
}

describe('App', () => {
  it('responds with json', function (done) {
    const app = expressApp({ readingsDomain: new MockReadingsDomain({ db: new MockDb() }) })
    request(app)
      .get('/readings/Box-A1/2021-05-07%2000:00:00/2021-04-07%2000:00:00')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('responds with the expected get result', function (done) {
    const app = expressApp({ readingsDomain: new MockReadingsDomain({ db: new MockDb() }) })
    request(app)
      .get('/readings/Box-A1/2021-05-07%2000:00:00/2021-04-07%2000:00:00')
      .expect('Content-Type', /json/)
      .then((res) => {
        assert.equal(JSON.stringify(res.body), JSON.stringify(getResult))
        done()
      })
      .catch((err) => done(err))
  });
})