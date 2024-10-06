FROM alpine:3.20.3

WORKDIR /usr

RUN apk add --update \
  python3 \
  curl \
  which \
  bash \
  postgresql-client

COPY backup.sh .

RUN chmod +x backup.sh

CMD ["./backup.sh"]