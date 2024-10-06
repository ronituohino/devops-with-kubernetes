#!/bin/sh

DATE=$(date -u +%Y-%m-%d)
pg_dump -h postgres://postgres-svc:5432/ -v > "/usr/$DATE.sql"

curl -sSL https://sdk.cloud.google.com | bash
PATH=$PATH:/root/google-cloud-sdk/bin

gcloud auth activate-service-account --key-file=/var/run/secrets/kubernetes.io/serviceaccount/token

gcloud storage cp /usr/$DATE.sql gs://dwk-pg-backups