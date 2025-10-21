package main

import (
	"log"

	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load()

	// Inicilalizar la configuracion de firebase
	if err := config.InitFirebase(); err != nil {
		log.Fatalf("Error Iniciando Firebase: %v", err)
	}

	defer config.Firestore.Close()
	r := routes.Firestore.SuperRouter()
}
