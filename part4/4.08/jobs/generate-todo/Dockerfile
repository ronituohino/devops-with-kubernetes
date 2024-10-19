FROM alpine:3.20.3
WORKDIR /usr
RUN apk add --no-cache --upgrade curl
COPY generate.sh .
CMD ["./generate.sh"]