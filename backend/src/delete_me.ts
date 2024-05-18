const util = require('util');
const exec = util.promisify(require('child_process').exec);
import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';

async function main() {
  const { stdout, stderr } = await exec('cd .. && ls');
  console.log(stdout);
}

main();
