import ReadingsDomain from './domain/readings-domain'
import Db from './db'
import cli from './cli'

const db = new Db()

const readingsDomain = new ReadingsDomain({ db });
const args = process.argv.slice(2);

cli({ readingsDomain, args })