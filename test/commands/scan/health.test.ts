import {expect, test} from '@oclif/test'

describe('scan/health', () => {
  test
  .stdout()
  .command(['scan/health'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['scan/health', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
