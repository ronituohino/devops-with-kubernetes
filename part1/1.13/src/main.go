package main

import (
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
)

const PIC_PATH = "./cache/pic.jpg"
const PICSUM_URL = "https://picsum.photos/1200"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		c.File("views/index.html")
	})

	r.GET("/pic", func(c *gin.Context) {
		info, err := os.Stat(PIC_PATH)
		one_hour_ago := time.Now().Add(time.Minute * -60)

		if errors.Is(err, os.ErrNotExist) || info.ModTime().Before(one_hour_ago) {
			getPic()
		}

		c.File(PIC_PATH)
	})

	r.StaticFile("/favicon.ico", "assets/favicon.svg")
	r.Static("/assets", "assets")

	fmt.Printf("Server started in port %v\n", port)
	r.Run(fmt.Sprintf(":%v", port))
}

func getPic() {
	res, err := http.Get(PICSUM_URL)
	if err != nil {
		fmt.Printf("Error fetching new image %v", err)
		return
	}

	data, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Printf("Error reading image data %v", err)
		return
	}
	res.Body.Close()

	os.WriteFile(PIC_PATH, data, 0666)
}
