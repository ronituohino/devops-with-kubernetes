### Build step
FROM golang:1.23.1-alpine3.19 AS builder

WORKDIR /app

# Update ca-certificates so that server
# can make http GET requests
RUN apk update && apk upgrade && apk add --no-cache ca-certificates
RUN update-ca-certificates

# Copy code
COPY . .

# Download Go modules
RUN go mod download

# Build binary
RUN go build -o ./bin/todo-app ./main.go



### Run step 
FROM scratch AS runner

WORKDIR /usr/src/app

# Copy certs
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

COPY --from=builder /app/assets ./assets/
COPY --from=builder /app/views ./views/
COPY --from=builder /app/bin/todo-app ./todo-app

ENV GIN_MODE=release

CMD ["./todo-app"]