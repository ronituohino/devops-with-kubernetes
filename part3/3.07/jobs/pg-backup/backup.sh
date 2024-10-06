#!/bin/sh

DATE=$(date -u +%Y-%m-%d)
pg_dump --user=$PGUSER --host=postgres-svc --port=5432 --dbname=$PGDATABASE -v > "/usr/$DATE.sql"

curl -sSL https://sdk.cloud.google.com | bash
PATH=$PATH:/root/google-cloud-sdk/bin
GOOGLE_APPLICATION_CREDENTIALS="/var/run/secrets/kubernetes.io/serviceaccount/token"

gcloud storage cp /usr/$DATE.sql gs://dwk-pg-backups