#!/bin/bash

# Helper script to run Logto with Deno
# This script will continue to run and show errors as they occur

echo "🦕 Running Logto with Deno..."
echo "========================================="
echo ""
echo "Note: This is an experimental setup. You may see errors"
echo "related to missing dependencies or incompatibilities."
echo ""
echo "========================================="
echo ""

cd "$(dirname "$0")"

deno run \
  --config deno.json \
  --allow-all \
  --unstable-node-globals \
  --unstable-fs \
  --unstable-sloppy-imports \
  packages/core/src/index.ts

exit_code=$?

echo ""
echo "========================================="
echo "Exit code: $exit_code"
echo "========================================="

exit $exit_code

