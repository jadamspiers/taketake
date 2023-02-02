package controllers

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"time"

	"github.com/gofiber/fiber/v2"
)

// Variables and constants
var playersInLobby []Player
var playersInLobbyCount uint16

// Define models here for now
type Player struct {
	Name    string `json:"name"`
	Color   string `json:"color"`
	Address string `json:"address"`
	Wager   string `json:"wager"`
}

type Lobby struct {
	Name    string
	players []Player
}

// Utility functions
func getColor() string {
	colors := []string{
		"white",
		"black",
	}
	rand.Seed(time.Now().UnixNano())
	color := colors[rand.Intn(len(colors))]
	return color
}

// Controller functions
func Hello(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"message": "Hello",
	})
}

func JoinLobby(c *fiber.Ctx) error {
	var data map[string]string
	var color string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	// 1. if the opponent is already in the lobby, assign the opposite color to the new player
	// 2. otherwise flip a coin to assign the color
	if playersInLobbyCount >= 1 {
		if playersInLobby[0].Color == "white" {
			color = "black"
		} else {
			color = "white"
		}
	} else {
		color = getColor()
	}

	// Initialize Player struct
	player := Player{
		Name:    data["name"],
		Color:   color,
		Address: data["address"],
		Wager:   data["wager"],
	}

	// Insert into Lobby
	playersInLobby = append(playersInLobby, player)
	playersInLobbyCount++

	return c.JSON(fiber.Map{
		"color": color,
	})
}

func ListLobby(c *fiber.Ctx) error {
	var outputString string

	for i := range playersInLobby {
		player := playersInLobby[i]
		playerData, err := json.MarshalIndent(player, "", " ")
		if err != nil {
			fmt.Println(err)
		}
		outputString = outputString + string(playerData)
	}

	return c.JSON(fiber.Map{
		"message": string(outputString),
	})
}

func GetOpponentAddress(c *fiber.Ctx) error {
	var data map[string]string
	var opponentAddress string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	// look for the other player that isn't the requester
	for i := range playersInLobby {
		if playersInLobby[i].Name != data["name"] {
			opponentAddress = playersInLobby[i].Address
		}
	}

	return c.JSON(fiber.Map{
		"opponentAddress": opponentAddress,
	})
}
