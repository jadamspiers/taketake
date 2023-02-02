package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jadamspiers/game-api/controllers"
)

func Setup(app *fiber.App) {
	app.Get("/api/hello", controllers.Hello)
	app.Post("/api/joinlobby", controllers.JoinLobby)
	app.Get("/api/listlobby", controllers.ListLobby)
	app.Post("/api/getopponentaddress", controllers.GetOpponentAddress)
}
