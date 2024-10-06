#!/bin/sh

url=`curl 'https://en.wikipedia.org/wiki/Special:Random' -si | grep -E 'location' | cut -c 11- | tr -d '\r'`
host="http://todo-api-svc:80/todos"

curl -d """{\"todo\":\"Read ${url}\"}""" -H 'Content-type: application/json' $host
