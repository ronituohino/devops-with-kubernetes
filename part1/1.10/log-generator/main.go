package main

import (
	"fmt"
	"os"
	"time"
)

func main() {
	md := make(chan string)
	go tick(md)

	for range md {
		fmt.Printf("%v\n", <-md)
	}
}

func tick(out chan<- string) {
	c := time.NewTicker(time.Millisecond * 5000)
	for range c.C {
		time_now := time.Now().Format(time.RFC3339)
		err := os.WriteFile("./files/date.txt", []byte(time_now), os.FileMode(0777))
		if err != nil {
			fmt.Println("Unable to write to file.")
		}
		out <- string(time_now)
	}
}
