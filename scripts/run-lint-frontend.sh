#!/usr/bin/env bash

set -eo pipefail
USAGE="Usage: $(basename $0) [-f | --fix]"

FIX=""

for arg in "$@"; do
    case "$arg" in
        --help|-h)      echo "${USAGE}"; exit 0;;
        --fix|-f)       FIX="--fix";;
        *)              echo -e "unknown option $arg\n$USAGE" >&2; exit 1;;
    esac
done

script_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
repo_dir="$(dirname "${script_dir}")"

echo "Running TypeScript Linting..."
pushd "${repo_dir}/frontend"

if [ ! -z "${FIX}" ]; then
    echo "'--fix' specified, fixing, this will make changes!"
    yarn fix
fi

yarn lint
