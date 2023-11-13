#!/usr/bin/env bash
set -o pipefail

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

echo "Running Python Linting..."

if [ ! -z "${FIX}" ]; then
    echo "'--fix' specified, fixing, this will make changes!"
    autopep8 "${repo_dir}/backend/" -r --in-place --list-fixes || echo "Autofix failed... Do you hve autopep8 installed and on path? Continuing anyway."
fi

echo "Checking for critical errors"
echo "Running: flake8 ./backend --count --select=E9,F63,F7,F82 --show-source --statistics"
flake8 ./backend --select=E9,F63,F7,F82 --show-source --statistics
critical_errors_exit_status="$?"

echo "Checking for style errors"
echo "Running: flake8 ./backend --count --exit-zero --max-complexity=10 --max-line-length=150 --statistics"
flake8 ./backend --config="${repo_dir}/backend/.flake8" --statistics
style_errors_exit_status="$?"

if [ ${critical_errors_exit_status} -ne 0 ] || [ ${style_errors_exit_status} -ne 0 ]; then
    echo "Linting errors detected! See logs."
    exit 1
fi

echo "No linting errors found."
