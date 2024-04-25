#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import chalk from 'chalk'

import esbuild from 'esbuild'
import babel from 'esbuild-plugin-babel'

const PROJ_ROOT = new URL('../', import.meta.url)
const PACKAGES_ROOT = new URL('./packages/', PROJ_ROOT)

function buildBund (srcFile, bundleFile, { minify = true, standalone = '', plugins, target, format } = {}) {
  return esbuild.build({
    bundle: true,
    sourcemap: true,
    entryPoints: [srcFile],
    outfile: bundleFile,
    platform: 'browser',
    minify,
    keepNames: true,
    plugins,
    target,
    format,
  }).then(() => {
    if (minify) {
      console.log(chalk.green(`Built Minified Bundle [${standalone}]:`), chalk.magenta(bundleFile))
    } else {
      console.log(chalk.green(`Built Bundle [${standalone}]:`), chalk.magenta(bundleFile))
    }
  })
}

await fs.mkdir(new URL('./MyImg/dist', PACKAGES_ROOT), { recursive: true })
await fs.mkdir(new URL('./@MyImg/locales/dist', PACKAGES_ROOT), { recursive: true })

const methods = [
  buildBund(
    './packages/MyImg/index.mjs',
    './packages/MyImg/dist/MyImg.min.mjs',
    { standalone: 'MyImg (ESM)', format: 'esm' },
  ),
  buildBund(
    './packages/MyImg/bundle-legacy.mjs',
    './packages/MyImg/dist/MyImg.legacy.min.js',
    {
      standalone: 'MyImg (with polyfills)',
      target: 'es5',
      plugins:[babel({
        config:{
          compact: false,
          highlightCode: false,
          inputSourceMap: true,

          browserslistEnv: 'legacy',
          presets: [['@babel/preset-env',  {
            loose: false,
            targets: { ie:11 },
            useBuiltIns: 'entry',
            corejs: { version: '3.24', proposals: true },
          }]],
        },
      })],
    },
  ),
  buildBund(
    './packages/MyImg/bundle.mjs',
    './packages/MyImg/dist/MyImg.min.js',
    { standalone: 'MyImg', format: 'iife' },
  ),

]

const localesModules = await fs.opendir(new URL('./@MyImg/locales/src/', PACKAGES_ROOT))
for await (const dirent of localesModules) {
  if (!dirent.isDirectory() && dirent.name.endsWith('.js')) {
    const localeName = path.basename(dirent.name, '.js')
    methods.push(
      buildBund(
        `./packages/@MyImg/locales/src/${localeName}.js`,
        `./packages/@MyImg/locales/dist/${localeName}.min.js`,
        { minify: true },
      ),
    )
  }
}
