package main

import (
	"fmt"
	"net/http"
	"os"

	"todo-api/internal/db"

	"github.com/gin-gonic/gin"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}

	database := db.Initialize()
	defer database.Close()

	r := gin.Default()
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	r.GET("/todos", func(c *gin.Context) {
		todos := db.GetTodos(database)
		todoArr := make([]string, 0)
		for _, t := range todos {
			todoArr = append(todoArr, t.Todo)
		}

		c.JSON(http.StatusOK, todoArr)
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

		if len(requestBody.Todo) > 140 {
			fmt.Printf("Blocked todo: %v\n", requestBody.Todo)
			c.JSON(http.StatusBadRequest, gin.H{"error": "Todo length should be 140 or less"})
			return
		}

		todos := db.AddTodo(requestBody.Todo, database)
		todoArr := make([]string, 0)
		for _, t := range todos {
			todoArr = append(todoArr, t.Todo)
		}

		fmt.Printf("Added todo: %v\n", requestBody.Todo)
		c.JSON(http.StatusOK, todoArr)
	})

	fmt.Printf("Server started in port %v\n", port)
	r.Run(fmt.Sprintf(":%v", port))
}
