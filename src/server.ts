import app from './app'
import ReadingsDomain from './domain/readings-domain'
import Db from './db'
import loadConfig from '../config'

loadConfig()
const db = new Db()
const readingsDomain = new ReadingsDomain({ db });

const PORT: number = Number(process.env.PORT) || 8000;

const server = app({ readingsDomain })

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})

export default app;
