#!/usr/bin/env bash
set -e
DEVOPS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

if ! [ -x "$(command -v ansible-playbook)" ]; then
  echo "This script requires ansible to run."
  exit 1
fi

ENVIRONMENT=$1
PLAYBOOK_FILE=$2

if [[ "$ENVIRONMENT" != "staging" && "$ENVIRONMENT" != "production" ]]; then
  echo "$ENVIRONMENT is not a valid environment."
  exit 1
fi

pushd "$DEVOPS_DIR/ansible" > /dev/null

AWS_PROFILE=peblio ansible-playbook -i "inventories/$ENVIRONMENT" "$PLAYBOOK_FILE"

popd > /dev/null
