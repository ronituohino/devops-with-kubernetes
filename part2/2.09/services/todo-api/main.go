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

		todos := db.AddTodo(requestBody.Todo, database)
		todoArr := make([]string, 0)
		for _, t := range todos {
			todoArr = append(todoArr, t.Todo)
		}

		c.JSON(http.StatusOK, todoArr)
	})

	fmt.Printf("Server started in port %v\n", port)
	r.Run(fmt.Sprintf(":%v", port))
}
