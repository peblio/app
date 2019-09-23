#!/usr/bin/env bash
set -e

if ! [ -x "$(command -v credstash)" ]; then
  echo "This script requires credstash to run."
  exit 1
fi

export ENVIRONMENT=${ENVIRONMENT:-local} # default to local

function get_secret () {
  echo `credstash -r us-east-1 get $1.$ENVIRONMENT environment=$ENVIRONMENT`
}

if [[ "$ENVIRONMENT" != "local" && "$ENVIRONMENT" != "test" && "$ENVIRONMENT" != "staging" && "$ENVIRONMENT" != "production" ]]; then
  echo "$ENVIRONMENT is not a valid environment. Please specify local, test, staging, or production as the second argument to this script."
  exit 1
fi

echo "Exporting environment variables from credstash..."

echo MONGO_DB_PEBLIO=`get_secret db.connection`$'\n'\
PEBLIO_SENDGRID_MAIL=`get_secret sendgrid.mail`$'\n'\
PEBLIO_SENDGRID_PASSWORD=`get_secret sendgrid.password`$'\n'\
PEBLIO_SENDGRID_USER=`get_secret sendgrid.user`$'\n'\
GOOGLE_CLIENT_ID=`get_secret google.client_id`$'\n'\
GOOGLE_CLIENT_SECRET=`get_secret google.client_secret`$'\n'\
S3_BUCKET=`get_secret s3.bucket`$'\n'\
PEBLIO_DOMAIN_NAME=`get_secret domain.name`$'\n'\
PEBLIO_COOKIE_DOMAIN=`get_secret cookie.domain`$'\n'\
PEBLIO_COOKIE_NAME=`get_secret cookie.name`$'\n'\
AWS_PROFILE=peblio$'\n'\
STRIPE_KEY=`get_secret stripe.key`$'\n'\
PEBLIO_SESSION_SECRET=`get_secret session.secret`\
> .env

"$@"
