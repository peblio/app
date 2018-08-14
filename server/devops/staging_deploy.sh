#!/usr/bin/env bash
set -e
DEVOPS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

"$DEVOPS_DIR/run_ansible_playbook.sh" staging deploy_webserver.yml
