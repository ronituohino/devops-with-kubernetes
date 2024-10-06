#!/bin/sh

DATE=$(date -u +%Y-%m-%d)
pg_dump -h http://postgres-svc:5432/ -v > "/usr/$DATE.sql"

curl -sSL https://sdk.cloud.google.com | bash
PATH=$PATH:/root/google-cloud-sdk/bin

gcloud storage cp /usr/$DATE.sql gs://dwk-pg-backups