package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}

	// todo array
	todos := make([]string, 0)

	r := gin.Default()
	r.GET("/todos", func(c *gin.Context) {
		c.JSON(http.StatusOK, todos)
	})

	r.POST("/todos", func(c *gin.Context) {
		type TodoPostBody struct {
			Todo string `form:"todo" json:"todo" binding:"required"`
		}
		var requestBody TodoPostBody

		if err := c.ShouldBindJSON(&requestBody); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		todos = append(todos, requestBody.Todo)
		c.JSON(http.StatusOK, todos)
	})

	fmt.Printf("Server started in port %v\n", port)
	r.Run(fmt.Sprintf(":%v", port))
}
