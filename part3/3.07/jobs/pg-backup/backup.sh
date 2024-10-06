#!/bin/sh

DATE=$(date -u +%Y-%m-%d)
pg_dump --user=$PGUSER --host=postgres-svc --port=5432 --dbname=$PGDATABASE -v > "/usr/$DATE.sql"

curl -X POST --data-binary @/usr/$DATE.sql \
    -H "Authorization: Bearer $GCLOUD_TOKEN" \
    -H "Content-Type: application/sql" \
    "https://storage.googleapis.com/upload/storage/v1/b/dwk-pg-backups/o?uploadType=media&name=$DATE.sql"