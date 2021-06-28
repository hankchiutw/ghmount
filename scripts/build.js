#!/usr/bin/env node

const { build } = require('esbuild');
const glob = require('tiny-glob');

(async () => {
  const entryPoints = await glob('./src/**/*.ts');
  await build({
    entryPoints,
    outdir: 'lib',
    platform: 'node',
    format: 'cjs',
    logLevel: 'info',
  });
})();
