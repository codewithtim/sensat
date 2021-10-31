import YAML from 'yaml'
import fs from 'fs'

function loadConfig(file: string = ''): void {
  file ? yamlFile(file) : envFile()
}

function yamlFile(file = 'conf.yaml'): void {
  const loadedFile = fs.readFileSync(file, 'utf8')
  const yaml = YAML.parse(loadedFile)
  for (const key in yaml) {
    process.env[key] = yaml[key]
  }
}

function envFile(): void {
  require('dotenv').config()
}

export default loadConfig