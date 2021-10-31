const assert = require('assert')
const { getProgramArgs, getYamlFileName } = require('../src/cli')

describe('Cli', () => {
  it('getProgramArgs parses cli args', async () => {
    const argsArr = ["--box_id=Box-A1", "--from='2021-05-07 00:00:00'", "--to='2021-04-01 00:00:00'", "--aggregate=true"]
    const args = getProgramArgs(argsArr)
    assert.equal(args.box_id, 'Box-A1')
    assert.equal(args.from, "'2021-05-07 00:00:00'")
    assert.equal(args.to, "'2021-04-01 00:00:00'")
    assert.equal(args.aggregate, 'true')
  })

  it('getProgramArgs ignores non-allowed args', async () => {
    const argsArr = ["--box_id=Box-A1", "--from='2021-05-07 00:00:00'", "--to='2021-04-01 00:00:00'", "--aggregate=true", "--blah=afsd"]

    const args = getProgramArgs(argsArr)
    assert.equal(args.blah, undefined)
  })

  it('getYamlFileName returns file name', async () => {
    const argsArr = ["--box_id=Box-A1", "--from='2021-05-07 00:00:00'", "--to='2021-04-01 00:00:00'", "--aggregate=true", "-conf", 'conf.yaml']

    const fileName = getYamlFileName(argsArr)
    assert.equal(fileName, 'conf.yaml')
  })

  it('getYamlFileName returns file name of blank string if conf is not provided', async () => {
    const argsArr = ["--box_id=Box-A1", "--from='2021-05-07 00:00:00'", "--to='2021-04-01 00:00:00'", "--aggregate=true"]

    const fileName = getYamlFileName(argsArr)
    assert.equal(fileName, '')
  })
})