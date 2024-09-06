### Build step
FROM golang:1.23.1-alpine3.19 AS builder

WORKDIR /app

# Download Go modules
COPY go.mod go.sum ./
RUN go mod download

# Copy code
COPY ./main.go .

# Build binary
RUN go build -o ./bin/log-reader



### Run step 
FROM scratch AS runner

WORKDIR /usr/src/app

COPY --from=builder /app/bin/log-reader ./log-reader

CMD ["./log-reader"]