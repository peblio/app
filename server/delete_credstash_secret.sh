#!/usr/bin/env bash
set -e

if ! [ -x "$(command -v credstash)" ]; then
  echo "This script requires credstash to run."
  exit 1
fi

SECRET_NAME=$1
ENVIRONMENT=$2

if [[ "$ENVIRONMENT" != "local" && "$ENVIRONMENT" != "staging" && "$ENVIRONMENT" != "production" ]]; then
  echo "Usage: ./delete_credstash_secret <name> <local|staging|production>"
  echo "$ENVIRONMENT is not a valid environment. Please specify local, staging, or production as the second argument to this script."
  exit 1
fi

AWS_PROFILE=peblio credstash -r us-east-1 delete "$SECRET_NAME.$ENVIRONMENT"
