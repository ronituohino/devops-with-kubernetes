FROM postgres:17.0-alpine3.20
WORKDIR /usr
RUN apk add --no-cache --upgrade curl
COPY backup.sh .
RUN chmod +x backup.sh
CMD ["./backup.sh"]