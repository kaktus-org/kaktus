#!/usr/bin/env bash
set -eo pipefail

script_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
repo_dir="$(dirname "${script_dir}")"

echo "Running TypeScript Linting..."
pushd "${repo_dir}/frontend"
yarn lint
