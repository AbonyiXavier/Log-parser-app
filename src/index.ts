#!/usr/bin/env node
import { Command } from 'commander';
import { Parser } from './parser.service';

async function run() {
  console.log('Running log parser👋');

  const program = new Command();

  program
    .version('0.0.1')
    .description('Log cli tool by Francis Abonyi')
    .option(
      '-i, --input <input file>',
      'Input file expected to be parsed',
      '/mixed.log',
    )
    .option(
      '-o, --output <output file>',
      'Output file expected after parsing',
      'errors.json',
    )
    .option(
      '-l, --loglevel <loglevel>',
      'Log level required, acecpted include "error", "warn", "info", "debug"',
      'error',
    )
    .parse();

  const { input, output, loglevel } = program.opts();

  const parser = new Parser(input, output);
  parser.parse(loglevel);
}

run();
