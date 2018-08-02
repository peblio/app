#!/usr/bin/env bash
set -e

if ! [ -x "$(command -v credstash)" ]; then
  echo "This script requires credstash to run."
  exit 1
fi

export ENVIRONMENT=${ENVIRONMENT:-local} # default to local

function get_secret () {
  echo `credstash get $1.$ENVIRONMENT environment=$ENVIRONMENT`
}

echo "Fetching environment variables from credstash..."

export MONGO_DB_PEBLIO=`get_secret db.connection`
export PEBLIO_SENDGRID_MAIL=`get_secret sendgrid.mail`
export PEBLIO_SENDGRID_USER=`get_secret sendgrid.user`
export PEBLIO_SENDGRID_PASSWORD=`get_secret sendgrid.password`
export GOOGLE_CLIENT_ID=`get_secret google.client_id`
export GOOGLE_CLIENT_SECRET=`get_secret google.client_secret`
export S3_BUCKET=`get_secret s3.bucket`

"$@"
