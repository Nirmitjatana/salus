import { Command, Flags } from '@oclif/core'
const axios = require('axios')

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
        console.log("Score: ",response.data.similarity_score * 10)
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
        console.log("Score: ",response.data.similarity_score * 10)
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

    // if(flags.score) {
    //   axios({
    //     method: 'get',
    //     url: `http://139.59.11.191/get_details?repo=${owner}%2F${repo}`,
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json',
    //     },
    //   })
    //   .then(function (response : any) {
    //     console.log("Score: ",response.data.similarity_score * 10)
    //   });
    // }
    // if(flags.health) {
    //   axios({
    //     method: 'get',
    //     url: `http://139.59.11.191/get_vulns?repo=${owner}%2F${repo}`,
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json',
    //     },
    //   })
    //   .then(function (response : any) {
    //     console.log("vulnerabilities: ", response)
    //   });
    // }
    // this.log(`running scan on repo ${owner}/${repo}`)
    
    // const name = flags.name ?? 'world'
    // this.log(`hello ${name} from C:\\Users\\nitro\\Desktop\\github\\salus\\src\\commands\\scan.ts`)
    // if (args.file && flags.force) {
    //   this.log(`you input --force and --file: ${args.file}`)
    // }
  }
}
