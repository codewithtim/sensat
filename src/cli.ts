import loadConfig from '../config'
import ReadingsDomain from './domain/readings-domain'

interface IProgramArgs {
  box_id: string;
  to: string;
  from: string;
  aggregate?: string;
}

export function getProgramArgs(args: Array<string>): IProgramArgs {
  const allowedCLIArgsArgs = ['box_id', 'to', 'from', 'aggregate']
  return args
    .filter((arg) => arg.includes('--'))
    .reduce<IProgramArgs>((c, a) => {
      const [_, iarg] = a.split('--')
      const [key, arg] = iarg.split('=')

      if (allowedCLIArgsArgs.includes(key)) {
        return { ...c, [key]: arg.trim() }
      }
      return c;
    }, {} as IProgramArgs)
}

export function getYamlFileName(args: Array<string>): string {
  const yamlArgIndex = args.indexOf('-conf')
  if (yamlArgIndex > -1) {
    return args[yamlArgIndex + 1]
  }
  return ''
}

export default async function cli({ readingsDomain, args }: { readingsDomain: ReadingsDomain, args: Array<string> }) {
  const programArgs = getProgramArgs(args);
  const yamlFileName = getYamlFileName(args);
  loadConfig(yamlFileName)

  const { box_id, from, to, aggregate } = programArgs;

  if (aggregate) {
    const data = await readingsDomain.aggregate({ box_id, from: new Date(from), to: new Date(to) })
    return console.log(JSON.stringify(data))
  }
  const data = await readingsDomain.get({ box_id, from: new Date(from), to: new Date(to) })
  return console.log(JSON.stringify(data))
}
