package bc

import (
	"os"

	"github.com/nats-io/nats.go"
)

func Initialize() *nats.Conn {
	// Connect to a server
	nc, _ := nats.Connect(os.Getenv("NATS_URL"))
	return nc
}

func PublishMessage(message string, nc *nats.Conn) {
	nc.Publish("todos", []byte(message))
}
