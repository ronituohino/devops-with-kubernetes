package main

import (
	"fmt"
	"net/http"
	"os"
	"strconv"

	"todo-api/internal/bc"
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

	broadcaster := bc.Initialize()
	defer broadcaster.Close()

	r := gin.Default()
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	r.GET("/todos", func(c *gin.Context) {
		todos := db.GetTodos(database)
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

		if len(requestBody.Todo) > 140 {
			fmt.Printf("Blocked todo: %v\n", requestBody.Todo)
			c.JSON(http.StatusBadRequest, gin.H{"error": "Todo length should be 140 or less"})
			return
		}

		newTodo, todos := db.AddTodo(requestBody.Todo, database)
		fmt.Printf("Added todo: %v\n", requestBody.Todo)

		broadcastMessage := fmt.Sprintf("🚀 added a new todo:\n\n```\n%+v\n```", newTodo)
		bc.PublishMessage(broadcastMessage, broadcaster)

		c.JSON(http.StatusOK, todos)
	})

	// "Done" mark
	r.PUT("/todos/:id", func(c *gin.Context) {
		idParam := c.Param("id")
		id, err := strconv.ParseInt(idParam, 10, 64)

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}

		newTodo, todos := db.MarkDone(id, database)
		fmt.Printf("Updated todo: %v\n", id)

		broadcastMessage := fmt.Sprintf("🦅💥💯 todo completed:\n\n```\n%+v\n```", newTodo)
		bc.PublishMessage(broadcastMessage, broadcaster)

		c.JSON(http.StatusOK, todos)
	})

	r.GET("/healthz", func(c *gin.Context) {
		healthy := db.IsHealthy(database)
		if healthy {
			c.JSON(http.StatusOK, gin.H{"status": "ok"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"status": "db cannot be reached"})
		}
	})

	fmt.Printf("Server started in port %v\n", port)
	r.Run(fmt.Sprintf(":%v", port))
}
