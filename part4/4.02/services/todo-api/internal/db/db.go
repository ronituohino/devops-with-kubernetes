package db

import (
	"fmt"
	"os"

	"github.com/go-pg/pg/v10"
	"github.com/go-pg/pg/v10/orm"
)

func Initialize() *pg.DB {
	fmt.Println("Initializing Postgres database")
	db := pg.Connect(&pg.Options{
		Addr:     "postgres-svc:5432",
		User:     os.Getenv("PG_USER"),
		Password: os.Getenv("PG_PASSWORD"),
		Database: os.Getenv("PG_DB"),
	})

	err := createSchema(db)
	if err != nil {
		panic(err)
	}

	return db
}

type Todo struct {
	Id   int64 `pg:",pk,unique"`
	Todo string
}

func createSchema(db *pg.DB) error {
	fmt.Println("Creating database schema")
	models := []interface{}{
		(*Todo)(nil),
	}

	for _, model := range models {
		err := db.Model(model).CreateTable(&orm.CreateTableOptions{
			IfNotExists: true,
		})
		if err != nil {
			return err
		}
	}
	return nil
}

func GetTodos(db *pg.DB) []Todo {
	var todos []Todo
	err := db.Model(&todos).Column("id", "todo").Select()

	if err != nil {
		fmt.Println("Error querying todos", err)
	}

	return todos
}

func AddTodo(text string, db *pg.DB) []Todo {
	todo := &Todo{
		Todo: text,
	}
	_, err := db.Model(todo).Insert()

	if err != nil {
		fmt.Println("Error adding todo", err)
	}

	return GetTodos(db)
}

func IsHealthy(db *pg.DB) bool {
	var todos []Todo
	err := db.Model(&todos).Column("id", "todo").Select()
	return err == nil
}
