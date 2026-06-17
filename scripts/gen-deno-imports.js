#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const REPO_ROOT = process.cwd()
const PACKAGES_DIR = path.join(REPO_ROOT, 'packages')
const DENO_JSON = path.join(REPO_ROOT, 'deno.json')
const TREX_PREFIX = '/var/tmp/sb-compile-trex/logto/packages/'
const FILE_URL_PREFIX = 'file:///var/tmp/sb-compile-trex/logto/packages/'

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files = []
  for (const e of entries) {
    if (e.name.startsWith('.')) continue
    const full = path.join(dir, e.name)
    if (e.isDirectory()) files.push(...walk(full))
    else files.push(full)
  }
  return files
}

function main() {
  if (!fs.existsSync(PACKAGES_DIR)) {
    console.error('packages/ not found; skipping deno import map generation')
    process.exit(0)
  }
  const deno = fs.existsSync(DENO_JSON)
    ? JSON.parse(fs.readFileSync(DENO_JSON, 'utf-8'))
    : { imports: {} }
  deno.imports = deno.imports || {}

  // Ensure broad prefix mappings exist so new files resolve without per-file entries
  // Map Trex temp prefixes to local packages directory (import-map remaps during dynamic import)
  deno.imports[TREX_PREFIX] = './packages/'
  deno.imports[FILE_URL_PREFIX] = './packages/'

  const files = walk(PACKAGES_DIR)
    .filter((f) => /\.(ts|tsx|mts|cts|js|mjs|cjs)$/.test(f))
    .filter((f) => !/\.(d|test|spec)\.(ts|tsx|mts|cts|js|mjs|cjs)$/.test(f))

  for (const abs of files) {
    const rel = path.relative(PACKAGES_DIR, abs).replace(/\\/g, '/')
    const withoutExt = rel.replace(/\.(ts|tsx|mts|cts|js|mjs|cjs)$/, '')
    const spec = TREX_PREFIX + withoutExt
    const target = './packages/' + rel
    deno.imports[spec] = target

    // Add equivalent file:// URL specifier so URL-based imports resolve
    const fileUrlSpec = FILE_URL_PREFIX + withoutExt
    deno.imports[fileUrlSpec] = target

    // Add directory prefix mappings (with trailing slash) for the parent dir
    const parentDir = withoutExt.includes('/') ? withoutExt.substring(0, withoutExt.lastIndexOf('/') + 1) : ''
    if (parentDir) {
      const trexDirPrefix = TREX_PREFIX + parentDir
      const fileUrlDirPrefix = FILE_URL_PREFIX + parentDir
      const dirTarget = './packages/' + parentDir
      deno.imports[trexDirPrefix] = dirTarget
      deno.imports[fileUrlDirPrefix] = dirTarget
    }

    // If this is an index file, also map the directory itself to the index target
    if (withoutExt.endsWith('/index')) {
      const dirWithoutIndex = withoutExt.slice(0, -('/index'.length))
      const dirSpec = TREX_PREFIX + dirWithoutIndex
      deno.imports[dirSpec] = target
      const dirFileUrlSpec = FILE_URL_PREFIX + dirWithoutIndex
      deno.imports[dirFileUrlSpec] = target
    }
  }

  fs.writeFileSync(DENO_JSON, JSON.stringify(deno, null, 2) + '\n')
  console.log(`Updated ${DENO_JSON} with ${files.length} file mappings for logto`)
}

main()

