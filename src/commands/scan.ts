import { Command, Flags } from '@oclif/core'

import axios from 'axios'
import { cli } from 'cli-ux'

const chalk = require('chalk');

export default class Scan extends Command {
  static description = 'describe the command here'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    score: Flags.boolean({char: 's', description: 'score of the repo based on bunch of factors'}),
    health: Flags.boolean({char: 'h', description: 'security health check of the repo'}),
  }

  static args = [{name: 'url', required: true}]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Scan)
    const owner = args.url.split('/')[3]
    const repo = args.url.split('/')[4]

    if(flags.score && !flags.health) {
      axios({
        method: 'get',
        url: `http://139.59.11.191/get_details?repo=${owner}%2F${repo}`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
      .then(function (response : any) {
        const res: any = []
        Object.keys(response.data.data).map((ins) => {
          res.push({
            parameter: ins,
            value: response.data.data[`${ins}`],
            percentile: response.data.data_percentiles[`${ins}`]
          })
        })
        console.log("Calculating score on following parameters:")
        cli.table(res, {
          parameter: {},
          value: {},
          percentile: {},
        })
        console.log("Score: ", response.data.similarity_score * 10)
        console.log("Verdict: ", response.data.similarity_score * 10 > 8 ? chalk.green('[Safe]') : chalk.red('[Unsafe]') )
      });
    }
    else if(!flags.score && flags.health) {
      axios({
        method: 'get',
        url: `http://139.59.11.191/get_vulns?repo=${owner}%2F${repo}`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
      .then(function (response : any) {
        console.log("vulnerabilities: ", response.data)
      });
    }
    else{
      axios({
        method: 'get',
        url: `http://139.59.11.191/get_details?repo=${owner}%2F${repo}`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
      .then(function (response : any) {
        const res: any = []
        Object.keys(response.data.data).map((ins) => {
          res.push({
            parameter: ins,
            value: response.data.data[`${ins}`],
            percentile: response.data.data_percentiles[`${ins}`]
          })
        })
        console.log("Calculating score on following parameters:")
        cli.table(res, {
          parameter: {},
          value: {},
          percentile: {},
        })
        console.log("Score: ", response.data.similarity_score * 10)
        console.log("Verdict: ", response.data.similarity_score * 10 > 8 ? chalk.green('[Safe]') : chalk.red('[Unsafe]') )
      });
      axios({
        method: 'get',
        url: `http://139.59.11.191/get_vulns?repo=${owner}%2F${repo}`,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
      .then(function (response : any) {
        console.log("vulnerabilities: ", response.data)
      });
    }
  }
}
